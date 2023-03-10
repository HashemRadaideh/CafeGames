import express from "express";

export const api = express.Router();

api.get("/api", async (_req, res): Promise<void> => {
  res.json({ host: process.env.HOST });
});

api.post("/api", (_req, res): void => {
  res.send("Hello, world!");
});

api.put("/api", (_req, res): void => {
  res.send("Hello, world!");
});

api.delete("/api", (_req, res): void => {
  res.send("Hello, world!");
});
