import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import validateInput from "utils/validateInput";

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    const { query } = req;
    const { id } = query;
    const prisma = new PrismaClient();
    const event = await prisma.event.findMany({
        where: {
            OR: [
                {
                    id: {
                        contains: Array.isArray(id)
                        ? id[0]: id,
                    }
                }
            ]
        },
        include: {
            tags: true,
            eventOrganizer: true,
            shopApplications: true,
            shopParticipations: true,
            favouriteByVisitors: true,
        },
    })

    if(event === undefined || event.length == 0){
        return res.status(404).json({message: 'The page does not exist'});
    }
    
    if(req.method == 'GET'){
        return res.status(200).json(event);
    }

    if(req.method == 'PATCH'){
        try {
            const { eventName, about, location, picture, tags, startDate, endDate, telephone, facebook, instagram
                , line, tiktok, shopApplications, shopParticipations, favouriteByUsers} = req.body;

            const id = event[0].id
            const eventTags = await validateInput(tags, 'tag');
            const eventShopApplications = await validateInput(shopApplications, 'shop');
            const eventShopParticipations = await validateInput(shopParticipations, 'shop');
            const eventFavouriteByVisitors = await validateInput(favouriteByUsers, 'user');
        
            const updatedEvent = await prisma.event.update({
                where: {id},
              data: {
                eventName: eventName || event[0].eventName,
                about: about || event[0].about,
                location: location || event[0].location,
                picture: picture || event[0].picture,
                tags: eventTags || event[0].tags,
                startDate: startDate || event[0].startDate,
                endDate: endDate || event[0].endDate,
                telephone: telephone || event[0].telephone,
                facebook: facebook || event[0].facebook,
                instagram: instagram || event[0].instagram,
                line: line || event[0].line,
                tiktok: tiktok || event[0].tiktok,
                shopApplications: eventShopApplications || event[0].shopApplications,
                shopParticipations: eventShopParticipations || event[0].shopParticipations,
                favouriteByVisitors: eventFavouriteByVisitors || event[0].favouriteByVisitors,
              },
              include: {
                tags: true,
                eventOrganizer: true,
                shopApplications: true,
                shopParticipations: true,
                favouriteByVisitors: true,
              }
            });
            return res.status(200).json(updatedEvent);
          } catch (error) {
            console.log(error)
            return res.status(400).json({ message: 'Something went wrong' });
          }
    }

    return res.status(400).json({message: 'Something went wrong'});
}