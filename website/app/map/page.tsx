'use client';
import './map-styles.css';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { useEffect } from 'react';

/* put description here */

export default function MapPage() {

    useEffect(() => {
        const map = new maplibregl.Map({
            container: 'map', // container id
            style: 'https://api.maptiler.com/maps/streets-v2/style.json?key=3T1AwsI81EOWhVUN9xmy', // style URL
            center: [-96.7518, 32.9858], // starting position [lng, lat]
            zoom: 15 // starting zoom
        });

        return () => {
            map.remove();
        }
    }, []);


    

    return (
        <div>
            <div id="map" style={{ width: '90%', height: '500px' }}></div>
        </div>
    );

    
    
}
