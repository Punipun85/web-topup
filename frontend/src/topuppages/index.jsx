import MLBBPage from "./mlbb";

export default function TopUpGamePage({ game, onBack }) {
  return (
    <div style={{ padding: "100px", color: "white" }}>

      {game?.id === "mlbb" && <MLBBPage onBack={onBack} />}
    </div>
  );
}
