import { PrismaClient } from "@prisma/client";
import { ADDRCONFIG } from "dns";
import { NextApiRequest, NextApiResponse } from "next";
import checkExistName from "utils/checkExistName";
import validateInput from "utils/validateInput";

export default async function register(req: NextApiRequest, res: NextApiResponse){
    if(req.method != "POST"){
        return res.status(405).json({message: 'Method is not allowed'});
    }
    try{
        // what will the website be, will the shop owner create product when they create shop
        const { shopName, about, address, picture, tags, telephone, facebook, instagram, line
            , tiktok, shopOwnerId, eventApplications, eventParticipations, favouriteByVisitors, products } = req.body;
        const prisma = new PrismaClient;

        if(!shopName || !about || !address || !tags || !telephone || !shopOwnerId){
                return res.status(400).json({message: 'Please provide all required fields'});
        }

        const existingShop = await checkExistName(shopName);
        
        if(existingShop){
            return res.status(400).json({message: 'This event name has already taken'})
        }

        const shopTags = await validateInput(tags, 'tag');
        const validOwnerId = await validateInput(shopOwnerId, 'shopOwner');
        const shopEventApplications = await validateInput(eventApplications, 'event');
        const shopEventParticipations = await validateInput(eventParticipations, 'event');
        const shopFavouriteByVisitors = await validateInput(favouriteByVisitors, 'visitor');

        const shop = await prisma.shop.create({
            data: {
                shopName: shopName,
                about: about,
                address: address,
                picture: picture,
                tags: shopTags,
                telephone: telephone,
                facebook: facebook,
                instagram: instagram,
                line: line,
                tiktok: tiktok,
                shopOwner: validOwnerId,
                eventApplications: shopEventApplications,
                eventParticipations: shopEventParticipations,
                favouriteByVisitors: shopFavouriteByVisitors,
                // products: products,
            },
            include: {
                tags: true,
                eventApplications: true,
                eventParticipations: true,
                favouriteByVisitors: true,
                products: true,
            }
        });
        return res.status(200).json(shop);
    } catch (error) {
        return res.status(400).json({message: 'Something went wrong'});
    }
}