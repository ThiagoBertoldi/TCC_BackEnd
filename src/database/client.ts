import { MongoClient } from 'mongodb';
import dotenv from 'dotenv'

dotenv.config();

const client = new MongoClient(process.env.DB_CONN as string).db('TCC');

export { client }
