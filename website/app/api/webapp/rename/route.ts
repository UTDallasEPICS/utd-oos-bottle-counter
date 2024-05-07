/*
This is the Webapp API that is used to Rename a fountain in the SQLite database.
In the Rename page in webapp, there is a form requesting the user to enter an "ID" and "New Name."
With that data, the API uses Prisma to search the database for the fountain with the corresponding ID,
and then changes the name attribute with the new user entered name value.
*/

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

