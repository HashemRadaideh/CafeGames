import Tile from "../Tile";
import { PieceProps, rank, Team } from "./constants";

export function InitializeTiles(Pieces: PieceProps[], team: Team): JSX.Element[] {
  const HAxis: string[] = ["a", "b", "c", "d", "e", "f", "g", "h"];
  const VAxis: string[] = ["1", "2", "3", "4", "5", "6", "7", "8"];
  const Tiles: JSX.Element[] = [];

  for (const [row] of HAxis.entries()) {
    for (const [col] of VAxis.entries()) {
      let Image: string = "";
      let Rank: rank = "None";
      let Team: Team = "None";

      Pieces.forEach((piece) => {
        if (piece.row === row && piece.col === col) {
          Image = piece.img;

          if (piece.img.substring(9, 14) === "black") {
            Team = "Black";
          } else {
            Team = "White";
          }

          if (piece.img.substring(15, 19) === "pawn") {
            Rank = "Pawn";
          } else if (piece.img.substring(15, 19) === "rook") {
            Rank = "Rook";
          } else if (piece.img.substring(15, 19) === "knig") {
            Rank = "Knight";
          } else if (piece.img.substring(15, 19) === "bish") {
            Rank = "Bishop";
          } else if (piece.img.substring(15, 19) === "quee") {
            Rank = "Queen";
          } else {
            Rank == "King";
          }
        }
      });

      Tiles.push(
        <Tile
          team={team}
          row={row}
          col={col}
          piece={{ img: Image, row: row, col: col, rank: Rank, team: Team }}
          key={`(${col}, ${row})`
          }
        />
      );
    }
  }

  return Tiles;
}

export function InitializePieces(team: Team) {
  const pieces: PieceProps[] = [];

  const opponent = team === "White" ? "Black" : "White";
  const player = team === "White" ? "White" : "Black";
  const kingCol = team === "White" ? 4 : 3;
  const queenCol = team === "White" ? 3 : 4;

  // Opponent pieces
  // Bishop
  pieces.push({
    img: `./assets/${opponent.toLowerCase()}-bishop.png`,
    row: 0,
    col: 2,
    team: opponent,
    rank: "Bishop",
  });

  pieces.push({
    img: `./assets/${opponent.toLowerCase()}-bishop.png`,
    row: 0,
    col: 5,
    team: opponent,
    rank: "Bishop",
  });

  // Kings
  pieces.push({
    img: `./assets/${opponent.toLowerCase()}-king.png`,
    row: 0,
    col: kingCol,
    team: opponent,
    rank: "King",
  });

  // Knights
  pieces.push({
    img: `./assets/${opponent.toLowerCase()}-knight.png`,
    row: 0,
    col: 6,
    team: opponent,
    rank: "Knight",
  });

  pieces.push({
    img: `./assets/${opponent.toLowerCase()}-knight.png`,
    row: 0,
    col: 1,
    team: opponent,
    rank: "Knight",
  });

  // Pawns
  for (let col = 0; col < 8; col++) {
    pieces.push({
      img: `./assets/${opponent.toLowerCase()}-pawn.png`,
      row: 1,
      col,
      team: opponent,
      rank: "Pawn",
    });
  }

  // Queens
  pieces.push({
    img: `./assets/${opponent.toLowerCase()}-queen.png`,
    row: 0,
    col: queenCol,
    team: opponent,
    rank: "Queen",
  });

  // Rooks
  pieces.push({
    img: `./assets/${opponent.toLowerCase()}-rook.png`,
    row: 0,
    col: 0,
    team: opponent,
    rank: "Rook",
  });

  pieces.push({
    img: `./assets/${opponent.toLowerCase()}-rook.png`,
    row: 0,
    col: 7,
    team: opponent,
    rank: "Rook",
  });

  // Player pieces
  //Bishop
  pieces.push({
    img: `./assets/${player.toLowerCase()}-bishop.png`,
    row: 7,
    col: 2,
    team: player,
    rank: "Bishop",
  });

  pieces.push({
    img: `./assets/${player.toLowerCase()}-bishop.png`,
    row: 7,
    col: 5,
    team: player,
    rank: "Bishop",
  });

  // King
  pieces.push({
    img: `./assets/${player.toLowerCase()}-king.png`,
    row: 7,
    col: kingCol,
    team: player,
    rank: "King",
  });

  // Knight
  pieces.push({
    img: `./assets/${player.toLowerCase()}-knight.png`,
    row: 7,
    col: 6,
    team: player,
    rank: "Knight",
  });

  pieces.push({
    img: `./assets/${player.toLowerCase()}-knight.png`,
    row: 7,
    col: 1,
    team: player,
    rank: "Knight",
  });

  // Rooks
  pieces.push({
    img: `./assets/${player.toLowerCase()}-rook.png`,
    row: 7,
    col: 0,
    team: player,
    rank: "Rook",
  });

  pieces.push({
    img: `./assets/${player.toLowerCase()}-rook.png`,
    row: 7,
    col: 7,
    team: player,
    rank: "Rook",
  });

  // Pawns
  for (let col = 0; col < 8; col++) {
    pieces.push({
      img: `./assets/${player.toLowerCase()}-pawn.png`,
      row: 6,
      col,
      team: player,
      rank: "Pawn",
    });
  }

  // Queen
  pieces.push({
    img: `./assets/${player.toLowerCase()}-queen.png`,
    row: 7,
    col: queenCol,
    team: player,
    rank: "Queen",
  });

  return pieces;
}
