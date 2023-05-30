import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    const prisma = new PrismaClient();
    const shops = await prisma.shop.findMany({
        include: {
            tags: true,
            shopOwner: true,
            eventApplications: true,
            eventParticipations: true,
            favouriteByVisitors: true,
            products: true,
        },
    });

    return res.json(shops);
}