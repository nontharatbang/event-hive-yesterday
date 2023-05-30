import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import checkExistName from "utils/checkExistName";
import validateInput from "utils/validateInput";

export default async function register(req: NextApiRequest, res: NextApiResponse){
    if(req.method != "POST"){
        return res.status(405).json({message: 'Method is not allowed'});
    }
    try{
        // need to give defaut parameter for picture (like default pic of the event)
        const { eventName, about, location, picture, tags, startDate, endDate, telephone, facebook, instagram
            , line, tiktok, eventOrganizerId, shopApplications, shopParticipations, favouriteByVisitors } = req.body;
        const prisma = new PrismaClient;
        
        if(!eventName || !about || !location || !tags || !startDate || !endDate || !telephone || !eventOrganizerId){
            return res.status(400).json({message: 'Please provide all required fields'});
        }
        
        const existingEvent = await checkExistName(eventName);
        
        if(existingEvent){
            return res.status(400).json({message: 'This event name has already taken'})
        }

        const eventTags = await validateInput(tags, 'tag');
        const eventOrganizer = await validateInput(eventOrganizerId, 'eventOrganizer');
        // wonder if these supposed to be initialized later
        const eventShopApplications = await validateInput(shopApplications, 'shop');
        const eventShopParticipations = await validateInput(shopParticipations, 'shop');
        const eventFavouriteByVisitors = await validateInput(favouriteByVisitors, 'visitor');
        
        const event = await prisma.event.create({
            data: {
                eventName: eventName,
                about: about,
                location: location,
                picture: picture,
                tags: eventTags,
                startDate: startDate,
                endDate: endDate,
                telephone: telephone,
                facebook: facebook,
                instagram: instagram,
                line: line,
                tiktok: tiktok,
                eventOrganizer: eventOrganizer,
                shopApplications: eventShopApplications,
                shopParticipations: eventShopParticipations,
                favouriteByVisitors: eventFavouriteByVisitors,
            },
            include: {
                tags: true,
                eventOrganizer: true,
                shopApplications: true,
                shopParticipations: true,
                favouriteByVisitors: true,
            }
        });
        return res.status(200).json(event);
    } catch (error) {
        console.log(error)
        return res.status(400).json({message: 'Something went wrong'});
    }
}