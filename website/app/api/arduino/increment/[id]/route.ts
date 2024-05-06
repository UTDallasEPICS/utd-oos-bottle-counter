/*
This is the Arduino API that is called after the fountain's Arduino senses a bottle has been filled.
The Arduino is given a URL like: 192.168.0.1/api/arduino/increment/[id]
Based on the ID in the URL, the API will uss Prisma to alter the SQLite database row 
and increment that fountain's bottleNum value.
*/

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