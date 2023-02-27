import Tile from "./tile";
import { PieceProps, PieceType, Team } from "./logic/constants";

export function InitializeTiles(Pieces: PieceProps[], team: Team): JSX.Element[] {
  const HAxis: string[] = ["a", "b", "c", "d", "e", "f", "g", "h"];
  const VAxis: string[] = ["1", "2", "3", "4", "5", "6", "7", "8"];
  const Tiles: JSX.Element[] = [];

  for (const [row] of HAxis.entries()) {
    for (const [col] of VAxis.entries()) {
      let Image: string = "";
      let Type: PieceType = "None";
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
            Type = "Pawn";
          } else if (piece.img.substring(15, 19) === "rook") {
            Type = "Rook";
          } else if (piece.img.substring(15, 19) === "knig") {
            Type = "Knight";
          } else if (piece.img.substring(15, 19) === "bish") {
            Type = "Bishop";
          } else if (piece.img.substring(15, 19) === "quee") {
            Type = "Queen";
          } else {
            Type == "King";
          }
        }
      });

      Tiles.push(
        <Tile
          team={team}
          row={row}
          col={col}
          piece={{ img: Image, row: row, col: col, type: Type, team: Team }}
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
    type: "Bishop",
  });

  pieces.push({
    img: `./assets/${opponent.toLowerCase()}-bishop.png`,
    row: 0,
    col: 5,
    team: opponent,
    type: "Bishop",
  });

  // Kings
  pieces.push({
    img: `./assets/${opponent.toLowerCase()}-king.png`,
    row: 0,
    col: kingCol,
    team: opponent,
    type: "King",
  });

  // Knights
  pieces.push({
    img: `./assets/${opponent.toLowerCase()}-knight.png`,
    row: 0,
    col: 6,
    team: opponent,
    type: "Knight",
  });

  pieces.push({
    img: `./assets/${opponent.toLowerCase()}-knight.png`,
    row: 0,
    col: 1,
    team: opponent,
    type: "Knight",
  });

  // Pawns
  for (let col = 0; col < 8; col++) {
    pieces.push({
      img: `./assets/${opponent.toLowerCase()}-pawn.png`,
      row: 1,
      col,
      team: opponent,
      type: "Pawn",
    });
  }

  // Queens
  pieces.push({
    img: `./assets/${opponent.toLowerCase()}-queen.png`,
    row: 0,
    col: queenCol,
    team: opponent,
    type: "Queen",
  });

  // Rooks
  pieces.push({
    img: `./assets/${opponent.toLowerCase()}-rook.png`,
    row: 0,
    col: 0,
    team: opponent,
    type: "Rook",
  });

  pieces.push({
    img: `./assets/${opponent.toLowerCase()}-rook.png`,
    row: 0,
    col: 7,
    team: opponent,
    type: "Rook",
  });

  // Player pieces
  //Bishop
  pieces.push({
    img: `./assets/${player.toLowerCase()}-bishop.png`,
    row: 7,
    col: 2,
    team: player,
    type: "Bishop",
  });

  pieces.push({
    img: `./assets/${player.toLowerCase()}-bishop.png`,
    row: 7,
    col: 5,
    team: player,
    type: "Bishop",
  });

  // King
  pieces.push({
    img: `./assets/${player.toLowerCase()}-king.png`,
    row: 7,
    col: kingCol,
    team: player,
    type: "King",
  });

  // Knight
  pieces.push({
    img: `./assets/${player.toLowerCase()}-knight.png`,
    row: 7,
    col: 6,
    team: player,
    type: "Knight",
  });

  pieces.push({
    img: `./assets/${player.toLowerCase()}-knight.png`,
    row: 7,
    col: 1,
    team: player,
    type: "Knight",
  });

  // Rooks
  pieces.push({
    img: `./assets/${player.toLowerCase()}-rook.png`,
    row: 7,
    col: 0,
    team: player,
    type: "Rook",
  });

  pieces.push({
    img: `./assets/${player.toLowerCase()}-rook.png`,
    row: 7,
    col: 7,
    team: player,
    type: "Rook",
  });

  // Pawns
  for (let col = 0; col < 8; col++) {
    pieces.push({
      img: `./assets/${player.toLowerCase()}-pawn.png`,
      row: 6,
      col,
      team: player,
      type: "Pawn",
    });
  }

  // Queen
  pieces.push({
    img: `./assets/${player.toLowerCase()}-queen.png`,
    row: 7,
    col: queenCol,
    team: player,
    type: "Queen",
  });

  return pieces;
}
