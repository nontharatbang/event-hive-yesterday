import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import checkExist from "utils/checkExist";

export default async function logInHandler(req: NextApiRequest, res: NextApiResponse){
    if(req.method != "POST"){
        console.log("in not POST")
        res.status(405).json({message: 'Method is not allowed'})
        return null;
    }
    try{
        const { email, password } = req.body;
        if(!email || !password){
            console.log("in provide all fields")
            return res.status(400).json({message: 'Please provide all required fields'});
        }

        const existingEmail = await checkExist(email)
        
        if(!existingEmail || !existingEmail.query ){
            console.log("in email does not exist")
            res.status(400).json({message: 'The email does not exist'})
            return null
        }
        if(password !== existingEmail.query.password){
            console.log("in password is not correct")
            res.status(400).json({message: 'The password is not correct'})
            return null
        }
        // trying to output both existingEmail and the message together
        // testing so that might return both existingEmail and the role
        console.log("should sent the existing email")
        res.status(200).json({existingEmail: existingEmail.query, role: existingEmail.role, message: 'The email and the password are matched'})
        return existingEmail
    }catch(error){
        return res.status(400).json({message: 'Something went wrong'})
    }
}