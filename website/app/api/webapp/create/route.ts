/*
This is the Webapp API that is used to Create a fountain in the SQLite database.
It receives a JSON "Fountain" object containing variables such as "name" and "initial bottle count".
The fountain object is sent from the user form found on the Create page.
The API then uses that info to create a new fountain in SQLite database using Prisma.
The res variable can also give the ID parameter, which will be displayed after form submission.
*/

import { NextResponse } from "next/server";
import prisma from '@/app/prismaFountains';

export async function POST(request:any) {
  const { fountain } = await request.json();
  const res = await prisma.fountain.create({
    data: {
      building: fountain.building,
      description: fountain.description,
      bottleNum: fountain.bottleNum,
    },
  });

  // console.log(res)
  return NextResponse.json({ res });
}