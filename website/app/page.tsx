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

  return(<>
    <TotalCounter counter={totalCounter}/>
    <SearchBar fountainArray={fountainArray}/>
    
  </>)
}
