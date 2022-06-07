import db from "../db.js";

export async function teste (req,res){
    const xx= await db.query('Select * FROM ')
    res.send("ola mundo")
}