import { NextResponse } from "next/server";
import prisma from '@/app/prismaFountains';

export async function GET(request: Request) {
    
    
    const { searchParams } = new URL(request.url)
    const buildingParam = searchParams.get("building")
    let res;
    try {
        if(buildingParam) {
            res = await prisma.fountain.aggregate({
                _sum: {
                  bottleNum: true,
                },
                where: {
                  building: {
                    contains: buildingParam,
                  },
                },
              })
        } else {
            res = await prisma.fountain.groupBy({
                by: ['building'],
                _sum: {
                  bottleNum: true,
                },
            })
        }
        return NextResponse.json( res );
    } catch(err) {
        return NextResponse.error()
    }
    

   

  
}