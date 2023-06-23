import { team } from "./logic/constants";
import Controller from "./logic/controller";

interface PanelProps {
  controller: Controller;
  team: team;
}

export default function Panel({ controller, team }: PanelProps): JSX.Element {
  const color = team === "White" ? "white" : "black";

  return (
    <div className="body">
      <img
        onClick={() => controller.promotePawn("Bishop")}
        src={`./assets/${color}-bishop.png`}
      />
      <img
        onClick={() => controller.promotePawn("Knight")}
        src={`./assets/${color}-knight.png`}
      />
      <img
        onClick={() => controller.promotePawn("Queen")}
        src={`./assets/${color}-queen.png`}
      />
      <img
        onClick={() => controller.promotePawn("Rook")}
        src={`./assets/${color}-rook.png`}
      />
    </div>
  );
}
