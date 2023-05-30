import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import validateInput from 'utils/validateInput';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { shopId, eventId } = req.body;

  if (!shopId || !eventId) {
    return res.status(400).json({ message: 'Missing shopId or eventId in the request body' });
  }

  try {
    const shop = await validateInput(shopId, 'shop');
    const event = await validateInput(eventId, 'event');

    if (!shop || !event) {
      return res.status(404).json({ message: 'Shop or event not found' });
    }

    const updatedEvent = await prisma.event.update({
      where: { id: eventId },
      data: { shopApplications: { disconnect: { id: shopId } }},
    });
    
    const updatedShop = await prisma.shop.update({
        where: { id: shopId },
        data: { eventApplications: { disconnect: {id: eventId }}},
    })

    const updatedEventParticipation = await prisma.event.update({
        where: { id: eventId },
        data: { shopParticipations: {connect: {id: shopId }}},
    })

    return res.status(200).json(updatedEventParticipation);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: 'Something went wrong' });
  }
}
