import { PrismaClient } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from "next";
import validateInput from 'utils/validateInput';

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    const { query } = req;
    const { id } = query;
    const prisma = new PrismaClient();
    const shop = await prisma.shop.findMany({
        where: {
            OR: [
                {
                    id: {
                        contains: Array.isArray(id)
                        ? id[0]: id,

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
    },
    );

    if(shop === undefined || shop.length == 0){
        return res.status(404).json({message: 'The page does not exist'});
    }

    if(req.method == 'GET'){
        return res.status(200).json(shop);
    }

    if(req.method == 'PATCH'){
        try {
            const { shopName, about, address, picture, tags, telephone, facebook, instagram, line
                , tiktok, eventApplications, eventParticipations, favouriteByUsers, products} = req.body;

            const id = shop[0].id
            const shopTags = await validateInput(tags, 'tag');
            const shopEventApplications = await validateInput(eventApplications, 'event');
            const shopEventParticipations = await validateInput(eventParticipations, 'event');
            const shopFavouriteByVisitors = await validateInput(favouriteByUsers, 'user');
        
            const updatedShop = await prisma.shop.update({
                where: {id},
              data: {
                shopName: shopName || shop[0].shopName,
                about: about || shop[0].about,
                address: address || shop[0].address,
                picture: picture || shop[0].picture,
                tags: shopTags || shop[0].tags,
                telephone: telephone || shop[0].telephone,
                facebook: facebook || shop[0].facebook,
                instagram: instagram || shop[0].instagram,
                line: line || shop[0].line,
                tiktok: tiktok || shop[0].tiktok,
                eventApplications: shopEventApplications || shop[0].eventApplications,
                eventParticipations: shopEventParticipations || shop[0].eventParticipations,
                favouriteByVisitors: shopFavouriteByVisitors || shop[0].favouriteByVisitors,
              },
              include: {
                tags: true,
                eventApplications: true,
                eventParticipations: true,
                favouriteByVisitors: true,
                products: true,
              }
            });
            return res.status(200).json(updatedShop);
          } catch (error) {
            console.log(error)
            return res.status(400).json({ message: 'Something went wrong' });
          }
    }

    return res.status(400).json({message: 'Something went wrong'});
}