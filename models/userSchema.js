import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
  name: String,
  userIndex: Number,
  disciplines: [
    {
      disciplineName: String,
      disciplineCode: String,
      disciplineId: String,
      branches: [
        {
          branchName: String,
          branchCode: String,
          branchId: String,
          color: { type: String, default: "#fff" },
          levels: [
            {
              levelCode: String,
              topics: [
                {
                  topicName: String,
                  topicCode: String,
                  topicId: String,
                  topicDescription: String,
                  color: { type: String, default: "#fff" },
                  skillLevel: {
                    type: Number,
                    default: 0,
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  ],
});

const User = models.User || model("User", userSchema);

export default User;
