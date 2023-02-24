import './board.scss'
import Tile from './tile';

const HAxis = ["a", "b", "c", "d", "e", "f", "g", "h"]
const VAxis = ["1", "2", "3", "4", "5", "6", "7", "8"]

export default function Board() {
  let board = [];

  for (const [index1] of HAxis.entries()) {
    for (const [index2] of VAxis.entries()) {
      board.push(<Tile number={index1 + index2} />);
    }
  }

  return (
    <div className="board">
      {board}
    </div>
  )
}
