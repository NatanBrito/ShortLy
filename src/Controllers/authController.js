import db from "../db.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();

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
export async function signIn (req,res){
    const {email, password}=req.body;
   try{
    const verifyUser= await db.query(`
    SELECT users.password,users.name FROM users
    WHERE email = '${email}'
    `)
    const {name}=verifyUser.rows[0]
    if(!bcrypt.compareSync(password, verifyUser.rows[0].password)){
      res.status(401).send("email ou senha incorretos...");
        return;
    }
    const dados= {name}
    const configuracoes = { expiresIn: 60*60*24} 
    const token= jwt.sign(dados,process.env.ENCRYPTPASSWORD, configuracoes);
    res.status(200).send(token);
    }catch(e){
        res.sendStatus(400);
    }
}