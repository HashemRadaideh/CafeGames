import "./styles/App.scss";
import { useEffect, useState } from "react";
import Board from "./Board";
import { PieceProps, Team } from "./logic/constants";
import io from "socket.io-client";

let host = "localhost";
export const socket = io(`http://${host}:5000`);

export default function Chessboard(): JSX.Element {
  const [Team, setTeam] = useState<Team>("None");
  const [Pieces, setPieces] = useState<PieceProps[]>([]);

  useEffect(() => {
    fetch("/api")
      .then((response) => response.json())
      .then((data) => (host = data.host))
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    socket.emit("looking_for_game", 10);

    socket.on("create_player", (data) => {
      setTeam(data.team);
      setPieces(data.pieces);
      socket.emit("player_created", Team);
    });
  }, []);

  return (
    <>
      <div id="chess">
        <Board team={Team} pieces={Pieces} />
      </div>
    </>
  );
}
