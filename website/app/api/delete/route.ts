import { NextResponse } from "next/server";
import prisma from '@/app/prismaFountains';

export async function POST(request:any) {
  const { fountain } = await request.json();
  const res = await prisma.fountain.delete({
    where: {
      id: fountain.id,
    },
  });

  console.log(res)
  return NextResponse.json({ res });
}