import { NextRequest, NextResponse } from "next/server";
import prisma from '@/app/prismaFountains';

// Get fountain by ID
export async function GET(request: Request, {params}: {params: Promise<{id:string}>} ) {
    
    const id = (await params).id
    const res = await prisma.fountain.findUnique({
        where: {
            "id": parseInt(id)
        },
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

// Delete fountain by ID
export async function DELETE(request: Request, {params}: {params: Promise<{id:string}>} ) {
    const id = (await params).id
    let res;
    try 
    {
        res = await prisma.fountain.delete({
            where: {
                id: parseInt(id)
            }
        });
    } catch {
      res = "ID_NOT_FOUND_ERROR";
    }
    return NextResponse.json({res});
}  

// Update fountain by ID
export async function PATCH(request: Request, {params}: {params: Promise<{id:string}>} ) {
    const id = (await params).id
    const data  = await request.json();

    let res;
    try 
    {
      res = await prisma.fountain.update({
        where: {
          id: parseInt(id),
        },
        data: {
          description : data.description,
        }
      });
    } catch {
      res = "ID_NOT_FOUND_ERROR";
    }
    
    return NextResponse.json({res});
}
  