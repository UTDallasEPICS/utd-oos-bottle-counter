import { cache } from 'react'
import { PrismaClient } from '@prisma/client'

 
export const getItem = cache(async () => {
    const prisma = new PrismaClient()
    const item = await prisma.fountain.findUnique({
      where: {
        id: 1,
      },
    })
    return item.name
  })

// export async function getData() {
//     const prisma = new PrismaClient()
//     const fountain = await prisma.fountain.
//     return fountain.json()
//   }