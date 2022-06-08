import db from "../db.js";
import dotenv from "dotenv";
import {nanoid} from "nanoid";

dotenv.config();

export async function makeShortUrl (req,res){
    const {email} = res.locals.user
    const {url}= req.body;
    let shortUrl= nanoid(15);
    try{
    const searchUser= await db.query(`
    SELECT users.id FROM "users" 
    WHERE email= $1
    `,[email]);
    const idUser=searchUser.rows[0].id
    const insertUrl= await db.query(`
    INSERT INTO "shortUrls"
    ("userId",url,"shortUrl")
    VALUES ($1,$2,$3)
    `,[idUser,url,shortUrl]);
    res.status(201).send(shortUrl);
    }catch(e){
        res.sendStatus(400);
    }
}
export async function findShortUrl (req,res){
    const {id}=req.params;
    if(!id) return res.sendStatus(409);
    try{
    const findShort= await db.query(`
    SELECT "shortUrls".id, "shortUrls"."shortUrl", "shortUrls".url FROM "shortUrls"
    WHERE id= $1
    `,[id]);
    if(findShort.rowCount === 0) return res.sendStatus(404);
    res.status(200).send(findShort.rows[0]);
    }catch(e){
        res.sendStatus(400);
    }
}