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

export async function openUrl (req,res){
    const {shortUrl}=req.params;
    if(!shortUrl) return res.sendStatus(400);
    try{
    const findShort= await db.query(`
    SELECT * FROM "shortUrls"
    WHERE "shortUrl"= $1
    `,[shortUrl]);
    if(findShort.rowCount === 0) return res.sendStatus(404);
    let contador= findShort.rows[0].visitCount;
    contador++ 
    const updateCount= await db.query(`
    UPDATE "shortUrls"
    SET "visitCount"=$1
    WHERE "shortUrl"=$2 
    `,[contador,shortUrl])
    res.redirect(200,findShort.rows[0].url);
    } catch(e){
        res.sendStatus(400);
    }
}
export async function deleteUrl (req,res){
    const {email} = res.locals.user
    const ParamId=req.params.id;
    if(!ParamId) return res.sendStatus(400);
    try{
    const findUser= await db.query(`
    SELECT  users.id as "mainId", short.id, short."userId" FROM "users"
    JOIN "shortUrls" su ON su."userId"=users.id
    JOIN "shortUrls" short ON short.id= $1
    WHERE email= $2
    LIMIT 1;
    `,[ParamId,email]);
    if(findUser.rowCount === 0) return res.sendStatus(404);
    if(findUser.rows[0].mainId !== findUser.rows[0].userId) return res.sendStatus(401);
    const deleteUrl= db.query(`
    DELETE FROM "shortUrls"
    WHERE id=$1
    `,[ParamId])
    
    res.sendStatus(204);
    } catch(e){
        res.sendStatus(400);
    }
}

export async function findShortsUsers (req,res){
    const idUser=req.params.id;
    const ParamId= parseInt(idUser)
    if(!ParamId || typeof(ParamId) !== "number") return res.sendStatus(401);
    try{
    const  userData= await db.query(`
    SELECT users.id,users.name, sum(su."visitCount") AS "visitCount" FROM "users"
    JOIN "shortUrls" su ON su."userId"=users.id
    WHERE users.id= $1
    GROUP BY users.id;
    `,[ParamId]);
    if(userData.rowCount === 0) return res.sendStatus(404);
    const userShorts= await db.query(`
    SELECT "shortUrls".id, "shortUrls"."shortUrl",
    "shortUrls".url, "shortUrls"."visitCount"
    FROM "shortUrls"
    WHERE "userId"=$1;
    `,[ParamId]);

    let userInfo =  userData.rows[0] ;
    res.status(200).send({...userInfo,"shortenedUrls":userShorts.rows});
    }catch(e){
        res.sendStatus(500);
    }
}