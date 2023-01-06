import { userRouter } from "./user";
import dotenv from "dotenv";
dotenv.config();
import path from "path";
import express from "express";
import { print } from "listening-on";
import cors from "cors";

export const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// console.log(defaultApp);

let app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(userRouter);
app.use((req, res) => {
  res.status(404);
  res.sendFile(path.resolve("public", "404.html"));
});

let port = 8080;
app.listen(port, () => {
  print(port);
});
