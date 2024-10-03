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

export default getBuildingsList;