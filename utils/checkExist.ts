import { PrismaClient } from "@prisma/client";

export default async function checkExist(email: string){
    if(!email){
        return null;
    }
    
    const prisma = new PrismaClient();

    const existingUser = await prisma.visitor.findFirst({
        where: {
            email: email,
        },
    });

    const existingShopOwner = await prisma.shopOwner.findFirst({
        where: {
            email: email,
        },
    });

    const existingEventOrganizer = await prisma.eventOrganizer.findFirst({
        where: {
            email: email,
        },
    });

    if(existingUser){
        return {query: existingUser, role: "visitor"};
    }else if(existingShopOwner){
        return {query: existingShopOwner, role: "shopOwner"};
    }else if(existingEventOrganizer){
        return {query: existingEventOrganizer, role: "eventOrganizer"};
    }else{
        return null;
    }
}