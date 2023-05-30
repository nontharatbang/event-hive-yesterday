import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    const { query } = req;
    const { id } = query;
    const prisma = new PrismaClient();
    const shopOwner = await prisma.shopOwner.findMany({
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
            shop: {
                include: {
                    tags: true,
                    shopOwner: true,
                    products: true,
                    eventApplications: true,
                    eventParticipations: true,
                }
            },
        }
    },
    );

    if(shopOwner === undefined || shopOwner.length == 0){
        return res.status(404).json({message: 'The page does not exist'});
    }
    
    if(req.method == 'GET'){
        return res.status(200).json(shopOwner);
    }

    if(req.method == 'PATCH'){
        try {
            const { id, firstName, lastName } = req.body;

            if (!id) {
                return res.status(400).json({ message: 'Please provide the visitor ID' });
            }
             
            const prisma = new PrismaClient();

            const existingShopOwner = await prisma.shopOwner.findUnique({ where: { id },include: {shop: true,}},);

            if (!existingShopOwner) {
                return res.status(404).json({ message: 'ShopOwner not found' });
              }
        
            const updatedShopOwner = await prisma.shopOwner.update({
                where: {id},
              data: {
                firstName: firstName || existingShopOwner.firstName,
                lastName: lastName || existingShopOwner.lastName,
              },
              include: {
                shop: true,
              },
            });
            return res.status(200).json(updatedShopOwner);
          } catch (error) {
            console.log(error)
            return res.status(400).json({ message: 'Something went wrong' });
          }
    }

    return res.status(400).json({message: 'Something went wrong'});
}