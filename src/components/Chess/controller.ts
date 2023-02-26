import React from "react";
import { PieceProps, Team } from "./pieces";
import Rules from "./rules";

export default class Controller {
  private chessboard: React.RefObject<HTMLDivElement>;
  private activePiece: HTMLElement | null;
  private setActivePiece: React.Dispatch<
    React.SetStateAction<HTMLElement | null>
  >;
  // private setTiles: React.Dispatch<React.SetStateAction<JSX.Element[]>>;
  private setPieces: React.Dispatch<React.SetStateAction<PieceProps[]>>;
  private Pieces: PieceProps[];
  private GridX: number;
  private setGridX: React.Dispatch<React.SetStateAction<number>>;
  private GridY: number;
  private setGridY: React.Dispatch<React.SetStateAction<number>>;
  private team: Team;

  constructor(
    Chessboard: React.RefObject<HTMLDivElement>,
    team: Team,
    ActivePiece: HTMLElement | null,
    setActivePiece: React.Dispatch<React.SetStateAction<HTMLElement | null>>,
    setPieces: React.Dispatch<React.SetStateAction<PieceProps[]>>,
    Pieces: PieceProps[],
    // setTiles: React.Dispatch<React.SetStateAction<JSX.Element[]>>,
    GridX: number,
    setGridX: React.Dispatch<React.SetStateAction<number>>,
    GridY: number,
    setGridY: React.Dispatch<React.SetStateAction<number>>
  ) {
    this.chessboard = Chessboard;
    this.team = team;

    this.setPieces = setPieces;
    this.Pieces = Pieces;
    // this.setTiles = setTiles;

    this.activePiece = ActivePiece;
    this.setActivePiece = setActivePiece;

    this.setGridX = setGridX;
    this.setGridY = setGridY;

    this.GridX = GridX;
    this.GridY = GridY;
  }

  // if (
  //   !window
  //     .getComputedStyle(element)
  //     .backgroundImage.includes(`${this.team.toLowerCase}`)
  // )
  //   return;

  grabPiece(e: React.MouseEvent) {
    const element: HTMLElement = e.target as HTMLElement;
    if (!element.classList.contains("piece")) return;

    const backgroundImage = window.getComputedStyle(element).backgroundImage;
    if (!backgroundImage.includes(`${this.team.toLowerCase()}`)) return;

    this.setActivePiece(element);

    if (!this.chessboard.current) return;
    const chessboard = this.chessboard.current;

    this.setGridX(Math.floor((e.clientX - chessboard.offsetLeft) / 100));
    this.setGridY(Math.floor((e.clientY - chessboard.offsetTop) / 100));

    const x = e.clientX - 50;
    const y = e.clientY - 50;

    element.style.position = "absolute";
    element.style.left = `${x}px`;
    element.style.top = `${y}px`;
  }

  dragPiece(e: React.MouseEvent) {
    if (!this.activePiece) return;
    if (!this.activePiece.classList.contains("piece")) return;
    if (!this.chessboard.current) return;
    const chessboard = this.chessboard.current;

    const minX = chessboard.offsetLeft - 20;
    const minY = chessboard.offsetTop - 20;

    const maxX = chessboard.offsetLeft + chessboard.clientWidth - 95;
    const maxY = chessboard.offsetTop + chessboard.clientHeight - 95;

    const x = e.clientX - 50;
    const y = e.clientY - 50;

    this.activePiece.style.position = "absolute";
    this.activePiece.style.left = `${x < minX ? minX : x > maxX ? maxX : x}px`;
    this.activePiece.style.top = `${y < minY ? minY : y > maxY ? maxY : y}px`;
  }

  dropPiece(e: React.MouseEvent) {
    if (!this.chessboard.current) return;
    const chessboard = this.chessboard.current;
    const rule = new Rules(this.chessboard, this.team, this.Pieces);

    const gridX: number = Math.floor((e.clientX - chessboard.offsetLeft) / 100);
    const gridY: number = Math.floor((e.clientY - chessboard.offsetTop) / 100);

    const currentPiece = this.Pieces.find(
      (p: PieceProps) => p.col === this.GridX && p.row === this.GridY
    );

    if (currentPiece) {
      if (!rule.isMoveValid(currentPiece, gridX, gridY)) {
        if (!this.activePiece) return;

        this.activePiece.style.position = "relative";
        this.activePiece.style.removeProperty("top");
        this.activePiece.style.removeProperty("left");

        this.setActivePiece(null);
        return;
      }

      const newPieces: PieceProps[] = this.Pieces.reduce(
        (pieces: PieceProps[], piece: PieceProps) => {
          if (currentPiece === piece) {
            piece.col = gridX;
            piece.row = gridY;
            pieces.push(piece);
          } else if (!(piece.col === gridX && piece.row === gridY)) {
            pieces.push(piece);
          }

          return pieces;
        },
        [] as PieceProps[]
      );

      this.setPieces(newPieces);
    }

    this.setActivePiece(null);
  }
}
