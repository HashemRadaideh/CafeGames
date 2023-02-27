import './board.scss';
import { InitializeTiles } from './tile';
import { InitializePieces, PieceProps, Team } from './pieces';
import Controller from './controller';
import { useRef, useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io("http://localhost:3000");

let team: Team = 'None';
const room: number = 10;

export default function Board() {
  const Chessboard: React.RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);
  const Promotion: React.RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);

  const [Pieces, setPieces] = useState<PieceProps[]>([]);
  const Board: JSX.Element[] = InitializeTiles(Pieces, team);

  const [PromotePiece, setPromotePiece] = useState<PieceProps | null>(null);
  const [ActivePiece, setActivePiece] = useState<HTMLElement | null>(null);
  const [GridX, setGridX] = useState(0);
  const [GridY, setGridY] = useState(0);

  useEffect(() => {
    socket.emit('join_room', room)

    socket.on("create_player", (data) => {
      team = data;
      socket.emit('player_created', team)
      setPieces(InitializePieces(team));
    });

    socket.on("opponents_turn", (data) => {
      setPieces(data);
    });
  }, [socket]);

  const con: Controller = new Controller(
    socket,
    Chessboard, Promotion, team,
    ActivePiece, setActivePiece,
    PromotePiece, setPromotePiece,
    Pieces, setPieces,
    GridX, setGridX,
    GridY, setGridY,
  );

  return (
    <>
      <div id="promotion" className='hidden' ref={Promotion}>
        <div className='body'>
          <img onClick={() => con.promotePawn('Bishop')} src={`./assets/${team === 'White' ? 'white' : 'black'}-bishop.png`} />
          <img onClick={() => con.promotePawn('Knight')} src={`./assets/${team === 'White' ? 'white' : 'black'}-knight.png`} />
          <img onClick={() => con.promotePawn('Queen')} src={`./assets/${team === 'White' ? 'white' : 'black'}-queen.png`} />
          <img onClick={() => con.promotePawn('Rook')} src={`./assets/${team === 'White' ? 'white' : 'black'}-rook.png`} />
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
