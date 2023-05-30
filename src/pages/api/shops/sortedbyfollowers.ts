import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    const prisma = new PrismaClient();
    const sortedShops = await prisma.shop.findMany({
        include: {
            tags: true,
            shopOwner: true,
            eventApplications: true,
            eventParticipations: true,
            favouriteByVisitors: true,
            products: true,
        },
        orderBy: {
            favouriteByVisitors: {
                _count: 'desc',
            }
        }
    });

    return res.json(sortedShops);
}