import './board.scss'
import { InitializeTiles } from './tile';
import { InitializePieces, PieceProps, Team } from './pieces';
import Controller from './controller'
import { useRef, useState } from 'react';

export default function Board() {
  const Chessboard: React.RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);
  const Promotion: React.RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);

  const team: Team = 'White';
  const color = team === 'White' ? 'White' : 'Black';
  const [Pieces, setPieces] = useState<PieceProps[]>(InitializePieces(team));
  const Board: JSX.Element[] = InitializeTiles(Pieces, team);

  const [PromotePiece, setPromotePiece] = useState<PieceProps | null>(null);
  const [ActivePiece, setActivePiece] = useState<HTMLElement | null>(null);
  const [GridX, setGridX] = useState(0);
  const [GridY, setGridY] = useState(0);

  const controller: Controller = new Controller(
    Chessboard, Promotion, team,
    ActivePiece, setActivePiece,
    PromotePiece, setPromotePiece,
    Pieces, setPieces, // setTiles,
    GridX, setGridX,
    GridY, setGridY,
  );

  return (
    <>
      <div id="promotion" className='hidden' ref={Promotion}>
        <div className='body'>
          <img onClick={() => { controller.promotePawn('Bishop') }} src={`./assets/${color.toLowerCase()}-bishop.png`} />
          <img onClick={() => { controller.promotePawn('Knight') }} src={`./assets/${color.toLowerCase()}-knight.png`} />
          <img onClick={() => { controller.promotePawn('Queen') }} src={`./assets/${color.toLowerCase()}-queen.png`} />
          <img onClick={() => { controller.promotePawn('Rook') }} src={`./assets/${color.toLowerCase()}-rook.png`} />
        </div>
      </div>
      <div className="board"
        ref={Chessboard}
        onMouseMove={e => controller.dragPiece(e)}
        onMouseDown={e => controller.grabPiece(e)}
        onMouseUp={e => controller.dropPiece(e)}>
        {Board}
      </div>
    </>
  )
}
