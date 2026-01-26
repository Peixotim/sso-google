import { Router } from "express";
import { UsersController } from "./controllers/users.controller.js";

const userRoutes = Router();
const controller = new UsersController();

userRoutes.post("/", controller.create.bind(controller));
userRoutes.get("/", controller.findAll.bind(controller));
userRoutes.post("/:email", controller.findByMail.bind(controller));

export { userRoutes };
