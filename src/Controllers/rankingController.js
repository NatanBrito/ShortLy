import db from "../db.js";

export async function ranking (req,res){
    try{
    const rankingUsers= await db.query(`
        SELECT users.id, users.name, COUNT(su.url) as "linksCount",
        COALESCE(SUM(su."visitCount"),0) as "visitCount" FROM "users"
        LEFT JOIN "shortUrls" su
        ON su."userId"=users.id
        GROUP BY users.id
        ORDER BY "visitCount" DESC
        LIMIT 10;
    `)
    if(rankingUsers.rowCount === 0) return res.sendStatus(404);
    res.status(200).send(rankingUsers.rows);
    }catch(e){
        res.sendStatus(500);
    }
}
