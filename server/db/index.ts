import { MongoClient, ServerApiVersion } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const password = encodeURIComponent(process.env.MONGO_PASSWORD as string);
const uri = `mongodb+srv://yon980824:${password}@jb.uam9gbp.mongodb.net/?retryWrites=true&w=majority`;
export let db: any = {};

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export default async function mongoDB() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db('blog').command({ ping: 1 });

    db = client.db('blog');

    console.log('You successfully connected to MongoDB!');
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
// mongoDB ().catch(console.dir);
