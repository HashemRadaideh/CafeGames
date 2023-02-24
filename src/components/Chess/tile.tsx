import './tile.scss'

interface Props {
  number: number;
}

export default function Tile({ number }: Props) {
  if (number % 2) {
    return (
      <div className="tile white-tile">
        <img src="" />
      </div>
    );
  }
  else {
    return (
      <div className="tile black-tile">
        <img src="" />
      </div>
    );
  }
}
