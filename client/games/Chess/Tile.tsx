import "./styles/Tile.scss";
import Piece from "./Piece";
import { TileProps } from "./logic/constants";

export default function Tile({
  pos,
  color1,
  color2,
  piece,
}: TileProps): JSX.Element {
  let choice1: string = "white";
  let choice2: string = "black";

  if (color1 && color2) {
    choice1 = color1;
    choice2 = color2;
  }

  const tileColor: string = (pos.row + pos.col) % 2 === 0 ? choice1 : choice2;

  return (
    <div className={`tile ${tileColor}-tile`}>
      {piece && (
        <Piece
          img={piece.img}
          pos={piece.pos}
          team={piece.team}
          rank={piece.rank}
        />
      )}
    </div>
  );
}
