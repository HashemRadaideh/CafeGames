import Rules from "./rules";
import { socket } from "../index";
import { PieceProps, rank, Team } from "./constants";

export default class Controller {
  chessboard: React.RefObject<HTMLDivElement>;
  Promotion: React.RefObject<HTMLDivElement>;
  activePiece: HTMLElement | null;
  setActivePiece: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
  PromotePawn: PieceProps | null;
  setPromotePawn: React.Dispatch<React.SetStateAction<PieceProps | null>>;
  setPieces: React.Dispatch<React.SetStateAction<PieceProps[]>>;
  Pieces: PieceProps[];
  GridX: number;
  setGridX: React.Dispatch<React.SetStateAction<number>>;
  GridY: number;
  setGridY: React.Dispatch<React.SetStateAction<number>>;
  team: Team;

  constructor(
    Chessboard: React.RefObject<HTMLDivElement>,
    Promotion: React.RefObject<HTMLDivElement>,
    team: Team,
    Pieces: PieceProps[],
    setPieces: React.Dispatch<React.SetStateAction<PieceProps[]>>,
    ActivePiece: HTMLElement | null,
    setActivePiece: React.Dispatch<React.SetStateAction<HTMLElement | null>>,
    PromotePawn: PieceProps | null,
    setPromotePawn: React.Dispatch<React.SetStateAction<PieceProps | null>>,
    GridX: number,
    setGridX: React.Dispatch<React.SetStateAction<number>>,
    GridY: number,
    setGridY: React.Dispatch<React.SetStateAction<number>>
  ) {
    this.chessboard = Chessboard;

    this.Promotion = Promotion;

    this.team = team;

    this.Pieces = Pieces;
    this.setPieces = setPieces;

    this.activePiece = ActivePiece;
    this.setActivePiece = setActivePiece;

    this.PromotePawn = PromotePawn;
    this.setPromotePawn = setPromotePawn;

    this.GridX = GridX;
    this.setGridX = setGridX;

    this.GridY = GridY;
    this.setGridY = setGridY;
  }

  promotePawn(rank: rank): void {
    const newPieces = this.Pieces.reduce((pieces, piece) => {
      if (
        this.PromotePawn &&
        piece.col === this.PromotePawn.col &&
        piece.row === this.PromotePawn.row
      ) {
        piece.rank = rank;
        const color = piece.team === "White" ? "white" : "black";

        switch (piece.rank) {
          case "Bishop":
            piece.img = `./assets/${color}-bishop.png`;
            break;

          case "Knight":
            piece.img = `./assets/${color}-knight.png`;
            break;

          case "Queen":
            piece.img = `./assets/${color}-queen.png`;
            break;

          case "Rook":
            piece.img = `./assets/${color}-rook.png`;
            break;

          default:
            piece.img = piece.img;
        }
      }

      pieces.push(piece);

      return pieces;
    }, [] as PieceProps[]);

    this.setPieces(newPieces);

    this.Promotion.current?.classList.add("hidden");

    this.setPromotePawn(null);
  }

  grabPiece(e: React.MouseEvent): void {
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

  dragPiece(e: React.MouseEvent): void {
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

  dropPiece(e: React.MouseEvent): void {
    if (!this.chessboard.current) return;
    const chessboard = this.chessboard.current;
    const rule = new Rules(this.team, this.Pieces);

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
            if (rule.isPromotable(piece)) {
              this.Promotion.current?.classList.remove("hidden");
              this.setPromotePawn(piece);
            }
            if (rule.isCastling(piece, gridX, gridY)) {
            }
            pieces.push(piece);
          } else if (piece.col === gridX && piece.row === gridY) {
            piece.col = 100;
            piece.row = 100;
            pieces.push(piece);
          } else {
            pieces.push(piece);
          }

          return pieces;
        },
        [] as PieceProps[]
      );

      this.setPieces(newPieces);
      socket.emit("players_turn", { pieces: this.Pieces, room: 10 });
    }

    this.setActivePiece(null);
  }
}
