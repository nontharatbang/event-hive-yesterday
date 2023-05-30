import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    const prisma = new PrismaClient();
    const { id, firstName, lastName, email } = req.body;
    const deleteUser = await prisma.tag.deleteMany({
        where: {
            OR: {
                id: id,
                // firstName: {
                //     contains: firstName,
                // },
                // lastName: {
                //     contains: lastName, 
                // },
                // email: {
                //     contains: email,
                // }
            }

        },
    })
    
    return res.json(deleteUser)
}