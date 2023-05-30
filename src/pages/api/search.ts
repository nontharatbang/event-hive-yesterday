import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    const { query } = req;
    const { searchString } = query;
    const prisma = new PrismaClient();
    const events = await prisma.event.findMany({
        where: {
            OR: [
                {
                    eventName: {
                        contains: Array.isArray(searchString)
                        ? searchString[0]: searchString,
                        mode: "insensitive",
                    },
                },
            ],
        },
        include: {
            tags: true,
            eventOrganizer: true,
            shopApplications: true,
            shopParticipations: true,
            favouriteByVisitors: true,
        },
    });

    const shops = await prisma.shop.findMany({
        where: {
            OR: [
                {
                    shopName: {
                        contains: Array.isArray(searchString)
                        ? searchString[0]: searchString,
                        mode: "insensitive",
                    },
                },
            ],
        },
        include: {
            tags: true,
            shopOwner: true,
            eventApplications: true,
            eventParticipations: true,
            favouriteByVisitors: true,
            products: true,
        },
    });

    const results = [...events, ...shops];
    
    
    if(results === undefined || results.length == 0){
        return res.status(404).json({message: `The result with ${searchString} is not found`});
    }

    return res.json(results);
 }