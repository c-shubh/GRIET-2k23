// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { MongoClient } from "mongodb";

export default async (req, res) => {
  const client = new MongoClient("mongodb+srv://vikasrushi:MvRccS4SwCORzDj0@cluster0.uhsqdu9.mongodb.net/?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  try {
    await client.connect();
    const db = client.db("test");
    const collection = db.collection("attendancelogs");
    const result = await collection.find({}).toArray();
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error connecting to the database" });
  } finally {
    client.close();
  }
};

