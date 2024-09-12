'use client';
import './map-styles.css';
import maplibregl, { GeoJSONSource, MapMouseEvent } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { useEffect } from 'react';
import { loadEnvConfig } from '@next/env';

/* put description here */

export default function MapPage() {
    useEffect(() => {
        const map = new maplibregl.Map({
            container: 'map', // container id
            style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${process.env.maptilerApiKey}`, // style URL
            center: [-96.7518, 32.9858], // starting position [lng, lat]
            zoom: 15 // starting zoom
        });

        const coordinates = document.getElementById('coordinates');
        const descriptionBox = document.getElementById('description');
        
        const canvas = map.getCanvasContainer();

        const geojson: GeoJSON.FeatureCollection<GeoJSON.Point> = {
            'type': 'FeatureCollection',
            'features': [
                {
                    'type': 'Feature',
                    'geometry': {
                        'type': 'Point',
                        'coordinates': [-96.7514513305792, 32.98610030104277] as [number, number]
                    },
                    'properties': {
                        'description': 'ECSW'
                    }
                },
                {
                    'type': 'Feature',
                    'geometry': {
                        'type': 'Point',
                        'coordinates': [-96.75042793676755, 32.98618327336875] as [number, number]
                    },
                    'properties': {
                        'description': 'ECSS'
                    }
                },
                {
                    'type': 'Feature',
                    'geometry': {
                        'type': 'Point',
                        'coordinates': [-96.7516211929345, 32.986982962300104] as [number, number]
                    },
                    'properties': {
                        'description': 'Hoblitzelle'
                    }
                }
            ]
        };

        function onMove(e: MapMouseEvent) {
            const coords = e.lngLat;

            // Set a UI indicator for dragging.
            canvas.style.cursor = 'grabbing';

            // Update the Point feature in `geojson` coordinates
            // and call setData to the source layer `point` on it.
            geojson.features[0].geometry.coordinates = [coords.lng, coords.lat];
            const point = map.getSource('buildings') as maplibregl.GeoJSONSource;
            if(point) {
                point.setData(geojson);
            }
            
        }

        function onUp(e: MapMouseEvent) {
            const coords = e.lngLat;

            // Print the coordinates of where the point had
            // finished being dragged to on the map.
            coordinates.style.display = 'block';
            coordinates.innerHTML =
                `Longitude: ${coords.lng}<br />Latitude: ${coords.lat}`;
            canvas.style.cursor = '';

            // Unbind mouse/touch events
            map.off('mousemove', onMove);
            map.off('touchmove', onMove);
        }

        map.on('load', () => {
            // Add a single point to the map
            map.addSource('buildings', {
                'type': 'geojson',
                'data': geojson
            });

            map.addLayer({
                'id': 'points',
                'type': 'circle',
                'source': 'buildings',
                'paint': {
                    'circle-radius': 10,
                    'circle-color': '#3887be'
                }
            });

            map.addLayer({
                'id': 'poi-labels',
                'type': 'symbol',
                'source': 'buildings',
                'layout': {
                    'text-field': ['get', 'description'],
                    'text-variable-anchor': ['top', 'bottom', 'left', 'right'],
                    'text-radial-offset': 0.5,
                    'text-justify': 'auto',
                    'icon-image': ['concat', ['get', 'icon'], '_15']
                }
            });

            // When the cursor enters a feature in the point layer, prepare for dragging.
            map.on('mouseenter', 'points', () => {
                map.setPaintProperty('points', 'circle-color', '#3bb2d0');
                canvas.style.cursor = 'move';
            });

            map.on('mouseleave', 'points', () => {
                map.setPaintProperty('points', 'circle-color', '#3887be');
                canvas.style.cursor = '';
            });

            map.on('click', 'points', (e) => {
                console.log("hello, this is ");
                console.log(e);
                descriptionBox.innerHTML = e.features[0].properties.description;
            })

            map.on('mousedown', 'points', (e) => {
                // Prevent the default map drag behavior.
                e.preventDefault();

                canvas.style.cursor = 'grab';

                map.on('mousemove', onMove);
                map.once('mouseup', onUp);
            });

            map.on('touchstart', 'points', (e) => {
                if (e.points.length !== 1) return;

                // Prevent the default map drag behavior.
                e.preventDefault();

                map.on('touchmove', onMove);
                map.once('touchend', onUp);
            });
        });
        

        return () => {
            map.remove();
        }
    }, []);


    

    return (
        <div>
            <div id="map" style={{ width: '90%', height: '500px' }}></div>
            <div id="coordinates"></div>
            <div id="description"></div>
        </div>
    );

    
    
}
