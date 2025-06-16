import express from "express";
import {
  getAll,
  getOne,
  create,
  update,
  deleteOne,
} from "../controllers/blogs.js";

const router = express.Router();

router.get("/", getAll);

router.get("/:id", getOne);

router.post("/", create);

router.put("/:id", update);

router.delete("/:id", deleteOne);

export default router;
