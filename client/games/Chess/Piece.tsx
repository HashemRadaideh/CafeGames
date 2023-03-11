import "./styles/Piece.scss";
import { PieceProps } from "./logic/constants";

export default function Piece({ img }: PieceProps): JSX.Element {
  if (img === "") return <></>;
  return (
    <div className="piece" style={{ backgroundImage: `url(${img}` }}></div>
  );
}
