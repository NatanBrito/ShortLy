import pg from 'pg';
import dotenv from "dotenv";
dotenv.config();


const { Pool } = pg;

const user = process.env.USER;
const password = process.env.PASSWORD;
const host = process.env.HOST;
const port = 5432;
const database = process.env.DATABASE;

{
    rejectUnauthorized: false
}
const db = new Pool({
  user,
  password,
  host,
  port,
  database
});
export default db;