import { NextResponse } from "next/server";
import prisma from '@/app/prismaFountains';

export async function POST(request:any) {
  const newName  = await request.json();
  console.log(newName)
  let res;
  try 
  {
    res = await prisma.fountain.update({
      where: {
        id: newName.fountain.id,
      },
      data: {
        name : newName.fountain.name,
      }
    });
  } catch {
    res = "ID_NOT_FOUND_ERROR";
  }
  

  console.log("Response: " + res);
  return NextResponse.json({ res });
}

