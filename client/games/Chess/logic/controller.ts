import Rules from "./rules";
import { socket } from "../App";
import { Piece, Position, rank, team } from "./constants";

export default class Controller {
  private chessboard: React.RefObject<HTMLDivElement>;
  private Promotion: React.RefObject<HTMLDivElement>;
  private activePiece: HTMLElement | null;
  private setActivePiece: React.Dispatch<
    React.SetStateAction<HTMLElement | null>
  >;
  private PromotePawn: Piece | null;
  private setPromotePawn: React.Dispatch<React.SetStateAction<Piece | null>>;
  private setPieces: React.Dispatch<React.SetStateAction<Piece[]>>;
  private Pieces: Piece[];
  private position: Position;
  private setPosition: React.Dispatch<React.SetStateAction<Position>>;
  private team: team;

  constructor(
    Chessboard: React.RefObject<HTMLDivElement>,
    Promotion: React.RefObject<HTMLDivElement>,
    team: team,
    Pieces: Piece[],
    setPieces: React.Dispatch<React.SetStateAction<Piece[]>>,
    ActivePiece: HTMLElement | null,
    setActivePiece: React.Dispatch<React.SetStateAction<HTMLElement | null>>,
    PromotePawn: Piece | null,
    setPromotePawn: React.Dispatch<React.SetStateAction<Piece | null>>,
    position: Position,
    setPosition: React.Dispatch<React.SetStateAction<Position>>
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

    this.position = position;
    this.setPosition = setPosition;
  }

  promotePawn(rank: rank): void {
    const newPieces = this.Pieces.reduce((pieces, piece) => {
      if (
        this.PromotePawn &&
        piece.pos.col === this.PromotePawn.pos.col &&
        piece.pos.row === this.PromotePawn.pos.row
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
    }, [] as Piece[]);

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

    this.setPosition({
      col: Math.floor((e.clientX - chessboard.offsetLeft) / 100),
      row: Math.floor((e.clientY - chessboard.offsetTop) / 100),
    });

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
      (p: Piece) =>
        p.pos.col === this.position.col && p.pos.row === this.position.row
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

      const newPieces: Piece[] = this.Pieces.reduce(
        (pieces: Piece[], piece: Piece) => {
          if (currentPiece === piece) {
            piece.pos.col = gridX;
            piece.pos.row = gridY;
            if (rule.isPromotable(piece)) {
              this.Promotion.current?.classList.remove("hidden");
              this.setPromotePawn(piece);
            }
            if (rule.isCastling(piece, gridX, gridY)) {
            }
            pieces.push(piece);
          } else if (piece.pos.col === gridX && piece.pos.row === gridY) {
            piece.pos.col = 100;
            piece.pos.row = 100;
            pieces.push(piece);
          } else {
            pieces.push(piece);
          }

          return pieces;
        },
        [] as Piece[]
      );

      this.setPieces(newPieces);
      socket.emit("players_turn", { pieces: this.Pieces, room: 10 });
    }

    this.setActivePiece(null);
  }
}
