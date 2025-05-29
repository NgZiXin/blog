import { Pool } from "pg";
console.log("Starting app...");
console.log("Creating DB pool...");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});
console.log("DB pool created");

export default pool;