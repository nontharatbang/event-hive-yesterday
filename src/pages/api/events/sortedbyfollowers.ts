import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    const prisma = new PrismaClient();
    const sortedEvents = await prisma.event.findMany({
        include: {
            tags: true,
            eventOrganizer: true,
            shopApplications: true,
            shopParticipations: true,
            favouriteByVisitors: true,
        },
        orderBy: {
            favouriteByVisitors: {
                _count: 'desc',
            }
        }
    });

    return res.json(sortedEvents);
}