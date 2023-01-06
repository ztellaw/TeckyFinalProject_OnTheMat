import { UserService } from "./user.service";
import express from "express";

import { UserController } from "./user.controller";
import { knex } from "./db";
// import Knex from "knex";

// const knexConfigs = require("./knexfile");
// const configMode = "development";
// const knexConfig = knexConfigs[configMode];
// const knex = Knex(knexConfig);

export const userRouter = express.Router();

let userService = new UserService(knex);
let userController = new UserController(userService);

userRouter.post("/user/register", userController.register);

userRouter.post("/user/login", userController.login);

userRouter.post("/user/changepassword", userController.changePassword);

userRouter.post("/user/googlelogin", userController.googleLogin);

userRouter.get("/user/comment", userController.getComment);

userRouter.post("/user/submitcomment", userController.submitComment);

userRouter.get("/user/getuserinformation", userController.getUserInformation);

userRouter.post(
  "/user/changeuserinformation",
  userController.changeUserInformation
);
