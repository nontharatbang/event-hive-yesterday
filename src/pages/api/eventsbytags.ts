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
  
  const events = await prisma.event.findMany({
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
        eventOrganizer: true,
        shopApplications: true,
        shopParticipations: true,
        favouriteByVisitors: true,
    },
  });

  if (events === undefined || events.length === 0) {
    return res.status(404).json({ message: 'The page does not exist' });
  }

  return res.json(events);
}