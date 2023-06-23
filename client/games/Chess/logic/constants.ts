export interface Position {
  col: number;
  row: number;
}

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

export type team = keyof typeof TeamType;

export interface Piece {
  img: string;
  pos: Position;
  team: team;
  rank: rank;
}
