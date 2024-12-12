import { NextResponse } from "next/server";
import prisma from '@/app/prismaFountains';

// Get building by ID
export async function GET(request: Request, {params}: {params: Promise<{id:string}>} ) {
    const id = (await params).id
    let res;
    res = await prisma.building.findUnique({
        where: {
            buildingId: parseInt(id)
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
        error: `No fountain found with the id "${id}"`
      }
    }
    return NextResponse.json( {res} );
}

// Delete building by ID
export async function DELETE(request: Request, {params}: {params: Promise<{id:string}>} ) {
    const id = (await params).id
    let res;
    try 
    {
        res = await prisma.building.delete({
            where: {
                buildingId: parseInt(id)
            }
        });
    } catch(err) {
      res = {
        error: err,
        res:"ID_NOT_FOUND_ERROR"
      }
    }
    return NextResponse.json({res});
}

// Update building by ID
export async function PATCH(request: Request, {params}: {params: Promise<{id:string}>} ) {
    const id = (await params).id
    const data  = await request.json();

    let res;
    try 
    {
      res = await prisma.building.update({
        where: {
          buildingId: parseInt(id),
        },
        data: {
          buildingName : data.buildingName,
          buildingLatitude: data.buildingLatitude,
          buildingLongitude: data.buildingLongitude
        }
      });
    } catch {
      res = "ID_NOT_FOUND_ERROR";
    }
    
    return NextResponse.json({res});
}