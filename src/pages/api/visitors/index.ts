import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    const prisma = new PrismaClient();
    const visitor = await prisma.visitor.findMany({
        include: {
            tags: true,
            favouriteShops: true,
            favouriteEvents: true,
        }
    });

    return res.json(visitor);
    // return res.status(200).json('works well from users index api');
}