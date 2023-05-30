import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    const { query } = req;
    const { id } = query as { id: string };
    const prisma = new PrismaClient();
    const eventOrganizer = await prisma.eventOrganizer.findMany({
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
            events: {
                include: {
                    tags: true,
                    eventOrganizer: true,
                }
            },
        },
    })

    if(eventOrganizer === undefined || eventOrganizer.length == 0){
        return res.status(404).json({message: 'The page does not exist'});
    }

    if(req.method == 'GET'){
        return res.status(200).json(eventOrganizer);
    }

    if(req.method == 'PATCH'){
        try {
            const { id, companyName, email, password, events } = req.body;

            if (!id) {
                return res.status(400).json({ message: 'Please provide the visitor ID' });
            }
             
            const prisma = new PrismaClient();

            const existingEventOrganizer = await prisma.eventOrganizer.findUnique({ where: { id },include: {events: true}},);

            if (!existingEventOrganizer) {
                return res.status(404).json({ message: 'EventOrganizer not found' });
              }
        
            const updatedEventOrganizer = await prisma.eventOrganizer.update({
                where: {id},
              data: {
                companyName: companyName || existingEventOrganizer.companyName,
                email: email || existingEventOrganizer.email,
                password: password || existingEventOrganizer.password,
              },
              include: {
                events: true,
              }
            });
            return res.status(200).json(updatedEventOrganizer);
          } catch (error) {
            console.log(error)
            return res.status(400).json({ message: 'Something went wrong' });
          }
    }

    if(req.method == 'DELETE'){
        try {
            const deleteEventOrganizer = await prisma.eventOrganizer.delete({
              where: { id },
            });
      
            return res.status(200).json({ message: 'EventOrganizer deleted successfully' });
          } catch (error) {
            console.log(error);
            return res.status(500).json({ message: 'Something went wrong' });
          }
    }

    return res.status(400).json({message: 'Something went wrong'});
}