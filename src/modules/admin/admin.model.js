const { Schema, model } = require("mongoose");

const adminSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: false, lowercase: true, trim: true, default: null },
    permissions: {
      type: [
        {
          type: String,
          enum: [
            "get-posts",
            "create-post",
            "update-post",
            "delete-post",
            "get_users",
            "create_user",
            "delete_user",
          ],
        },
      ],
      default: [],
    },
    accessToken: { type: String }
  },
  { timestamps: true });

const adminModel = model("Admin", adminSchema);

module.exports = adminModel;
