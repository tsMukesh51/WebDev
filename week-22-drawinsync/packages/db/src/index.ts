import { PrismaClient } from "@prisma/client"

const prisma: any = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production")
    global.prisma = prisma;

export { prisma };