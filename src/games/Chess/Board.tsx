import './style/Board.scss';
import { socket } from './index'
import { useRef, useState, useEffect } from 'react';
import Controller from './logic/controller';
import { PieceProps, Team } from './logic/constants';
import { InitializePieces, InitializeTiles } from './logic/initial';

export default function Board({ team, pieces }: { team: Team, pieces: PieceProps[] }): JSX.Element {
  useEffect(() => {
    setPlayerTeam(team);
    if (!Array.isArray(pieces) || !pieces.length)
      setPieces(InitializePieces(team));
    else
      setPieces(pieces);
  }, [team]);

  useEffect(() => {
    socket.on("opponents_turn", (pieces: PieceProps[]): void => {
      setPieces(pieces);
    });
  }, [socket]);

  const Chessboard = useRef<HTMLDivElement>(null);
  const Promotion = useRef<HTMLDivElement>(null);

  const [PlayersTeam, setPlayerTeam] = useState<Team>('None')
  const [Pieces, setPieces] = useState<PieceProps[]>([]);
  const Board: JSX.Element[] = InitializeTiles(Pieces, PlayersTeam);

  const [PromotePawn, setPromotePawn] = useState<PieceProps | null>(null);
  const [ActivePiece, setActivePiece] = useState<HTMLElement | null>(null);
  const [GridX, setGridX] = useState(0);
  const [GridY, setGridY] = useState(0);

  const con: Controller = new Controller(
    Chessboard, Promotion, team,
    Pieces, setPieces,
    ActivePiece, setActivePiece,
    PromotePawn, setPromotePawn,
    GridX, setGridX,
    GridY, setGridY
  );

  return (
    <>
      <div id="promotion" className='hidden' ref={Promotion}>
        <div className='body'>
          <img onClick={() => con.promotePawn('Bishop')} src={`./assets/${PlayersTeam === 'White' ? 'white' : 'black'}-bishop.png`} />
          <img onClick={() => con.promotePawn('Knight')} src={`./assets/${PlayersTeam === 'White' ? 'white' : 'black'}-knight.png`} />
          <img onClick={() => con.promotePawn('Queen')} src={`./assets/${PlayersTeam === 'White' ? 'white' : 'black'}-queen.png`} />
          <img onClick={() => con.promotePawn('Rook')} src={`./assets/${PlayersTeam === 'White' ? 'white' : 'black'}-rook.png`} />
        </div>
      </div>
      <div className="board"
        ref={Chessboard}
        onMouseMove={e => con.dragPiece(e)}
        onMouseDown={e => con.grabPiece(e)}
        onMouseUp={e => con.dropPiece(e)}>
        {Board}
      </div>
    </>
  )
}
