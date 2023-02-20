import connectMongo from "utils/connectMongo";
import User from "models/userSchema";
import seed from "utils/seed";

export default async function addUser(req, res) {
  if (req.method === "POST") {
    try {
      const userOne = seed[0];
      const userTwo = seed[1];
      const userThree = seed[2];
      console.log("CONNECTING TO MONGO");
      await connectMongo();
      console.log("CONNECTED TO MONGO");
      console.log("CREATING THE DOCUMENT");
      const user = await User.create(userTwo);
      console.log("THE DOCUMENT CREATED");
      res.status(200).json({ user });
      return;
    } catch (error) {
      console.log(error);
      res.status(400).json({ error });
    }
  }
  if (req.method === "PATCH") {
    console.log("CONNECTING TO MONGO");
    await connectMongo();
    console.log("CONNECTED TO MONGO");
    try {
      const body = await req.body;
      const determineTaskToSet = (object) => {
        if (!("issue" in object)) {
          return {
            $set: {
              "disciplines.$[discipline].branches.$[branch].topics.$[topic].skillLevel":
                body.level,
            },
          };
        }
        return {
          $set: {
            "disciplines.$[discipline].branches.$[branch].issues.$[issue].topics.$[topic].skillLevel":
              body.level,
          },
        };
      };
      const taskObjectToSet = determineTaskToSet(body);

      const user = await User.findOneAndUpdate(
        {
          userIndex: body.userIndex,
        },
        taskObjectToSet,
        {
          arrayFilters: [
            { "discipline.disciplineCode": body.discipline },
            {
              "branch.branchCode": body.branch,
            },
            {
              "issue.issueCode": body.issue,
            },
            {
              "topic.topicCode": body.topic,
            },
          ],
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
