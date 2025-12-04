import {
  applyPlayerAction,
  createInitialGameState,
  getCumulativeRevenues,
  type GameState,
  type PlayerAction,
} from "@/game/perfectCompetitionGame";
import { useMemo, useState } from "react";

export function useGameState() {
  const [state, setState] = useState<GameState>(() => createInitialGameState());

  const isGameOver = state.roundIndex >= state.maxRounds;
  const cumulative = useMemo(
    () => getCumulativeRevenues(state.history),
    [state.history],
  );
  const totalPlayerRevenue =
    cumulative.player.length > 0
      ? cumulative.player[cumulative.player.length - 1]!
      : 0;

  const totalCompetitorRevenue =
    cumulative.competitor.length > 0
      ? cumulative.competitor[cumulative.competitor.length - 1]!
      : 0;

  const handleAction = (action: PlayerAction) => {
    setState((current) => applyPlayerAction(current, action));
  };

  const handleReset = () => {
    setState(createInitialGameState());
  };

  const latestRound = state.history[state.history.length - 1];

  return {
    state,
    isGameOver,
    cumulative,
    totalPlayerRevenue,
    totalCompetitorRevenue,
    latestRound,
    handleAction,
    handleReset,
  };
}
