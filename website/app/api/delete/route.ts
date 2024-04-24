import { NextResponse } from "next/server";
import prisma from '@/app/prismaFountains';

export async function POST(request:any) {
  const { fountain } = await request.json();
  let res;
  try 
  {
    res = await prisma.fountain.delete({
      where: {
        id: fountain.id,
      },
    });
  } catch {
    res = "ID_NOT_FOUND_ERROR";
  }
  

  console.log("Response: " + res);
  return NextResponse.json({ res });
}