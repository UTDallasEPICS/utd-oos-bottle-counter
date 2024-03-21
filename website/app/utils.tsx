import { cache } from 'react'
import { PrismaClient } from '@prisma/client'


//Next.js bug with prisma requires this online solution with a global prisma instance for dev build,
//My code starts on line 21
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
    const item:any = await prisma.$queryRaw`SELECT SUM(BottleNum) FROM fountain` //Returns an array containing one array containing the number :| 
    const bottleCount = Number(item[0]['SUM(BottleNum)'])    
    return bottleCount
  })