const pieceType = {
  Bishop: "bishop",
  King: "king",
  Knight: "knight",
  Pawn: "pawn",
  Queen: "queen",
  Rook: "rook",
  None: "None",
} as const;

export type PieceType = keyof typeof pieceType;

const TeamType = {
  Black: "black",
  White: "white",
  None: "None",
} as const;

export type Team = keyof typeof TeamType;

export interface PieceProps {
  img: string;
  col: number;
  row: number;
  team: Team;
  type: PieceType;
}

export interface TileProps {
  team: Team;
  col: number;
  row: number;
  color1?: string;
  color2?: string;
  piece?: PieceProps;
}
