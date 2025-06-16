import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  name: String,
  passwordHash: String,
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog",
    },
  ],
});

userSchema.set("toJSON", {
  transform: (document, returnedObjectId) => {
    returnedObjectId.id = returnedObjectId._id.toString();
    delete returnedObjectId._id;
    delete returnedObjectId.__v;
    delete returnedObjectId.passwordHash;
  },
});

export default mongoose.model("User", userSchema);
