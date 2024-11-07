import { NextResponse } from "next/server";
import prisma from '@/app/prismaFountains';

export async function POST(request:any) {
  const { building } = await request.json();
  const res = await prisma.building.create({
    data: {
      buildingName: building.name,
      buildingLongitude: building.longitude,
      buildingLatitude: building.latitude,

    },
  });

  // console.log(res)
  return NextResponse.json({ res });
}