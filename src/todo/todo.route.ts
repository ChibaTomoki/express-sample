import express from "express";
import { getTodos } from "./todo.controller";

const router = express.Router();

router.get("/", getTodos);

export default router;
