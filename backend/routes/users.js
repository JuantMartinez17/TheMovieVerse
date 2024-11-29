import { Router } from "express";
import { UsersController } from "../controllers/user.js";
export const usersRouter = Router();

usersRouter.get("/", UsersController.getAll);
usersRouter.get("/:id", UsersController.getById);
usersRouter.post("/", UsersController.create);
usersRouter.patch("/:id", UsersController.update);
usersRouter.delete("/:id", UsersController.delete);
usersRouter.post("/login", UsersController.login);
