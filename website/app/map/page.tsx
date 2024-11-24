'use client';
import './map-styles.css';
import maplibregl, { MapMouseEvent } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { useEffect , useState } from 'react';
import { buildingsToCoordinates, points } from '../utilities';

/* put description here */

export default function MapPage() {
    const [fountainData, setFountainData] = useState<any[]>([])
    const [buildingData, setBuildingData] = useState<any>(new Map())

    useEffect(() => {
        const map = new maplibregl.Map({
            container: 'map', // container id
            style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${process.env.maptilerApiKey}`, // style URL
            center: [-96.7518, 32.9858], // starting position [lng, lat]
            zoom: 15 // starting zoom
        });

        //const coordinates = document.getElementById('coordinates');
        //const descriptionBox = document.getElementById('description');
        const buildingInfo = document.getElementById('buildingInfo');
        const tableDiv = document.getElementById('tableDiv');
        const buildingTable = document.getElementById('buildingTable');
        
        const canvas = map.getCanvasContainer();

        // console.log("points is " + points)
        const geojson: GeoJSON.FeatureCollection<GeoJSON.Point> = {
            'type': 'FeatureCollection',
            'features': points
        };
        

        function onMove(e: MapMouseEvent) {
            const coords = e.lngLat;

            canvas.style.cursor = 'pointer';
            
        }

        function onUp(e: MapMouseEvent) {
            const coords = e.lngLat;

            /* if (coordinates) {
                // Print the coordinates of where the point had
                // finished being dragged to on the map. Debug.

                coordinates.style.display = 'block';
                coordinates.innerHTML =
                    `Longitude: ${coords.lng}<br />Latitude: ${coords.lat}`; 
            } */

            canvas.style.cursor = '';


            // Unbind mouse/touch events
            map.off('mousemove', onMove);
            map.off('touchmove', onMove);
        }

        map.on('load', () => {
            
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
                // map.setPaintProperty('points', 'circle-color', '#3bb2d0');
                canvas.style.cursor = 'pointer';
            });

            map.on('mouseleave', 'points', () => {
                // map.setPaintProperty('points', 'circle-color', '#3887be');
                // canvas.style.cursor = '';
            });

            map.on('click', 'points', (e) => {
                console.log("hello, this is ");
                console.log(e);
                if (buildingInfo) {
                    //descriptionBox.innerHTML = (e.features as maplibregl.MapGeoJSONFeature[])[0].properties.description;
                    buildingInfo.innerHTML = (e.features as maplibregl.MapGeoJSONFeature[])[0].properties.description + " Filling Stations";
                    buildingInfo.style.visibility = 'visible';
                }

                if (tableDiv) {
                    if (buildingTable) {
                        // Filter for building subtable depending on selected point's building name
                        // Credit goes to: https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_filter_table

                        var tableLocat, tableFilter, tr, td, i, txtValue;
                        tableLocat = (e.features as maplibregl.MapGeoJSONFeature[])[0].properties.description
                        if (tableLocat) {
                            tableFilter = tableLocat.toUpperCase();
                        }

                        tr = buildingTable.getElementsByTagName("tr");

                        for (i = 0; i < tr.length; i++) {
                            td = tr[i].getElementsByTagName("td")[1];

                            if (td) {
                                txtValue = td.textContent || td.innerText;
                                if (txtValue.toUpperCase().indexOf(tableFilter) > -1) {
                                    tr[i].style.display = "";
                                }
                                else {
                                    tr[i].style.display = "none";
                                }
                            }

                        }
                    }

                    tableDiv.style.visibility = 'visible';

                }

                
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

    useEffect(() => {

        const getFountainData = async () => {
            const res = await fetch('/api/webapp/read');
            const data = await res.json();
            console.log(data.res);
            setFountainData(data.res);
        }

        const getBuildingData = async () => {
            const res = await fetch('/api/webapp/readBuildingTotal');
            const data = await res.json();

            const map = new Map();
            

            data.forEach((element: { building: any; _sum: { bottleNum: any; }; }) => {
                map.set(element.building, element._sum.bottleNum)
            }); 

            setBuildingData(map);
        }

        const getCounter = async () => {
            let totalCounter = 0;

            const res = await fetch('/api/webapp/readBuildingTotal');
            const data = await res.json();

            data.forEach((element: { building: any; _sum: { bottleNum: any; }; }) => {
                totalCounter += element._sum.bottleNum;
            }); 
            
            //Code underneath here pertains to the HTML side now
            var counterText = document.getElementById('waterCounter');
            var baseText = "Total Water Bottle Count: ";


            if (counterText) {
                counterText.textContent = baseText + totalCounter.toString();
            }

        }

        getFountainData()
        getBuildingData()
        getCounter();
        
    }, [])

    // console.log("fountainData: " + fountainData)
    const getBuildingBottleNum = async (building: string) => {
        const res = await fetch('/api/webapp/readBuildingTotal?building=ECSW', {
            method: 'GET',
        });        
        // const data = await res.json();
        // console.log(data._sum.bottleNum);
        // if(data._sum.bottleNum) {
        //     return data._sum.bottleNum
        // } else {
        //     return 0
        // }

        
        
    }

    return (

        

        // Both of the below portions are organized into:
        // Display of info on left column, right column exclusively for map

        <div className = "p-6">
            <h1 className = "font-bold font-mono text-4xl text-center">Refillable Station Locator</h1>

            <p>&nbsp;</p>
            <div className = "ml-auto mr-auto max-w-[1200px]">
                <p className = "text-center text-black"> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut 
                    labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea 
                    commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                <p>&nbsp;</p>
            </div>

            <div className = "h-auto w-auto max-w-[1550px] max-h-[900px] mr-auto ml-auto">
                    <div className = "rounded-t-lg block h-24 bg-green-800 p-6">
                        <p className = "font-bold font-mono text-4xl text-center" id = "waterCounter">Total Water Bottle Count: </p>
                    </div>

                    <div className = "columnLeft bg-[#ffcb7d] h-[820px]">
                        <div className = "overflow-y-scroll bg-slate-300">
                            {/* <div>{fountainData}</div> */}
                            <table className = "block max-h-[600px] table-auto w-full">
                                <thead className='w-full'>
                                    <tr className = "bg-green-800 text-white w-full">
                                        <th className='w-[30%] text-left'><strong>Bottle Count</strong></th>
                                        <th className='w-[60%] text-left'><strong>Building</strong></th>
                                    </tr>
                                </thead>
                                <tbody className = "table-auto w-full">

                                    {/* The format of this table is:

                                    Number of     |   (bolded) Building Info
                                    water bottles |   Location Info */}

                                    

                                    {
                                        Array.from(buildingsToCoordinates.keys()).map(building => ( 
                                            (<tr key={building} className='w-full'>
                                                <td>{buildingData.get(building) || 0}</td>
                                                <td> <strong>{building}</strong></td>
                                            </tr>)            
                                        ))
                                    }

                                    
                                </tbody>
                            </table>
                        </div>

                        {/* This box's text is invisible until a point is clicked on the map*/}
                        <div className = "block bg-slate-200 h-1/4 p-2 overflow-hidden">
                            <div className = "my-2">
                                <p className = "text-black text-center text-lg invisible" id = "buildingInfo"></p>
                            </div>

                            {/* The table underneath here will be invisible until someone clicks one of the points on the map
                            Then, it will filter out all results except the selected building.*/}

                            <div className = "overflow-y-scroll w-[100%] max-h-[90%] invisible bg-slate-300" id = "tableDiv">
                                <table className = "table-auto w-full" id = "buildingTable">
                                    <tbody className = "w-full">

                                        {
                                            fountainData.map(fountain => (
                                                <tr key={fountain.id} className='w-full'>
                                                    <td className = "w-[50%]">{fountain.bottleNum}</td>
                                                    <td className = "w-[50%]"> <strong>{fountain.building}</strong> <br></br>{fountain.description}</td>
                                                </tr>
                                            ))
                                        }

                                    </tbody>
                                </table>
                            </div>

                        </div>
                    </div>

                    <div className = "columnRight" style = {{backgroundColor: "#154734"}}>
                        <div>
                            <div id="map" style={{ width: '100%', height: '800px' }}></div>
                        </div>
                    </div>

                </div>
        </div>
    );

    
    
}
