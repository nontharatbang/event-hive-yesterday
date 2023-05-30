import { PrismaClient } from "@prisma/client";

export default async function checkExistName(name: string){
    if(!name){
        return null;
    }
    
    const prisma = new PrismaClient();
    
    const existingShop = await prisma.shop.findFirst({
        where: {
            shopName: name,
        }
    })
    const existingEvent = await prisma.event.findFirst({
        where: {
            eventName: name,
        },
    });


    if(existingShop || existingEvent){
        return {query: existingEvent};
    }else{
        return null;
    }
}