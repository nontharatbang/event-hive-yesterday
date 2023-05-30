import { PrismaClient } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    const { query } = req;
    const { id } = query;
    const prisma = new PrismaClient();
    const favouriteShops = await prisma.visitor.findMany({
        where: {
            id: {
                contains: Array.isArray(id)
                ? id[0]: id,
            },
        },
        select: {
            favouriteShops: {
                select: {
                    id: true,
                    shopName: true,
                    about: true,
                    address: true,
                    picture: true,
                    tags:true,
                    telephone:true,
                    facebook:true,
                    instagram: true,
                    line:true,
                    tiktok:true,
                    shopOwner:true,
                    shopOwnerId:true,
                    eventApplications:true,
                    eventParticipations:true,
                    favouriteByVisitors:true,
                    products: true,
                },
            },
        },
    },
    );

    if(favouriteShops === undefined || favouriteShops.length == 0){
        return res.status(404).json({message: 'The page does not exist'});
    }
    
    return res.json(favouriteShops);
}