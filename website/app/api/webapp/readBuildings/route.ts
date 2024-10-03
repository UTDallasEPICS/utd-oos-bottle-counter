import { NextResponse } from "next/server";
import prisma from '@/app/prismaFountains';

export async function GET() {
    const res = await prisma.fountain.findMany({
        select: {
            building: true,
        },
    })

  return NextResponse.json( res );
}