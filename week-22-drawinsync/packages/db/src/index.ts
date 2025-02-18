import { PrismaClient } from "@prisma/client"

// console.log(`prisma using ${process.env.DATABASE_URL}`);

// const prisma = new PrismaClient({
//     datasources: {
//         db: {
//             url: process.env.DATABASE_URL,
//         },
//     },
// });

const prisma = new PrismaClient();

export { prisma };