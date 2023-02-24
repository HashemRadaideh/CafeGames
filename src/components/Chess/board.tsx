import './board.scss'
import Tile from './tile';
import { InitialPieces, PieceProps } from './pieces';
import Controller from './controller'
import { useRef, useState } from 'react';

export default function Board() {
  const HAxis: string[] = ["a", "b", "c", "d", "e", "f", "g", "h"]
  const VAxis: string[] = ["1", "2", "3", "4", "5", "6", "7", "8"]
  const Board: JSX.Element[] = Array(64);

  const Chessboard: React.RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);
  const [ActivePiece, setActivePiece] = useState<HTMLElement | null>(null)
  const [Pieces, setPieces] = useState<PieceProps[]>(InitialPieces)
  const [GridX, setGridX] = useState(0)
  const [GridY, setGridY] = useState(0)

  for (const [row] of HAxis.entries()) {
    for (const [col] of VAxis.entries()) {
      let image: string = "";

      Pieces.forEach(piece => {
        if (piece.row === row && piece.col === col) {
          image = piece.img;
        }
      });

      Board.push(<Tile img={image} row={row} col={col} key={`${col},${row}`} />);
    }
  }

  const controller: Controller = new Controller(
    Chessboard,
    ActivePiece, setActivePiece,
    setPieces,
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
