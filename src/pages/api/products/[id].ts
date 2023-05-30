import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    const { query } = req;
    const { id } = query;
    const prisma = new PrismaClient();
    const product = await prisma.product.findMany({
        where: {
            OR: [
                {
                    shopId: {
                        contains: Array.isArray(id)
                        ? id[0]: id,
                    }
                }
            ]
        },
        include: {
            shop: true,
        }
    });

    if(product === undefined || product.length == 0){
        return res.status(404).json({message: 'The page does not exist'});
    }

    if(req.method == 'GET'){
        return res.status(200).json(product);
    }

    if(req.method == 'PATCH'){
        try {
            const { id, productName, description, price } = req.body;

            if (!id) {
                return res.status(400).json({ message: 'Please provide the visitor ID' });
            }
             
            const prisma = new PrismaClient();

            const existingProduct = await prisma.product.findUnique({ where: { id },include: {shop: true}},);

            if (!existingProduct) {
                return res.status(404).json({ message: 'Product not found' });
              }

            const updatedProduct = await prisma.product.update({
                where: {id},
              data: {
                productName: productName || existingProduct.productName,
                description: description || existingProduct.description,
                price: price || existingProduct.price,
              },
              include: {
                shop: true,
              }
            });
            return res.status(200).json(updatedProduct);
          } catch (error) {
            console.log(error)
            return res.status(400).json({ message: 'Something went wrong' });
          }
    }

    return res.status(400).json({message: 'Something went wrong'});
}