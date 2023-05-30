// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// import type { NextApiRequest, NextApiResponse } from 'next'

import { NextApiRequest, NextApiResponse } from "next"
import { Prisma, PrismaClient } from "@prisma/client"
import validateInput from "utils/validateInput";
import checkExist from "utils/checkExist";

export default async function register(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method is not allowed' })
  }
  try {
    const { firstName, lastName, image, email, password, tags, favouriteShopIds, favouriteEventIds } = req.body;
    const prisma = new PrismaClient();

    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }
    const existingEmail = await checkExist(email);

    if (existingEmail) {
      return res.status(400).json({ message: 'The email has already been taken. Please try another email.' })
    }
    const visitorTags = await validateInput(tags, 'tag');
    const visitorFavouriteShops = await validateInput(favouriteShopIds, 'shop');
    const visitorFavouriteEvents = await validateInput(favouriteEventIds, 'event');

    const visitor = await prisma.visitor.create({
      data: {
        firstName: firstName,
        lastName: lastName,
        image: image,
        email: email,
        password: password,
        tags: visitorTags,
        favouriteShops: visitorFavouriteShops,
        favouriteEvents: visitorFavouriteEvents,
      },
      include: {
        tags: true,
        favouriteShops: true,
        favouriteEvents: true,
      }
    });
    return res.status(200).json(visitor);
  } catch (error) {
    console.log(error)
    return res.status(400).json({ message: 'Something went wrong' });
  }
}