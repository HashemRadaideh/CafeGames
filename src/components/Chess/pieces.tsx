import './pieces.scss'

const pieceType = {
  Bishop: 'bishop',
  King: 'king',
  Knight: 'knight',
  Pawn: 'pawn',
  Queen: 'queen',
  Rook: 'rook',
  None: 'None'
} as const;

export type PieceType = keyof typeof pieceType

const TeamType = {
  Black: 'black',
  White: 'white',
  None: 'None'
} as const;

export type Team = keyof typeof TeamType

export interface PieceProps {
  img: string;
  col: number;
  row: number;
  team: Team;
  type: PieceType;
}

export default function Piece({ img }: PieceProps) {
  if (img === "") return (<></>);
  return (
    <div className="piece" style={{ backgroundImage: `url(${img}` }} >
    </div>
  );
}

export function InitializePieces(team: Team) {
  const pieces: PieceProps[] = [];

  const opponent = team === 'White' ? 'Black' : 'White';
  const player = team === 'White' ? 'White' : 'Black';

  // Opponent pieces
  // Bishop
  pieces.push({
    img: `./assets/${opponent.toLowerCase()}-bishop.png`,
    row: 0,
    col: 2,
    team: opponent,
    type: 'Bishop',
  })

  pieces.push({
    img: `./assets/${opponent.toLowerCase()}-bishop.png`,
    row: 0,
    col: 5,
    team: opponent,
    type: 'Bishop',
  })

  // Kings
  pieces.push({
    img: `./assets/${opponent.toLowerCase()}-king.png`,
    row: 0,
    col: 4,
    team: opponent,
    type: 'King',
  })

  // Knights
  pieces.push({
    img: `./assets/${opponent.toLowerCase()}-knight.png`,
    row: 0,
    col: 6,
    team: opponent,
    type: 'Knight',
  })

  pieces.push({
    img: `./assets/${opponent.toLowerCase()}-knight.png`,
    row: 0,
    col: 1,
    team: opponent,
    type: 'Knight',
  })

  // Pawns
  for (let col = 0; col < 8; col++) {
    pieces.push({
      img: `./assets/${opponent.toLowerCase()}-pawn.png`,
      row: 1,
      col,
      team: opponent,
      type: 'Pawn',
    })
  }

  // Queens
  pieces.push({
    img: `./assets/${opponent.toLowerCase()}-queen.png`,
    row: 0,
    col: 3,
    team: opponent,
    type: 'Queen',
  })

  // Rooks
  pieces.push({
    img: `./assets/${opponent.toLowerCase()}-rook.png`,
    row: 0,
    col: 0,
    team: opponent,
    type: 'Rook',
  })

  pieces.push({
    img: `./assets/${opponent.toLowerCase()}-rook.png`,
    row: 0,
    col: 7,
    team: opponent,
    type: 'Rook',
  })

  // Player pieces
  //Bishop
  pieces.push({
    img: `./assets/${player.toLowerCase()}-bishop.png`,
    row: 7,
    col: 2,
    team: player,
    type: 'Bishop',
  })

  pieces.push({
    img: `./assets/${player.toLowerCase()}-bishop.png`,
    row: 7,
    col: 5,
    team: player,
    type: 'Bishop',
  })

  // King
  pieces.push({
    img: `./assets/${player.toLowerCase()}-king.png`,
    row: 7,
    col: 4,
    team: player,
    type: 'King',
  })

  // Knight
  pieces.push({
    img: `./assets/${player.toLowerCase()}-knight.png`,
    row: 7,
    col: 6,
    team: player,
    type: 'Knight',
  })

  pieces.push({
    img: `./assets/${player.toLowerCase()}-knight.png`,
    row: 7,
    col: 1,
    team: player,
    type: 'Knight',
  })

  // Rooks
  pieces.push({
    img: `./assets/${player.toLowerCase()}-rook.png`,
    row: 7,
    col: 0,
    team: player,
    type: 'Rook',
  })

  pieces.push({
    img: `./assets/${player.toLowerCase()}-rook.png`,
    row: 7,
    col: 7,
    team: player,
    type: 'Rook',
  })

  // Pawns
  for (let col = 0; col < 8; col++) {
    pieces.push({
      img: `./assets/${player.toLowerCase()}-pawn.png`,
      row: 6,
      col,
      team: player,
      type: 'Pawn',
    })
  }

  // Queen
  pieces.push({
    img: `./assets/${player.toLowerCase()}-queen.png`,
    row: 7,
    col: 3,
    team: player,
    type: 'Queen',
  })

  // Rook
  pieces.push({
    img: `./assets/${player.toLowerCase()}-rook.png`,
    row: 7,
    col: 0,
    team: player,
    type: 'Rook',
  })

  pieces.push({
    img: `./assets/${player.toLowerCase()}-rook.png`,
    row: 7,
    col: 7,
    team: player,
    type: 'Rook',
  })

  return pieces;
}
