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

const buildingsToCoordinates = {
    "ECSW" : [-96.7514513305792, 32.98610030104277],
    "ECSS" : [-96.75042793676755, 32.98618327336875],
    "Hoblitzelle" : [-96.7516211929345, 32.986982962300104],
    "SCI" : [-96.75074819240945, 32.98876762839279],
    "Activity Center" : [-96.74734014824898, 32.985717162356146],
    "Administration" : [-96.74782142528447, 32.99152229562808],
    "BSB" : [96.74875434044183, -32.99140967590686],
    "Callier Center" : [-96.7486622409143, 32.99251715404285],
    "CCHN" : [-96.7548914938607, 32.98163647099577],
    "CCHS" : [-96.7549990729741, 32.981212871037535],
    "Green Hall" : [-96.74779808413881, 32.988418083881804],
    "Davidson-Gundy Alumni Center": [-96.74627529935792, 32.98614774980285],
    "Jonsson Hall": [-96.74881261572483, 32.98887957834881],
    "McDermott Library": [-96.74761332767021, 32.987149072869904],
    "Founders North": [-96.74947670998084, 32.98813241981854],
    "NSERL": [-96.75001272113295, 32.99139906007978],
    "JSOM": [-96.74690993517825, 32.98507498440582],
    "Rec Center West": [-96.75527923647955, 32.98997135150004],
    "Safety and Grounds": [-96.75264260691362, 32.9816004756689],
    "SSA": [-96.74941718120182, 32.98606427683613],
    "SU": [-96.74887027731431, 32.98691182246341],
    "Visitor Center": [-96.74971710645512, 32.98467356870632],
};

export {
    getBuildingsList, 
    buildingsToCoordinates};