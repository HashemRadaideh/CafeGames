import './pieces.scss'

export const PieceTypes = {
  Bishop: 'bishop',
  King: 'king',
  Knight: 'knight',
  Pawn: 'pawn',
  Queen: 'queen',
  Rook: 'rook',
} as const;

type PieceType = keyof typeof PieceTypes

export interface PieceProps {
  col: number;
  row: number;
  img: string;
  type: PieceType;
}

export const InitialPieces: PieceProps[] = [];

// Rooks
InitialPieces.push(
  { img: './assets/black-rook.png', row: 0, col: 0, type: 'Rook' }
)
InitialPieces.push(
  { img: './assets/black-rook.png', row: 0, col: 7, type: 'Rook' }
)
InitialPieces.push(
  { img: './assets/white-rook.png', row: 7, col: 0, type: 'Rook' }
)
InitialPieces.push(
  { img: './assets/white-rook.png', row: 7, col: 7, type: 'Rook' }
)

// Knights
InitialPieces.push(
  { img: './assets/black-knight.png', row: 0, col: 1, type: 'Knight' }
)
InitialPieces.push(
  { img: './assets/black-knight.png', row: 0, col: 6, type: 'Knight' }
)
InitialPieces.push(
  { img: './assets/white-knight.png', row: 7, col: 1, type: 'Knight' }
)
InitialPieces.push(
  { img: './assets/white-knight.png', row: 7, col: 6, type: 'Knight' }
)

// Bishop
InitialPieces.push(
  { img: './assets/black-bishop.png', row: 0, col: 2, type: 'Bishop' }
)
InitialPieces.push(
  { img: './assets/black-bishop.png', row: 0, col: 5, type: 'Bishop' }
)
InitialPieces.push(
  { img: './assets/white-bishop.png', row: 7, col: 2, type: 'Bishop' }
)
InitialPieces.push(
  { img: './assets/white-bishop.png', row: 7, col: 5, type: 'Bishop' }
)

// Queens
InitialPieces.push(
  { img: './assets/black-queen.png', row: 0, col: 3, type: 'Queen' }
)
InitialPieces.push(
  { img: './assets/white-queen.png', row: 7, col: 3, type: 'Queen' }
)

// Kings
InitialPieces.push(
  { img: './assets/black-king.png', row: 0, col: 4, type: 'King' }
)
InitialPieces.push(
  { img: './assets/white-king.png', row: 7, col: 4, type: 'King' }
)

// Pawns
for (let col = 0; col < 8; col++) {
  InitialPieces.push(
    { img: './assets/black-pawn.png', row: 1, col, type: 'Pawn' }
  )
  InitialPieces.push(
    { img: './assets/white-pawn.png', row: 6, col, type: 'Pawn' }
  )
}

export default function Piece({ img }: PieceProps) {
  if (img === "") return (<></>);
  return (
    <div className="piece" style={{ backgroundImage: `url(${img}` }} >
    </div>
  );
}
