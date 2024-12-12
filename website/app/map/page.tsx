'use client';
import './map-styles.css';
import maplibregl, { MapMouseEvent } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { useEffect , useState } from 'react';
import { buildingsToCoordinates, points, Building } from '../utilities';

/* put description here */

export default function MapPage() {
    const [fountainData, setFountainData] = useState<any[]>([])
    const [buildingData, setBuildingData] = useState<any>([])
    const [map, setMap] = useState<maplibregl.Map>()


    function createBuildingTable(buildingName : string) {
        const buildingInfo = document.getElementById('buildingInfo');
        const tableDiv = document.getElementById('tableDiv');
        const buildingTable = document.getElementById('buildingTable');

        if (buildingInfo) {
            //descriptionBox.innerHTML = (e.features as maplibregl.MapGeoJSONFeature[])[0].properties.description;
            buildingInfo.innerHTML = buildingName + " Filling Stations";
            buildingInfo.style.visibility = 'visible';
        }

        if (tableDiv) {
            if (buildingTable) {
                // Filter for building subtable depending on selected point's building name
                // Credit goes to: https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_filter_table

                var tableLocat, tableFilter, tr, td, i, txtValue;
                tableFilter = ""
                tableLocat = buildingName
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
    }
    
    useEffect(() => {

        const getFountainData = async () => {
            const res = await fetch('/api/webapp/fountains');
            const data = await res.json();
            console.log(data.res);
            setFountainData(data.res);
        }

        const getBuildingData = async () => {
            const res = await fetch('/api/webapp/buildings');
            const data = await res.json();

            // const map = new Map();
            

            // data.forEach((element: { building: any; _sum: { bottleNum: any; }; }) => {
            //     map.set(element.building, element._sum.bottleNum)
            // }); 

            // setBuildingData(map);
            console.log("this should be the building data", data.res.sort())
            setBuildingData(data.res.sort());
            
        }

        const getCounter = async () => {
            let totalCounter = 0;

            const res = await fetch('/api/webapp/buildings');
            const data = await res.json();

            data.res.forEach((building: any) => {
                totalCounter += building.buildingBottleCount;
            })

            // data.forEach((element: { building: any; _sum: { bottleNum: any; }; }) => {
            //     totalCounter += element._sum.bottleNum;
            // }); 
            
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

    useEffect(() => {
        console.log("does map exist?", (map ? 
            "yes" : "no"
        ) )

        const bottleMap = new maplibregl.Map({
            container: 'map', // container id
            style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${process.env.maptilerApiKey}`, // style URL
            center: [-96.7518, 32.9858], // starting position [lng, lat]
            zoom: 15 // starting zoom
        });

        setMap(bottleMap)

        return () => {
            bottleMap.remove();
        }
    }, []);


    useEffect(() => {
        if(map) {
            const buildingInfo = document.getElementById('buildingInfo');
            const tableDiv = document.getElementById('tableDiv');
            const buildingTable = document.getElementById('buildingTable');
            
            const canvas = map.getCanvasContainer();
            let geojson: GeoJSON.FeatureCollection<GeoJSON.Point>;

            if(buildingData.length > 0) {
                let pts: GeoJSON.Feature<GeoJSON.Point, GeoJSON.GeoJsonProperties>[] = []

                console.log("buildingData", buildingData)
    
                buildingData.forEach((building : Building) => {
                    pts.push(
                        {
                            'type': 'Feature',
                            'geometry': {
                                'type': 'Point',
                                'coordinates': [building.buildingLongitude, building.buildingLatitude] as GeoJSON.Position
                            },
                            'properties': {
                                'description': building.buildingName
                            }
                        }
                    )
                })
    
                console.log("pts", pts)
        
                // console.log("points is " + points)
                geojson = {
                    'type': 'FeatureCollection',
                    'features': pts
                };
            }
            
            
    
            const onMove = (e: MapMouseEvent) => {
                const coords = e.lngLat;
    
                canvas.style.cursor = 'pointer';
                
            }
    
            const onUp = (e: MapMouseEvent) => {
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
                if(buildingData.length > 0) {
                    map.addSource('buildings', {
                        'type': 'geojson',
                        'data': geojson
                    });
                    
                    console.log(map.getSource("buildings"))
    
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
    
                    console.log(map.getLayer("points"))
        
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
                        // if (buildingInfo) {
                        //     //descriptionBox.innerHTML = (e.features as maplibregl.MapGeoJSONFeature[])[0].properties.description;
                        //     buildingInfo.innerHTML = (e.features as maplibregl.MapGeoJSONFeature[])[0].properties.description + " Filling Stations";
                        //     buildingInfo.style.visibility = 'visible';
                        // }
        
                        // if (tableDiv) {
                        //     if (buildingTable) {
                        //         // Filter for building subtable depending on selected point's building name
                        //         // Credit goes to: https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_filter_table
        
                        //         var tableLocat, tableFilter, tr, td, i, txtValue;
                        //         tableLocat = (e.features as maplibregl.MapGeoJSONFeature[])[0].properties.description
                        //         console.log("tableLocat is", tableLocat)
                        //         if (tableLocat) {
                        //             tableFilter = tableLocat.toUpperCase();
                        //         }
        
                        //         tr = buildingTable.getElementsByTagName("tr");
        
                        //         for (i = 0; i < tr.length; i++) {
                        //             td = tr[i].getElementsByTagName("td")[1];
        
                        //             if (td) {
                        //                 txtValue = td.textContent || td.innerText;
                        //                 if (txtValue.toUpperCase().indexOf(tableFilter) > -1) {
                        //                     tr[i].style.display = "";
                        //                 }
                        //                 else {
                        //                     tr[i].style.display = "none";
                        //                 }
                        //             }
        
                        //         }
                        //     }
        
                        //     tableDiv.style.visibility = 'visible';
        
                        // }
                        createBuildingTable((e.features as maplibregl.MapGeoJSONFeature[])[0].properties.description)
        
                        
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
                }
                
                console.log(map);
            });
        }
        //const coordinates = document.getElementById('coordinates');
        //const descriptionBox = document.getElementById('description');
        
    }, [buildingData])

    

    // console.log("fountainData: " + fountainData)
    const getBuildingBottleNum = async (building: string) => {
        const res = await fetch(`/api/webapp/buildings?buildingName=${building}`, {
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
                <p className = "text-center text-black">Throughout the main campus, there are over 40 water bottle refilling stations located at UT Dallas. These stations use an sensor to refill your bottles with clean, chilled water. These stations provide opportunity for students, staff, and faculty to refill their water bottles while preventing the addition of another plastic bottle into the waste stream. The ticker number located on the top of the stations identify the total number of bottles filled by utilizing the station.</p>
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
                                        // Array.from(buildingsToCoordinates.keys()).map(building => ( 
                                        //     (<tr key={building} className='w-full'>
                                        //         <td>{buildingData.get(building) || 0}</td>
                                        //         <td> <strong>{building}</strong></td>
                                        //     </tr>)            
                                        // ))
                                        buildingData.map((building: any) => {
                                            return (
                                                <tr key={building.buildingId} className='w-full' onClick={() => createBuildingTable(building.buildingName)}>
                                                    <td>{building.buildingBottleCount}</td>
                                                    <td> <strong>{building.buildingName}</strong></td>
                                                </tr>
                                            );          
                                        })
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
                                                    <td className = "w-[50%]"> <strong>{fountain.building.buildingName}</strong> <br></br>{fountain.description}</td>
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
