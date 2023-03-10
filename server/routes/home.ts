import express from "express";
import path from "path";
import { root } from "..";

export const home = express.Router();

home.get("/", (_req, res): void => {
  res.sendFile(path.resolve(root, "index.html"));
});

home.post("/home", (_req, res): void => {
  res.send("Hello, world!");
});

home.put("/home", (_req, res): void => {
  res.send("Hello, world!");
});

home.delete("/home", (_req, res): void => {
  res.send("Hello, world!");
});
