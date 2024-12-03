import { NextRequest, NextResponse } from "next/server";
import prisma from '@/app/prismaFountains';
import { useSearchParams } from "next/navigation";
import { error } from "console";

// Get all buildings
export async function GET(request:NextRequest) {
    

    try {

      const searchParams = request.nextUrl.searchParams

      let res;

      const buildingName = searchParams.get("buildingName")

      if(buildingName) {
        res = await prisma.building.findFirst({
          where: {
            buildingName: buildingName
          },
          select: {
            buildingId: true,
            buildingLatitude: true,
            buildingLongitude: true,
            buildingName: true,
            fountains: {
                select: {
                    bottleNum: true
                }
            }
          }
        });

        if(res) {
          const formattedRes = {
            buildingId: res.buildingId,
            buildingName: res.buildingName,
            buildingLatitude: res.buildingLatitude,
            buildingLongitude: res.buildingLongitude,
            buildingBottleCount: res.fountains.reduce((sum, fountain) => sum + fountain.bottleNum, 0)
          }
          res = formattedRes
        } else {
          res = {
            error: `No fountain found with the name "${buildingName}"`
          }
        }

      } else {
        res = await prisma.building.findMany({
          select: {
              buildingId: true,
              buildingLatitude: true,
              buildingLongitude: true,
              buildingName: true,
              fountains: {
                  select: {
                      bottleNum: true
                  }
              }
          }
        })

        const formattedRes = res.map(building => ({
          buildingId: building.buildingId,
          buildingName: building.buildingName,
          buildingLatitude: building.buildingLatitude,
          buildingLongitude: building.buildingLongitude,
          buildingBottleCount: building.fountains.reduce((sum, fountain) => sum + fountain.bottleNum, 0)
        }))

        res = formattedRes
      }

      return NextResponse.json( {res} );

    } catch(err) {
      return NextResponse.error()
    }
    

    




}

// Create a building
export async function POST(request:any) {
  const { building } = await request.json();
  const res = await prisma.building.create({
    data: {
      buildingName: building.name,
      buildingLongitude: building.longitude,
      buildingLatitude: building.latitude,
    },
  });

  return NextResponse.json({res});
}