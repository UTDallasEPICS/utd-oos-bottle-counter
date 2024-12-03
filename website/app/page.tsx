/*
This file contains the UI for the main home page of the webapp.
The page firsts contacts the database using Prisma (prismaFountains.tsx) 
and retrieves the data of all the fountains as a JSON object (array of fountain objects).
This file also contains code to calculate
*/

import TotalCounter from './components/total-counter';
import { getFountains, getBuildings } from './prismaFountains'
import { PrismaClient } from '@prisma/client';
import SearchBar from './components/search-fountains';
import BuildingSearchBar from './components/search-buildings';

const prisma = new PrismaClient();

export default async function Page() {
  const fountains = await getFountains();
  let fountainArray = JSON.parse(fountains);

  const buildings = await getBuildings();
  let buildingArray = JSON.parse(buildings);

  let totalCounter = 0;
  fountainArray.forEach( (fountain:any) => { totalCounter += fountain.bottleNum });

  if(fountainArray.length !== 0) {
    return(<>
      <TotalCounter counter={totalCounter}/>
      <SearchBar fountainArray={fountainArray}/>
      <br />
      <br />
      <br />
      <BuildingSearchBar buildingArray={buildingArray}/>
    </>);
  } else if(buildingArray.length !== 0){
    return(<>
      <TotalCounter counter={totalCounter}/>
      <BuildingSearchBar buildingArray={buildingArray}/>
    </>);
  }
  else {
    return <div className="empty-database"> No fountain data found. Start by clicking &quot;Create&quot; in the navigation bar above.</div>;
  }
  
}
