import "dotenv/config";
import { MongoClient } from "mongodb";

let db = {
  USER: process.env.DB_USER,
  PWD: process.env.DB_PWD,
  DB_NAME: process.env.DB_NAME,
};

const URI = `mongodb+srv://${db.USER}:${db.PWD}@practica.4b4nkjj.mongodb.net/${db.DB_NAME}`;
export async function connDB() {
  const client = new MongoClient(URI);
  try {
    await client.connect();
    const db = client.db();
    console.log("CONNECTED SUCCESS");
    return db;
  } catch (error) {
    console.log("CONNECTION REFUSED", error.message);
  }
}
