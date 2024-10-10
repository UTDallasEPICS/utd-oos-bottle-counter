import maplibregl, { GeoJSONSource, MapMouseEvent } from 'maplibre-gl';



const points: GeoJSON.Feature<GeoJSON.Point, GeoJSON.GeoJsonProperties>[] = [
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
    },
    {
        'type': 'Feature',
        'geometry': {
            'type': 'Point',
            'coordinates': [-96.75074819240945, 32.98876762839279] as [number, number]
        },
        'properties': {
            'description': 'SCI'
        }
    },
    {
        'type': 'Feature',
        'geometry': {
            'type': 'Point',
            'coordinates': [-96.74734014824898, 32.985717162356146] as [number, number]
        },
        'properties': {
            'description': 'Activity Center'
        }
    },
    {
        'type': 'Feature',
        'geometry': {
            'type': 'Point',
            'coordinates': [-96.74782142528447, 32.99152229562808] as [number, number]
        },
        'properties': {
            'description': 'Administration'
        }
    },{
        'type': 'Feature',
        'geometry': {
            'type': 'Point',
            'coordinates': [96.74875434044183, -32.99140967590686] as [number, number]
        },
        'properties': {
            'description': 'BSB'
        }
    },
    {
        'type': 'Feature',
        'geometry': {
            'type': 'Point',
            'coordinates': [-96.7486622409143, 32.99251715404285] as [number, number]
        },
        'properties': {
            'description': 'Callier Center'
        }
    },
    {
        'type': 'Feature',
        'geometry': {
            'type': 'Point',
            'coordinates': [-96.7548914938607, 32.98163647099577] as [number, number]
        },
        'properties': {
            'description': 'CCHN'
        }
    },
    {
        'type': 'Feature',
        'geometry': {
            'type': 'Point',
            'coordinates': [-96.7549990729741, 32.981212871037535] as [number, number]
        },
        'properties': {
            'description': 'CCHS'
        }
    },
    {
        'type': 'Feature',
        'geometry': {
            'type': 'Point',
            'coordinates': [-96.74779808413881, 32.988418083881804] as [number, number]
        },
        'properties': {
            'description': 'Green Hall'
        }
    },
]

export default points