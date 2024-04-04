import './styles.css'
import Title from './components/title';
import LocationInterface from './components/location';
import Fountain from './components/fountain';
import TotalCounter from './components/total-counter';
import { getItem } from './prismaFountains'

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


export default async function Page() {
  const item = await getItem();
  let fountainArray = JSON.parse(item);
  //console.log(fountainArray);

  /*let fountainNames = fountainArray.map( (fountain:any) => { 
    return fountain.name
  });
  //console.log(fountainNames); */

  let totalCounter = 0;
  fountainArray.forEach( (fountain:any) => { totalCounter += fountain.bottleNum });

  return(<>
    <Title/>
    {fountainArray.map( (fountain:any, index:Number) => (<Fountain key={index} name={fountain.name} count={fountain.bottleNum}/>) )}
    <TotalCounter counter={totalCounter}/>
  </>)
}
