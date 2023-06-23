import "./styles/Tile.scss";
import "./styles/Piece.scss";
import { Position, team, Piece } from "./logic/constants";

export interface TileProps {
  team: team;
  pos: Position;
  color1?: string;
  color2?: string;
  piece?: Piece;
}

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
        <Holder
          img={piece.img}
          pos={piece.pos}
          team={piece.team}
          rank={piece.rank}
        />
      )}
    </div>
  );
}

function Holder({ img }: Piece): JSX.Element {
  if (img === "") return <></>;

  return (
    <div className="piece" style={{ backgroundImage: `url(${img}` }}></div>
  );
}
