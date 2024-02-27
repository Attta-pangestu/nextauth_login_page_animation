import { MongoClient } from "mongodb";
export default async function handler(req, res) {
  if (req.method !== "GET")
    return res.status(405).json({ error: "Method not allowed" });

  const client = new MongoClient(process.env.MONGO_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
  try {
    await client.connect();
    const db = await client.db("nextauthapp");
    const collection = db.collection("users");
    await collection.insertOne({ name: "John" });
    res.json({ message: "Data saved successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
