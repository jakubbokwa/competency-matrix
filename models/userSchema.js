import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
  name: String,
  userIndex: Number,
  disciplines: [
    {
      disciplineName: String,
      disciplineCode: String,
      disciplineId: Number,
      branches: [
        {
          branchName: String,
          branchCode: String,
          branchId: Number,
          color: { type: String, default: "#fff" },
          issues: [
            {
              issueName: String,
              issueCode: String,
              issueId: String,
              color: { type: String, default: "#fff" },
              topics: [
                {
                  topicName: String,
                  topicCode: String,
                  topicId: Number,
                  color: String,
                  skillLevel: {
                    type: Number,
                    enum: [0, 1, 2, 3],
                    default: 0,
                  },
                },
              ],
            },
          ],
          topics: [
            {
              topicName: String,
              topicCode: String,
              topicId: Number,
              color: { type: String, default: "#fff" },
              skillLevel: {
                type: Number,
                enum: [0, 1, 2, 3],
                default: 0,
              },
            },
          ],
        },
      ],
    },
  ],
});

const User = models.User || model("User", userSchema);

export default User;
