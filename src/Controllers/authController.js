import db from "../db.js";
import bcrypt from "bcrypt";
export async function signUP (req,res){
    const {name,email,password,confirmPassword}= req.body;
    const hashPassword= bcrypt.hashSync(password,10);
    try{
        const insertUser= await db.query(`
        INSERT INTO users (name,email,password) 
        VALUES ($1,$2,$3)
        `,[name,email,hashPassword])

        res.sendStatus(201)
    }catch(e){
        res.sendStatus(500)
    }
        
}