import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  //Prisma Queries
  //Create a fountain
  const fountain = await prisma.fountain.create({
    data: {
      name: 'Synergy Park',
      bottleNum: 123456
    }
  })

  console.log(fountain);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });