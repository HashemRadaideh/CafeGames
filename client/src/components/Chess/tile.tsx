import './tile.scss'
import Piece from './piece';
import { TileProps } from './logic/constants';

export default function Tile({ team, row, col, color1, color2, piece }: TileProps): JSX.Element {
  let choice1: string = "black";
  let choice2: string = "white";

  if (color1 && color2) {
    choice1 = color1;
    choice2 = color2;
  }

  const tileColor: string =
    team === 'White' ?
      (row + col) % 2 ? choice1 : choice2 :
      (row + col) % 2 === 0 ? choice1 : choice2

  return (
    <div className={`tile ${tileColor}-tile`}>
      {
        piece &&
        <Piece
          img={piece.img}
          row={piece.row}
          col={piece.col}
          team={piece.team}
          type={piece.type}
        />
      }
    </div>
  );
}
