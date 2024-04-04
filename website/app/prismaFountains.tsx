import { cache } from 'react'
import { PrismaClient } from '@prisma/client'

//Next.js bug with prisma requires this online solution with a global prisma instance for dev build,
const prismaClientSingleton = () => {
  return new PrismaClient()
}

declare global {
  var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>
}

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma

export const getItem = cache(async () => {
    //const item:any = await prisma.$queryRaw`SELECT SUM(bottleNum) FROM fountain` //Returns an array containing one array containing the number :| 
    //const bottleCount = Number(item[0]['SUM(bottleNum)']) 

    const fountains:any = await prisma.fountain.findMany();
    //console.log(fountains);
    //const firstFountain = (fountains[0].name);
    //console.log(firstFountain);
    let fountainString = JSON.stringify(fountains);
    //console.log(fountainString);
   
    return fountainString
  })
