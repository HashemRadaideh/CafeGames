const Rank = {
  Bishop: "bishop",
  King: "king",
  Knight: "knight",
  Pawn: "pawn",
  Queen: "queen",
  Rook: "rook",
  None: "None",
} as const;

export type rank = keyof typeof Rank;

const TeamType = {
  Black: "black",
  White: "white",
  None: "None",
} as const;

export type Team = keyof typeof TeamType;

export interface PieceProps {
  img: string;
  pos: Position;
  team: Team;
  rank: rank;
}

export interface TileProps {
  team: Team;
  pos: Position;
  color1?: string;
  color2?: string;
  piece?: PieceProps;
}

export interface Position {
  col: number;
  row: number;
}
