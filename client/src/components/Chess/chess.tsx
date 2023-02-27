import './chess.scss'
import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import Board from './board'
import { Team } from './logic/constants';

export const socket = io("http://localhost:3000");

export default function Chess() {
  const [Team, setTeam] = useState<Team>('None')

  useEffect(() => {
    socket.emit('looking_for_game', 10)

    socket.on("create_player", (data) => {
      setTeam(data);
      socket.emit('player_created', Team)
    });
  }, [socket])

  return (
    <div id="chess">
      <Board team={Team} />
    </div>
  )
}
