import './board.scss'
import { InitializeTiles } from './tile';
import { InitializePieces, PieceProps, Team } from './pieces';
import Controller from './controller'
import { useRef, useState } from 'react';

export default function Board() {
  const Chessboard: React.RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);

  const team: Team = 'White';
  const [Pieces, setPieces] = useState<PieceProps[]>(InitializePieces(team));
  const Board: JSX.Element[] = InitializeTiles(Pieces, team);

  const [ActivePiece, setActivePiece] = useState<HTMLElement | null>(null);
  const [GridX, setGridX] = useState(0);
  const [GridY, setGridY] = useState(0);

  const controller: Controller = new Controller(
    Chessboard,
    team,
    ActivePiece, setActivePiece,
    setPieces, Pieces,// setTiles,
    GridX, setGridX,
    GridY, setGridY,
  );

  return (
    <div className="board"
      ref={Chessboard}
      onMouseMove={e => controller.dragPiece(e)}
      onMouseDown={e => controller.grabPiece(e)}
      onMouseUp={e => controller.dropPiece(e)}>
      {Board}
    </div>
  )
}
