import express from "express";

export const api = express.Router();

api
  .route("/api")
  .get(async (req, res): Promise<void> => {
    res.json({ host: process.env.HOST });
  })
  .post((req, res): void => { })
  .put((req, res): void => { })
  .delete((req, res): void => { });
