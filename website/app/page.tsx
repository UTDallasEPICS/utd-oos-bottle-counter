/*
This file contains the UI for the main home page of the webapp.
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
    return <div className="empty-database"> No fountain data found. Start by clicking "Create" in the navigation bar above.</div>;
  }
  
}
