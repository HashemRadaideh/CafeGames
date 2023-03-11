import express from "express";
import path from "path";
import { root } from "..";

export const chess = express.Router();

chess
  .route("/chess")
  .get((req, res): void => {
    res.sendFile(path.resolve(root, "games/Chess/index.html"));
  })
  .post((req, res): void => { })
  .put((req, res): void => { })
  .delete((req, res): void => { });
