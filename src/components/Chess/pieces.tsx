import './pieces.scss'

interface PieceType {
  img: string;
  row: number;
  col: number;
}

const pieces: PieceType[] = Array(32);

// Rooks
pieces.push({ img: './assets/black-rook.png', row: 0, col: 0 })
pieces.push({ img: './assets/white-rook.png', row: 7, col: 0 })
pieces.push({ img: './assets/black-rook.png', row: 0, col: 7 })
pieces.push({ img: './assets/white-rook.png', row: 7, col: 7 })

// Knights
pieces.push({ img: './assets/black-knight.png', row: 0, col: 1 })
pieces.push({ img: './assets/white-knight.png', row: 7, col: 1 })
pieces.push({ img: './assets/black-knight.png', row: 0, col: 6 })
pieces.push({ img: './assets/white-knight.png', row: 7, col: 6 })

// Bishop
pieces.push({ img: './assets/black-bishop.png', row: 0, col: 2 })
pieces.push({ img: './assets/white-bishop.png', row: 7, col: 2 })
pieces.push({ img: './assets/black-bishop.png', row: 0, col: 5 })
pieces.push({ img: './assets/white-bishop.png', row: 7, col: 5 })

// Queens
pieces.push({ img: './assets/black-queen.png', row: 0, col: 3 })
pieces.push({ img: './assets/white-queen.png', row: 7, col: 3 })

// Kings
pieces.push({ img: './assets/black-king.png', row: 0, col: 4 })
pieces.push({ img: './assets/white-king.png', row: 7, col: 4 })

// Pawns
pieces.push({ img: './assets/black-pawn.png', row: 1, col: 0 })
pieces.push({ img: './assets/black-pawn.png', row: 1, col: 1 })
pieces.push({ img: './assets/black-pawn.png', row: 1, col: 2 })
pieces.push({ img: './assets/black-pawn.png', row: 1, col: 3 })
pieces.push({ img: './assets/black-pawn.png', row: 1, col: 4 })
pieces.push({ img: './assets/black-pawn.png', row: 1, col: 5 })
pieces.push({ img: './assets/black-pawn.png', row: 1, col: 6 })
pieces.push({ img: './assets/black-pawn.png', row: 1, col: 7 })

pieces.push({ img: './assets/white-pawn.png', row: 6, col: 0 })
pieces.push({ img: './assets/white-pawn.png', row: 6, col: 1 })
pieces.push({ img: './assets/white-pawn.png', row: 6, col: 2 })
pieces.push({ img: './assets/white-pawn.png', row: 6, col: 3 })
pieces.push({ img: './assets/white-pawn.png', row: 6, col: 4 })
pieces.push({ img: './assets/white-pawn.png', row: 6, col: 5 })
pieces.push({ img: './assets/white-pawn.png', row: 6, col: 6 })
pieces.push({ img: './assets/white-pawn.png', row: 6, col: 7 })

export function Piece({ img }: PieceType) {
  if (img === "") return (<></>);
  return (
    <div className="piece" style={{ backgroundImage: `url(${img}` }} >
    </div>
  );
}

export default pieces
