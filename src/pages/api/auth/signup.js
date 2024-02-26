import connectMongo from "../../../../database/conn";
import Users from "../../../../model/Schema";

export default async function handler(req, res) {
  // connectMongo.catch((err) => res.json({ error: "Conection Error...!" }));
  await connectMongo();
  // only post method is accepted
  if (req.method !== "POST")
    return res.status(405).json({ error: "Method Not Allowed" });

  if (!req.body) return res.status(404).json({ error: "Don't have data" });

  const { name, email, password } = req.body;
  console.log({ name, email, password });

  res.json({ message: "Signup Post Request" });
}
