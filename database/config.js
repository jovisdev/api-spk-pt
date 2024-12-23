import mysql from "mysql2/promise";
import "dotenv/config"

const db = mysql.createPool ({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
})

async function query(command, values) {
    try {
        const [results] = await db.query(command, values ?? [])
        return results;
    } catch (error) {
        throw error;
    }
}

export default db;
export { query };