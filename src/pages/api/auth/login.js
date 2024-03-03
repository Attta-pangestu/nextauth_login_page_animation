import { signInUser } from "@/lib/firebase/service";

export default async function handler(req, res) {
    if (req.method !== "POST")
        return res.status(405).json({ success: false, error: "Method not allowed" });
    if(!req.body) return res.status(404).json({ success: false, error: "Don't have data"});
    
    const userData = req.body;
    console.log(userData)
    
    await signInUser(userData, (results) => {
        console.log(results.success, results.message)
        if(!results.success) return res.status(400).json({ success : results.success, message : results.message });
        return res.status(200).json({ success : results.success, message : results.message });
    });
}
