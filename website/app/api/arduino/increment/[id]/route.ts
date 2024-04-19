import prisma from '@/app/prismaFountains';
import { NextResponse } from 'next/server';

export async function GET(request:any, { params }:any) {
  console.log('ARDUINO INCREMENT API');
  const id = params.id;
  const res = await prisma.fountain.update({
    where: {
      id: parseInt(id),
    },
    data: {
      bottleNum: {
        increment: 1,
      },
    },
  });

  return NextResponse.json(res);
}