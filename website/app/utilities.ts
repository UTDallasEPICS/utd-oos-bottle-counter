import prisma from '@/app/prismaFountains';
import { NextResponse } from 'next/server';

const getBuildingsList = async () => {
    const res = await fetch('/api/webapp/readBuildings', {
        method: 'GET',
    })

    const data = await res.json()

    let buildingsList = data.map(({ building } : {building:string}) => building )

    // console.log(data)
    // console.log(buildingsList)

    const buildingsSet = new Set(buildingsList)

    buildingsList = Array.from(buildingsSet)

    return buildingsList
}

const getBuildingBottleCount = async () => {
    
}

const buildingsToCoordinates = new Map<string, [number, number]>();
buildingsToCoordinates.set("ECSW" , [-96.7514513305792, 32.98610030104277])
buildingsToCoordinates.set("ECSS" , [-96.75042793676755, 32.98618327336875])
buildingsToCoordinates.set("Hoblitzelle" , [-96.7516211929345, 32.986982962300104])
buildingsToCoordinates.set("SCI", [-96.75074819240945, 32.98876762839279])
buildingsToCoordinates.set("Activity Center" , [-96.74734014824898, 32.985717162356146])
buildingsToCoordinates.set("Administration" , [-96.74782142528447, 32.99152229562808])
buildingsToCoordinates.set("BSB" , [96.74875434044183, -32.99140967590686])
buildingsToCoordinates.set("Callier Center" , [-96.7486622409143, 32.99251715404285])
buildingsToCoordinates.set("CCHN" , [-96.7548914938607, 32.98163647099577])
buildingsToCoordinates.set("CCHS" , [-96.7549990729741, 32.981212871037535])
buildingsToCoordinates.set("Green Hall" , [-96.74779808413881, 32.988418083881804])
buildingsToCoordinates.set("Davidson-Gundy Alumni Center", [-96.74627529935792, 32.98614774980285])
buildingsToCoordinates.set("Jonsson Hall", [-96.74881261572483, 32.98887957834881])
buildingsToCoordinates.set("McDermott Library", [-96.74761332767021, 32.987149072869904])
buildingsToCoordinates.set("Founders North", [-96.74947670998084, 32.98813241981854])
buildingsToCoordinates.set("NSERL", [-96.75001272113295, 32.99139906007978])
buildingsToCoordinates.set("JSOM", [-96.74690993517825, 32.98507498440582])
buildingsToCoordinates.set("Rec Center West", [-96.75527923647955, 32.98997135150004])
buildingsToCoordinates.set("Safety and Grounds", [-96.75264260691362, 32.9816004756689])
buildingsToCoordinates.set("SSA", [-96.74941718120182, 32.98606427683613])
buildingsToCoordinates.set("SU", [-96.74887027731431, 32.98691182246341])
buildingsToCoordinates.set("Visitor Center", [-96.74971710645512, 32.98467356870632])

let points: GeoJSON.Feature<GeoJSON.Point, GeoJSON.GeoJsonProperties>[] = []

buildingsToCoordinates.forEach((coordinate, building) => {
    points.push(
        {
            'type': 'Feature',
            'geometry': {
                'type': 'Point',
                'coordinates': coordinate as GeoJSON.Position
            },
            'properties': {
                'description': building
            }
        }
    )
})

export {
    getBuildingsList, 
    buildingsToCoordinates,
    points
};