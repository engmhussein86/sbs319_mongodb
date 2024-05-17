import {MongoClient} from "mongodb";
import dotenv from "dotenv";
dotenv.config(); 
const client = new MongoClient(process.env.ATLAS_URI);

let conn;

try{
conn = await client.connect();
console.log('connected');
}
catch(err){
    console.log(err);
}

const db = conn.db('sba319');

export default db;