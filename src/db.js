import pg from 'pg';
// import dotenv from "dotenv";
// dotenv.config();
// nao funcionando 

const { Pool } = pg;

const user = "postgres";
const password = "19951995";
const host = "localhost";
const port = 5432;
const database = "dbShortly";

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

// const { Pool } = pg;

// const databaseConfig = {
//   connectionString: process.env.DATABASE_URL,
//   ssl: {
//       rejectUnauthorized: false
//   }
// }

// const db = new Pool(databaseConfig);
// export default db;