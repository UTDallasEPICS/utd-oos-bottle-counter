import { NextResponse } from "next/server";
import prisma from '@/app/prismaFountains';

export async function POST(request:any) {
  const { fountain } = await request.json();
  const res = await prisma.fountain.create({
    data: {
      name: fountain.name,
      bottleNum: fountain.bottleNum,
    },
  });

  // console.log(res)
  return NextResponse.json({ res });
}