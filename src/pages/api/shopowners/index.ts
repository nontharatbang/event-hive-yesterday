import { PrismaClient } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler (req: NextApiRequest, res: NextApiResponse) {
    const prisma = new PrismaClient();
    const shopOwners = await prisma.shopOwner.findMany({
        include: {
            shop: true,
        }
    });
  
    return res.json(shopOwners);
}