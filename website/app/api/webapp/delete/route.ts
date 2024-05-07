/*
This is the Webapp API that is used to Delete a fountain in the SQLite database.
On the Delete page, there is a form in which the user enters in the ID of fountain they wish to delete.
The API then uses Prisma to search for the ID and then deletes the corresponding fountain from database.
*/

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

