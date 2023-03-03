import './style/index.scss'
import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import Board from './Board'
import { PieceProps, Team } from './logic/constants';

export const socket = io("http://192.168.1.26:3000");

export default function Chessboard() {
  const [Team, setTeam] = useState<Team>('None')
  const [Pieces, setPieces] = useState<PieceProps[]>([])

  useEffect(() => {
    socket.emit('looking_for_game', 10)

    socket.on("create_player", (data) => {
      setTeam(data.team);
      setPieces(data.pieces);
      socket.emit('player_created', Team)
    });
  }, [])

  return (
    <div id="chess">
      <Board team={Team} pieces={Pieces} />
    </div>
  )
}
