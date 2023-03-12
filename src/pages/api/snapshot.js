import connectMongo from "utils/connectMongo";
import User from "models/userSchema";

export default async function addSnapshot(req, res) {
  if (req.method === "PATCH") {
    console.log("CONNECTING TO MONGO");
    await connectMongo();
    console.log("CONNECTED TO MONGO");
    try {
      const body = await req.body;
      console.log("body is: ", body);

      const user = await User.findOneAndUpdate(
        {
          userIndex: body.userIndex,
        },
        {
          skillSnapshots: body.newSkillSnapshots,
        }
      );
    } catch (error) {
      console.log(error);
      return res.status(400).json({ error });
    }
    res.status(200).json({ message: "CORRECT PATCH REQUEST" });
    return;
  }
  res.status(200).send("I am working");
  return;
}
