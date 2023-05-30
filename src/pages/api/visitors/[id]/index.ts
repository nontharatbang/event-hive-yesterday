import { PrismaClient } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from "next";
import validateInput from 'utils/validateInput';

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    const { query } = req;
    const { id } = query;
    const prisma = new PrismaClient();
    const visitor = await prisma.visitor.findMany({
        where: {
            OR: [
                {
                    id: {
                        contains: Array.isArray(id)
                        ? id[0]: id,

                    },
                },
            ],
        },
        include: {
            tags: true,
            favouriteShops: true,
            favouriteEvents: true,
        }
    },
    );

    if(visitor === undefined || visitor.length == 0){
        return res.status(404).json({message: 'The page does not exist'});
    }
    
    if(req.method == 'GET'){
        return res.status(200).json(visitor);
    }

    if(req.method == 'PATCH'){
        try {
            const { id, firstName, lastName, image, tags, favouriteShops, favouriteEvents} = req.body;

            if (!id) {
                return res.status(400).json({ message: 'Please provide the visitor ID' });
            }
             
            const prisma = new PrismaClient();

            const existingVisitor = await prisma.visitor.findUnique({ where: { id },include: {tags: true, favouriteShops: true, favouriteEvents: true}},);

            if (!existingVisitor) {
                return res.status(404).json({ message: 'Visitor not found' });
              }

            const visitorTags = await validateInput(tags, 'tag');
        
            const updatedVisitor = await prisma.visitor.update({
                where: {id},
              data: {
                firstName: firstName || existingVisitor.firstName,
                lastName: lastName || existingVisitor.firstName,
                image: image || existingVisitor.image,
                tags: visitorTags || existingVisitor.tags,
                favouriteShops: favouriteShops || existingVisitor.favouriteShops,
                favouriteEvents: favouriteEvents || existingVisitor.favouriteEvents,
              },
              include: {
                tags: true,
                favouriteShops: true,
                favouriteEvents: true,
              }
            });
            return res.status(200).json(updatedVisitor);
          } catch (error) {
            console.log(error)
            return res.status(400).json({ message: 'Something went wrong' });
          }
    }

    return res.status(400).json({message: 'Something went wrong'});
}