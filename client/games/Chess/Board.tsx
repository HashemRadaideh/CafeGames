import "./styles/Board.scss";
import { socket } from "./App";
import { useRef, useState, useEffect } from "react";
import Controller from "./logic/controller";
import { Piece, team, Position } from "./logic/constants";
import { InitializePieces, InitializeTiles } from "./logic/initial";
import Panel from "./Panel";

interface BoardProps {
  team: team;
  pieces: Piece[];
}

export default function Board({ team, pieces }: BoardProps): JSX.Element {
  const Chessboard = useRef<HTMLDivElement>(null);
  const Promotion = useRef<HTMLDivElement>(null);

  const [PlayerTeam, setPlayerTeam] = useState<team>("None");
  const [Pieces, setPieces] = useState<Piece[]>([]);
  const Board: JSX.Element[] = InitializeTiles(Pieces, PlayerTeam);

  const [PromotePawn, setPromotePawn] = useState<Piece | null>(null);
  const [ActivePiece, setActivePiece] = useState<HTMLElement | null>(null);
  const [position, setPosition] = useState<Position>({ col: 0, row: 0 });

  useEffect(() => {
    setPlayerTeam(team);
    if (!Array.isArray(pieces) || !pieces.length)
      setPieces(InitializePieces(team));
    else setPieces(pieces);
  }, [team]);

  useEffect(() => {
    socket.on("opponents_turn", (pieces: Piece[]): void => {
      setPieces(pieces);
    });
  }, [socket]);

  const controller: Controller = new Controller(
    Chessboard,
    Promotion,
    team,
    Pieces,
    setPieces,
    ActivePiece,
    setActivePiece,
    PromotePawn,
    setPromotePawn,
    position,
    setPosition
  );

  return (
    <>
      <div id="promotion" className="hidden" ref={Promotion}>
        <Panel controller={controller} team={PlayerTeam} />
      </div>
      <div
        className="board"
        ref={Chessboard}
        onMouseMove={(e) => controller.dragPiece(e)}
        onMouseDown={(e) => controller.grabPiece(e)}
        onMouseUp={(e) => controller.dropPiece(e)}
      >
        {Board}
      </div>
    </>
  );
}
