import './style/Tile.scss'
import Piece from './Piece';
import { TileProps } from './logic/constants';

export default function Tile({ team, row, col, color1, color2, piece }: TileProps): JSX.Element {
  let choice1: string = "white";
  let choice2: string = "black";

  if (color1 && color2) {
    choice1 = color1;
    choice2 = color2;
  }

  const tileColor: string = (row + col) % 2 === 0 ? choice1 : choice2

  return (
    <div className={`tile ${tileColor}-tile`}>
      {
        piece &&
        <Piece
          img={piece.img}
          row={piece.row}
          col={piece.col}
          team={piece.team}
          rank={piece.rank}
        />
      }
    </div>
  );
}
