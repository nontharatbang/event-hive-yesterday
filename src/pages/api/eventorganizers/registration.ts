import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import checkExist from "utils/checkExist";
import validateInput from "utils/validateInput";

export default async function register(req: NextApiRequest, res: NextApiResponse){
    if(req.method != "POST"){
        return res.status(405).json({message: 'Method is not allowed'});
    }
    try{
        // assume that the events are not created yet
        const { companyName, email, password, events } = req.body;
        const prisma = new PrismaClient;
        
        if(!companyName || !email || !password){
            return res.status(400).json({message: 'Please provide all required fields'});
        }
        
        const existingEmail = await checkExist(email);

        if(existingEmail){
          return res.status(400).json({message: 'The email has already been taken. Please try another email.'})
        }
        
        // const eventOrgEvents = await validateInput(events, 'eventOrganizer');
        const eventOrganizer = await prisma.eventOrganizer.create({
            data: {
                companyName: companyName,
                email: email,
                password: password,
                // events: eventOrgEvents,
            }
        });
        return res.status(200).json(eventOrganizer);
    } catch (error) {
        return res.status(400).json({message: 'Something went wrong'});
    }
}