import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import blogRouter from "./routers/blogRouter.js";
import userRouter from "./routers/userRouter.js";
import loginRouter from "./routers/loginRouter.js";
import {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor,
} from "./utils/middleware.js";
import User from "./models/user.js";
import Blog from "./models/blog.js";
import bcrypt from "bcryptjs";
import { initialBlogs } from "./utils/initial.js";
import { initialUsers } from "./utils/initial.js";
import { MONGODB_URI } from "../config/common.js";

const app = express();
mongoose.set("strictQuery", false);
console.log("Connecting to", MONGODB_URI);
mongoose.connect(MONGODB_URI);

app.use(cors());
app.use(express.json());
app.use(tokenExtractor);
app.use(requestLogger);
app.use("/api/blogs", userExtractor, blogRouter);
app.use("/api/users", userRouter);
app.use("/api/login", loginRouter);
app.use(errorHandler);
app.use(unknownEndpoint);

(async () => {
  try {
    await Blog.deleteMany({});
    await User.deleteMany({});

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(initialUsers.password, saltRounds);
    const user = new User({
      username: initialUsers.username,
      name: initialUsers.name,
      passwordHash,
    });

    const savedUser = await user.save();
    const blogsObjects = initialBlogs.map(
      (blog) => new Blog({ ...blog, user: savedUser.id })
    );
    const blogsSaved = blogsObjects.map((e) => e.save());
    await Promise.all(blogsSaved);
    console.log("Connected to MongoDB and initial data loaded");
  } catch (error) {
    console.log("Error connecting to MongoDB:", error.message);
  }
})();

export default app;