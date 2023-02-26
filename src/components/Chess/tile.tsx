import './tile.scss'
import Piece, { PieceProps, PieceType, Team } from './pieces';

interface TileProps {
  team: Team;
  col: number;
  row: number;
  color1?: string;
  color2?: string;
  piece?: PieceProps;
}

export function InitializeTiles(Pieces: PieceProps[], team: Team) {
  const HAxis: string[] = ["a", "b", "c", "d", "e", "f", "g", "h"]
  const VAxis: string[] = ["1", "2", "3", "4", "5", "6", "7", "8"]
  const Tiles: JSX.Element[] = [];

  for (const [row] of HAxis.entries()) {
    for (const [col] of VAxis.entries()) {
      let Image: string = "";
      let Type: PieceType = "None";
      let Team: Team = "None";

      Pieces.forEach(piece => {
        if (piece.row === row && piece.col === col) {
          Image = piece.img;

          if (piece.img.substring(9, 14) === "black") {
            Team = 'Black'
          } else {
            Team = 'White'
          }

          if (piece.img.substring(15, 19) === "pawn") {
            Type = 'Pawn'
          } else if (piece.img.substring(15, 19) === "rook") {
            Type = 'Rook'
          } else if (piece.img.substring(15, 19) === "knig") {
            Type = 'Knight'
          } else if (piece.img.substring(15, 19) === "bish") {
            Type = 'Bishop'
          } else if (piece.img.substring(15, 19) === "quee") {
            Type = 'Queen'
          } else {
            Type == 'King'
          }
        }
      });

      Tiles.push(
        <Tile
          team={team}
          row={row}
          col={col}
          piece={{ img: Image, row: row, col: col, type: Type, team: Team }}
          key={`(${col}, ${row})`}
        />
      );
    }
  }

  return Tiles;
}

export default function Tile({
  team,
  row,
  col,
  color1,
  color2,
  piece }: TileProps) {
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
