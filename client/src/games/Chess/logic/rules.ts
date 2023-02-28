import { PieceProps, Team } from "./constants";

export default class Rules {
  team: Team;
  Pieces: PieceProps[];

  constructor(team: Team, pieces: PieceProps[]) {
    this.team = team;
    this.Pieces = pieces;
  }

  isPromotable(piece: PieceProps): boolean {
    return piece.type === "Pawn" && piece.row === 0;
  }

  isCastling(piece: PieceProps, newCol: number, newRow: number): boolean {
    const oldRow = piece.row;
    const oldCol = piece.col;

    return (
      piece.type === "King" &&
      Math.abs(newCol - oldCol) === 2 &&
      newRow === oldRow &&
      newRow === 0
    );
  }

  isTileOccupied(col: number, row: number): boolean {
    return this.Pieces.find((piece) => piece.col === col && piece.row === row)
      ? true
      : false;
  }

  isOpponent(col: number, row: number): boolean {
    return this.Pieces.find(
      (piece) =>
        piece.col === col && piece.row === row && piece.team !== this.team
    )
      ? true
      : false;
  }

  isStraight(
    oldCol: number,
    oldRow: number,
    newCol: number,
    newRow: number
  ): boolean {
    if (oldCol === newCol) {
      const direction = oldRow < newRow ? 1 : -1;

      for (let row = oldRow + direction; row != newRow; row += direction)
        if (this.isTileOccupied(oldCol, row)) return false;

      return (
        !this.isTileOccupied(newCol, newRow) || this.isOpponent(newCol, newRow)
      );
    }

    if (oldRow === newRow) {
      const direction = oldCol < newCol ? 1 : -1;

      for (let col = oldCol + direction; col != newCol; col += direction)
        if (this.isTileOccupied(col, oldRow)) return false;

      return (
        !this.isTileOccupied(newCol, newRow) || this.isOpponent(newCol, newRow)
      );
    }

    return false;
  }

  isDiagonal(
    oldCol: number,
    oldRow: number,
    newCol: number,
    newRow: number
  ): boolean {
    const colDiff = newCol - oldCol;
    const rowDiff = newRow - oldRow;

    if (Math.abs(colDiff) !== Math.abs(rowDiff)) {
      return false;
    }

    const stepCol = colDiff > 0 ? 1 : -1;
    const stepRow = rowDiff > 0 ? 1 : -1;

    for (let i = 1; i < Math.abs(colDiff); i++) {
      const col = oldCol + i * stepCol;
      const row = oldRow + i * stepRow;

      if (this.isTileOccupied(col, row)) {
        return false;
      }
    }

    return true;
  }

  isMoveValid(piece: PieceProps, newCol: number, newRow: number): boolean {
    const oldRow = piece.row;
    const oldCol = piece.col;

    if (oldCol === newCol && oldRow === newRow) return false;
    if (piece.team !== this.team) return false;

    switch (piece.type) {
      case "Bishop":
        return this.isDiagonal(oldCol, oldRow, newCol, newRow);

      case "King":
        if (Math.abs(newCol - oldCol) <= 1 && Math.abs(newRow - oldRow) <= 1)
          return true;

        if (this.isCastling(piece, newCol, newRow)) return true;

        return false;

      case "Knight":
        const dx = Math.abs(newCol - oldCol);
        const dy = Math.abs(newRow - oldRow);
        if (
          !this.isTileOccupied(newCol, newRow) ||
          this.isOpponent(newCol, newRow)
        )
          return (dx === 1 && dy === 2) || (dx === 2 && dy === 1);
        return false;

      case "Pawn":
        if (newRow === 0) return true;

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

        if (
          newRow === oldRow - 1 &&
          (newCol === oldCol + 1 || newCol === oldCol - 1)
        ) {
          // Check for En Passant capture
          const lastMove = this.Pieces[this.Pieces.length - 1];
          if (
            lastMove.type === "Pawn" &&
            lastMove.row === oldRow &&
            (lastMove.col === oldCol + 1 || lastMove.col === oldCol - 1) &&
            lastMove.row === newRow + 1
          ) {
            return true;
          }
        }

        return false;

      case "Queen":
        if (this.isDiagonal(oldCol, oldRow, newCol, newRow)) return true;
        if (this.isStraight(oldCol, oldRow, newCol, newRow)) return true;

      case "Rook":
        return this.isStraight(oldCol, oldRow, newCol, newRow);

      default:
        return false;
    }
  }
}
