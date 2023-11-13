import express from "express";
import { newTask, deleteTask, getMyTask, updateTask } from "../controllers/task.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router()

router.post("/new" , isAuthenticated , newTask )

router.get("/me" , isAuthenticated , getMyTask) 

router.route("/:id").put(isAuthenticated , updateTask).delete(isAuthenticated , deleteTask) 

export default router
