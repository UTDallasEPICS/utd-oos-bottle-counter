import { NextResponse } from "next/server";
import prisma from '@/app/prismaFountains';

export async function POST(request:any) {
  const { fountain } = await request.json();
  try {
  const res = await prisma.fountain.delete({
    where: {
      id: fountain.id,
    },
  }); 
  return NextResponse.json({ res });
}
  catch {
    const map1 = new Map();

map1.set('Error', "That ID doesn't exist!");  
return NextResponse.json({ map1 });

}
  }

