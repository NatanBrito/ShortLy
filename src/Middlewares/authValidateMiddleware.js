import joi, { object } from "joi";
import db from "../db.js";
export async  function ValidateSignUp(req,res,next){
    const {email}=req.body;
 const schema= joi.object({
   name: joi.string().required(),
   email: joi.string().email().required(),
   password: joi.string.required(),
   confirmPassword: joi.ref("password")
 });
   const {error}= schema.validate(req.body)
   if(error){
    const errorsDetails = error.details.map((object) => {
        return object.message;
      });
      return res.status(422).send(errorsDetails);
   }
   
   next();
}