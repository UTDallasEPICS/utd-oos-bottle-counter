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

export const getFountains = cache(async () => {

  const fountains = await prisma.fountain.findMany({
    select: {
      bottleNum: true,
      building: true,
      buildingId: true,
      description: true,
      id: true,
    }
  });
  let fountainString = JSON.stringify(fountains);
  return fountainString

})

export const getBuildings = cache(async () => {

  const res = await prisma.building.findMany({
    select: {
        buildingId: true,
        buildingLatitude: true,
        buildingLongitude: true,
        buildingName: true,
        fountains: {
            select: {
                bottleNum: true
            }
        }
    }
  })

  const buildings = res.map(building => ({
    buildingId: building.buildingId,
    buildingName: building.buildingName,
    buildingLatitude: building.buildingLatitude,
    buildingLongitude: building.buildingLongitude,
    buildingBottleCount: building.fountains.reduce((sum, fountain) => sum + fountain.bottleNum, 0)
  }))

  let buildingString = JSON.stringify(buildings);
  return buildingString

})
