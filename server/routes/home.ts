import express from "express";
import path from "path";
import { root } from "..";

export const home = express.Router();

home
  .route("/")
  .get((req, res): void => {
    res.sendFile(path.resolve(root, "index.html"));
  })
  .post((req, res): void => {})
  .put((req, res): void => {})
  .delete((req, res): void => {});
