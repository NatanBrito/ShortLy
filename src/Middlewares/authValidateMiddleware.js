import joi from "joi";
import db from "../db.js";
export async  function ValidateSignUp(req,res,next){
    const {email}=req.body;
 const schema= joi.object({
   name: joi.string().required(),
   email: joi.string().email().required(),
   password: joi.string().required(),
   confirmPassword: joi.ref("password")
 });
   const {error}= schema.validate(req.body)
   if(error){
    const errorsDetails = error.details.map((object) => {
        return object.message;
      });
      return res.status(422).send(errorsDetails);
   }
   try{
    const ValidateEmail= await db.query(`
    SELECT * FROM  users
    WHERE email='${email}'
    `);
    if(ValidateEmail.rowCount>0){
        res.status(422).send("e-mail ja cadastrado,tente outro...")
        return;
    }
    }catch(e){
        res.sendStatus(400);
    }
   next();
}
export async  function ValidateSignIn(req,res,next){
  const {email}=req.body;
const schema= joi.object({
 email: joi.string().email().required(),
 password: joi.string().required()
});
const {error}= schema.validate(req.body)
if(error){
 const errorsDetails = error.details.map((object) => {
     return object.message;
   });
   return res.status(422).send(errorsDetails);
}
try{
  const ValidateEmail= await db.query(`
  SELECT * FROM  users
  WHERE email='${email}'
  `);
  if(ValidateEmail.rowCount ===0){
      res.status(401).send(" essa conta nao existe")
      return;
  }
  }catch(e){
      res.sendStatus(400);
  }
next();
}