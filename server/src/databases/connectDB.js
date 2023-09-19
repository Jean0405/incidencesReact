import "dotenv/config";
import { MongoClient } from "mongodb";

let db = {
  USER: process.env.USER,
  PWD: process.env.DB_PWD
}

const URI = `mongodb+srv://${db.USER}:${db.PWD}@practica.4b4nkjj.mongodb.net/?retryWrites=true&w=majority`;
export async function connDB(){
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