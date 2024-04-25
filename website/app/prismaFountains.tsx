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
  const fountains:any = await prisma.fountain.findMany();
  let fountainString = JSON.stringify(fountains);

  return fountainString
})
