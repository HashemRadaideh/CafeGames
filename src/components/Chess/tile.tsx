import './tile.scss'
import Piece from './pieces';

interface Props {
  col: number;
  row: number;
  img: string;
}

export default function Tile({ row, col, img }: Props) {
  return (
    <div className={`tile ${(row + col) % 2 ? "white" : "black"}-tile`}>
      <Piece img={img} row={row} col={col} />
    </div>
  );
}
