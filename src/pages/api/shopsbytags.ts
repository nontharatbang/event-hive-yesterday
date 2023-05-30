import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { query } = req;
  const { tags } = query;
  
  if(typeof tags === 'undefined'){
    return res.status(400).json("The tags is not provided")
  }

  const tagIds = Array.isArray(tags) ? tags.map((tag) => parseInt(tag)) : [parseInt(tags)];
  const prisma = new PrismaClient();
  
  const shops = await prisma.shop.findMany({
    where: {
        tags: {
            every:{
                id: {
                    in: tagIds,
                },
            },
        },
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

  if (shops === undefined || shops.length === 0) {
    return res.status(404).json({ message: 'The page does not exist' });
  }

  return res.json(shops);
}