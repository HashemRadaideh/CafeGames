import { PieceProps, Team } from "./pieces";

export default class Rules {
  private team: Team;
  private pieces: PieceProps[];

  constructor(team: Team, pieces: PieceProps[]) {
    this.team = team;
    this.pieces = pieces;
  }

  isTileOccupied(col: number, row: number) {
    for (const piece of this.pieces)
      if (piece.col === col && piece.row === row) return true;
    return false;
  }

  isOpponent(col: number, row: number) {
    for (const piece of this.pieces)
      if (piece.col === col && piece.row === row && piece.team !== this.team)
        return true;
    return false;
  }

  isStraight(
    oldCol: number,
    oldRow: number,
    newCol: number,
    newRow: number
  ): boolean {
    for (let i = 0; i < 8; i++) {
      if (newCol === oldCol + i && newRow === oldRow) return true;

      if (newCol === oldCol - i && newRow === oldRow) return true;

      if (newCol === oldCol && newRow === oldRow + i) return true;

      if (newCol === oldCol && newRow === oldRow - i) return true;
    }

    return false;
  }

  isDiagnoal(
    oldCol: number,
    oldRow: number,
    newCol: number,
    newRow: number
  ): boolean {
    for (let i = 0; i < 8; i++) {
      if (newCol === oldCol + i && newRow === oldRow + i) return true;

      if (newCol === oldCol - i && newRow === oldRow - i) return true;

      if (newCol === oldCol - i && newRow === oldRow + i) return true;

      if (newCol === oldCol + i && newRow === oldRow - i) return true;
    }

    return false;
  }

  isMoveValid(piece: PieceProps, newCol: number, newRow: number): boolean {
    const oldRow = piece.row;
    const oldCol = piece.col;

    if (piece.team !== this.team) return false;

    switch (piece.type) {
      case "Bishop":
        if (this.isDiagnoal(oldCol, oldRow, newCol, newRow)) return true;
        return false;

      case "King":
        if (
          newCol === oldCol + 1 ||
          newCol === oldCol - 1 ||
          newRow === oldRow + 1 ||
          newRow === oldRow - 1
        ) {
          if (this.isDiagnoal(oldCol, oldRow, newCol, newRow)) return true;
          if (this.isStraight(oldCol, oldRow, newCol, newRow)) return true;
        }

        return false;

      case "Knight":
        if (
          (newCol === oldCol + 1 || newCol === oldCol - 1) &&
          (newRow === oldRow + 2 || newRow === oldRow - 2)
        )
          return true;

        if (
          (newCol === oldCol + 2 || newCol === oldCol - 2) &&
          (newRow === oldRow + 1 || newRow === oldRow - 1)
        )
          return true;

        return false;

      case "Pawn":
        if (newRow === 0) {
          // TODO: implement a change piece function for pawns
        }

        if (oldCol === newCol && !this.isTileOccupied(newCol, newRow)) {
          if (
            oldRow === 6 &&
            newRow === oldRow - 2 &&
            !this.isTileOccupied(newCol + 1, newRow + 1)
          )
            return true;

          if (newRow === oldRow - 1) return true;
        }

        if (
          this.isTileOccupied(newCol, newRow) &&
          this.isOpponent(newCol, newRow) &&
          newRow === oldRow - 1 &&
          (newCol === oldCol + 1 || newCol === oldCol - 1)
        ) {
          return true;
        }

        return false;

      case "Queen":
        if (this.isDiagnoal(oldCol, oldRow, newCol, newRow)) return true;
        if (this.isStraight(oldCol, oldRow, newCol, newRow)) return true;

      case "Rook":
        if (this.isStraight(oldCol, oldRow, newCol, newRow)) return true;
        return false;

      default:
        return false;
    }
  }
}
