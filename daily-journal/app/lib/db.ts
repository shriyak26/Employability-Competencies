import mysql from "mysql2/promise";
 // Connection returns a promise 
        // (placeholder for the value that will eventually be returned)
const connection = await mysql.createPool({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB,
        });

export default connection;
