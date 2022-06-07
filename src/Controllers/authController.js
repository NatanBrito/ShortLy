import db from "../db.js";

export async function teste (req,res){
    const {name,email,password,confirmPassword}= req.body;
    try{
        const ValidateEmail= await db.query(`
        SELECT * FROM  users
        WHERE email=${email}
        `);
        res.send(ValidateEmail.rows);
        }catch(e){
            res.sendStatus(400);
        }
}