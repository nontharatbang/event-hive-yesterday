import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import validateInput from "utils/validateInput";

export default async function register(req: NextApiRequest, res: NextApiResponse){
    if(req.method != "POST"){
        return res.status(405).json({message: 'Method is not allowed'});
    }
    try{
        const { productName, description, price, shop } = req.body;
        const prisma = new PrismaClient;

        if(!productName || !price || !shop){
                return res.status(400).json({message: 'Please provide all required fields'});
        }

        const productShop = await validateInput(shop, 'shop');

        const product = await prisma.product.create({
            data: {
                productName: productName,
                description: description,
                price: price,
                shop: productShop,
            },
        });
        return res.status(200).json(product);
    } catch (error) {
        return res.status(400).json({message: 'Something went wrong'});
    }
}