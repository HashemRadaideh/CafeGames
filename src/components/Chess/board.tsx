import './board.scss'
import Tile from './tile';
import Pieces from './pieces';

export default function Board() {
  const Board: JSX.Element[] = Array(64);
  const HAxis: string[] = ["a", "b", "c", "d", "e", "f", "g", "h"]
  const VAxis: string[] = ["1", "2", "3", "4", "5", "6", "7", "8"]

  for (const [row] of HAxis.entries()) {
    for (const [col] of VAxis.entries()) {
      let image: string = "";

      Pieces.forEach(piece => {
        if (piece.row === row && piece.col === col) {
          image = piece.img;
        }
      });

      Board.push(<Tile img={image} row={row} col={col} key={`${col},${row}`} />);
    }
  }

  return (
    <div className="board">
      {Board}
    </div>
  )
}
