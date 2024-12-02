import express from "express";
import blog from "../models/blog.js";

const blogRouter = express.Router();

blogRouter.get("/", async (request, response) => {
  const blogs = await blog.find({}).populate("user", { username: 1, name: 1 });
  response.json(blogs);
});

blogRouter.get("/:id", async (request, response) => {
  const blogFind = await blog.findById(request.params.id);
  if (blogFind) {
    response.json(blogFind);
  } else {
    response.status(404).end();
  }
});

blogRouter.post("/", async (request, response, next) => {
  try {
    const { title, author, url, likes } = request.body;
    const user = request.user;
    if(!user){
      response.status(401).send({error: 'Unauthorized'})
    }
    const newBlog = new blog({
      title: title,
      author: author,
      url: url,
      likes: likes,
      user: user.id,
    });
    const savedBlogs = await (
      await newBlog.save()
    ).populate("user", ["username", "name", "id"]);
    user.blogs = user.blogs.concat(savedBlogs._id);
    await user.save();
    response.status(201).json(savedBlogs);
  } catch (err) {
    next(err);
  }
});

blogRouter.put("/:id", async (request, response, next) => {
  try {
    const blogFind = await blog.findById(request.params.id);
    const user = request.user;
    const { title, author, url, likes } = request.body;

    if (blogFind.user.toString() !== user._id.toString()) {
      return response
        .status(401)
        .json({ error: "Only the creator can update blogs" });
    }

    const updatedBlog = await blog.findByIdAndUpdate(
      blogFind._id,
      { title, author, url, likes },
      { new: true }
    );
    response.status(200).json(updatedBlog)
  } catch (err) {
    next(err);
  }
});

blogRouter.delete("/:id", async (request, response, next) => {
  const blogFind = await blog.findById(request.params.id);
  const user = request.user;

  if (blogFind.user.toString() !== user.id.toString()) {
    return response
      .status(401)
      .json({ error: "Only the creator can delete blogs" });
  }
  user.blogs = user.blogs.filter(
    (e) => e.toString() === blogFind.id.toString()
  );
  await blogFind.deleteOne();
  try {
    response.status(204).end();
  } catch (err) {
    next(err);
  }
});

export default blogRouter;
