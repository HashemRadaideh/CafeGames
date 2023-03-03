import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";

// Take a port 3000 for running server.
const PORT: number = 3000;

// Initialize the express engine
const App: express.Application = express();

App.use(cors);

const server = http.createServer(App);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  let team: string = Math.floor(Math.random() * 2) ? "White" : "Black";
  let Pieces: any[] = [];

  socket.on("looking_for_game", (data) => {
    socket.join(data);
    socket.emit("create_player", { team: team, pieces: Pieces });
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
});

server.listen(PORT, () => {
  console.log("Server is running...");
});
