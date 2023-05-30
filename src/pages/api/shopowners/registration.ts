import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import checkExist from "utils/checkExist";

export default async function register(req: NextApiRequest, res: NextApiResponse){
    if(req.method != "POST"){
        return res.status(405).json({message: 'Method is not allowed'});
    }
    try{
        const { firstName, lastName, email, password } = req.body;
        const prisma = new PrismaClient;
    
        const existingEmail = await checkExist(email);

        if(existingEmail){
          return res.status(400).json({message: 'The email has already been taken. Please try another email.'})
        }
        
        const shopOwner = await prisma.shopOwner.create({
            data: {
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password,
            },
            include: {
                shop: true,
            }
        });
        return res.status(200).json(shopOwner);
    } catch (error) {
        return res.status(400).json({message: 'Something went wrong'});
    }
}