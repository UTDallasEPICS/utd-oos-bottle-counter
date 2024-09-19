/*
This file contains the UI for the main home page of the webapp.
The page firsts contacts the database using Prisma (prismaFountains.tsx) 
and retrieves the data of all the fountains as a JSON object (array of fountain objects).
This file also contains code to calculate
*/

import TotalCounter from './components/total-counter';
import { getItem } from './prismaFountains'
import { PrismaClient } from '@prisma/client';
import SearchBar from './components/search-fountains';

const prisma = new PrismaClient();

export default async function Page() {
  const item = await getItem();
  let fountainArray = JSON.parse(item);

  let totalCounter = 0;
  fountainArray.forEach( (fountain:any) => { totalCounter += fountain.bottleNum });

  if(fountainArray.length !== 0) {
    return(<>
      <TotalCounter counter={totalCounter}/>
      <SearchBar fountainArray={fountainArray}/>
    </>);
  }
  else {
    return <div className="empty-database"> No fountain data found. Start by clicking &quot;Create&quot; in the navigation bar above.</div>;
  }
  
}
