import dotenv from "dotenv";

dotenv.config();

import express from "express";
import http from "http";
import { Server } from "socket.io";
import { v4 as uuidv4 } from "uuid";
import cors from "cors";
import path from "path";

const app: express.Application = express();

app.use(
  cors({
    origin: `http://${process.env.HOST}:5173`,
    methods: ["GET", "POST"],
  })
);

export const root = path.join(__dirname, "views");
app.use(express.static(root));

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: `http://${process.env.HOST}:5173`,
    methods: ["GET", "POST"],
  },
});

import * as route from "./routes";

app.use(route.api);
app.use(route.home);
app.use(route.chess);

interface AvailableRoom {
  users: string[];
}

const availableRooms: Record<string, AvailableRoom> = {};

let team: string = Math.floor(Math.random() * 2) ? "White" : "Black";
let Pieces: any[] = [];

io.on("connection", (socket) => {
  socket.on("looking_for_game", (userId: string) => {
    let roomId: string;
    const rooms = Object.keys(availableRooms);
    if (rooms.length === 0) {
      // Create a new room if no rooms are available
      roomId = uuidv4();
      availableRooms[roomId] = { users: [userId] };
    } else {
      // Join the first available room
      roomId = rooms[0];
      availableRooms[roomId].users.push(userId);
    }
    socket.join(roomId);
    socket.emit("create_player", { team: team, pieces: Pieces });
    // socket.to(roomId).broadcast.emit("userConnected", userId);
  });

  socket.on("player_created", (data) => {
    team = data === "White" ? "Black" : "White";
  });

  socket.on("players_turn", (data) => {
    socket.to(data.room).emit(
      "opponents_turn",
      data.pieces.reduce((pieces: any, piece: any) => {
        Pieces = pieces;
        piece.col = Math.abs(piece.col - 7);
        piece.row = Math.abs(piece.row - 7);
        if (piece.col < 8 && piece.col > -1) pieces.push(piece);
        return pieces;
      }, [])
    );
  });

  socket.on("disconnect", () => {
    // Remove user from available rooms
    for (const roomId in availableRooms) {
      const index = availableRooms[roomId].users.indexOf(socket.id);
      if (index !== -1) {
        availableRooms[roomId].users.splice(index, 1);
        // socket.to(roomId).broadcast.emit("userDisconnected", socket.id);
        if (availableRooms[roomId].users.length === 0) {
          delete availableRooms[roomId];
        }
        break;
      }
    }
  });
});

server.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
