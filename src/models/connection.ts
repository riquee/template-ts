import * as mysql from "mysql2/promise";
import "dotenv/config";

interface Connect {
  query: (sql: string) => any;
  execute: (sql: string) => any;
}

const connect = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

export default connect as Connect;
