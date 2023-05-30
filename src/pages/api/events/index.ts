import { PrismaClient } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler (req: NextApiRequest, res: NextApiResponse) {
    const prisma = new PrismaClient();
    const currentDate = new Date();
    const events = await prisma.event.findMany({
        where: {
            endDate: {
              gte: currentDate.toISOString(),
            },
        },
        orderBy: {
            startDate: 'asc',
        },
        include: {
            tags: true,
            eventOrganizer: true,
            shopApplications: true,
            shopParticipations: true,
            favouriteByVisitors: true,
        },
    });

    return res.json(events);
}