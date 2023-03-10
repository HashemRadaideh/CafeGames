import express from "express";
import path from "path";
import { root } from "..";

export const chess = express.Router();

chess.get("/chess", (_req, res): void => {
  res.sendFile(path.resolve(root, "games/Chess/index.html"));
});

chess.post("/chess", (_req, res): void => {
  res.send("Hello, world!");
});

chess.put("/chess", (_req, res): void => {
  res.send("Hello, world!");
});

chess.delete("/chess", (_req, res): void => {
  res.send("Hello, world!");
});
