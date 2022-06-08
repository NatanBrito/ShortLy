import joi from "joi";
import db from "../db.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();
export async function validateToken (req,res,next){
    const { authorization } = req.headers;
    const token = authorization.replace("Bearer", "").trim();
    try{
        const validateToken= jwt.verify(token, process.env.ENCRYPTPASSWORD);
        
    }catch(e){
        res.sendStatus(400);
    }
    next();
}
export async function validateBodyShortUrl (req,res,next){
     const schema = joi.object({
         url: joi.string().required()
     });
     const {error}= schema.validate(req.body);
     if(error){
        const errorsDetails = error.details.map((object) => {
            return object.message;
          });
          return res.status(422).send(errorsDetails);
       }
    next();
}