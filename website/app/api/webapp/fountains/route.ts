import { NextRequest, NextResponse } from "next/server";
import prisma from '@/app/prismaFountains';

// Get all fountains
export async function GET() {
    const res = await prisma.fountain.findMany({
      select: {
        bottleNum: true,
        building: true,
        buildingId: true,
        description: true,
        id: true,
      }
    });
  
    return NextResponse.json({res});
}

// Create a fountain
export async function POST(request: Request) {

    try {
      const data = await request.json();

      const building = await prisma.building.findFirst(
        {
          where: {
            buildingName: data.fountain.buildingName
          }
        }
      )
  
      if(!building) {
        return NextResponse.json({error: "error: building does not exist"})
      }
  
      const res = await prisma.fountain.create({
        data: {
          buildingId: building.buildingId,
          description: data.fountain.description,
          bottleNum: data.fountain.bottleNum,
        },
      });
  
      return NextResponse.json({res});
    } catch(error) {
      return NextResponse.error()
    }
    
}


  