export interface Vendor {
  id: "player" | "competitor";
  positionKm: number;
  price: number;
}

export interface Customer {
  positionKm: number;
}

export interface RoundResult {
  roundIndex: number;
  playerCustomers: number;
  competitorCustomers: number;
  noPurchaseCustomers: number;
  playerRevenue: number;
  competitorRevenue: number;
}

export interface GameState {
  roundIndex: number;
  readonly maxRounds: number;
  readonly customers: Customer[];
  readonly competitor: Vendor;
  player: Vendor;
  history: RoundResult[];
}

export type PlayerAction =
  | "price_up"
  | "price_down"
  | "move_left"
  | "move_right";

export function createInitialGameState(): GameState {
  const customers: Customer[] = Array.from({ length: 9 }, (_value, index) => ({
    positionKm: index + 1,
  }));

  const player: Vendor = {
    id: "player",
    positionKm: 0,
    price: 5,
  };

  const competitor: Vendor = {
    id: "competitor",
    positionKm: 10,
    price: 5,
  };

  return {
    roundIndex: 0,
    maxRounds: 10,
    customers,
    competitor,
    player,
    history: [],
  };
}

export function getWillingness(distanceKm: number): number {
  // Spec: "$10 if within 1 km", then -$1 per extra km.
  // Formula: min(10, max(0, 11 - distance))
  // Within 1km (distance ≤ 1) → capped at $10
  // Beyond 1km → decreases linearly
  const raw = 11 - distanceKm;
  if (raw >= 10) return 10; // cap at $10 for distance ≤ 1km
  if (raw <= 0) return 0;
  return raw;
}

interface CustomerDecisionCounts {
  player: number;
  competitor: number;
  none: number;
}

export function resolveRound(state: GameState): RoundResult {
  const counts: CustomerDecisionCounts = { player: 0, competitor: 0, none: 0 };

  for (const customer of state.customers) {
    const playerDistance = Math.abs(
      customer.positionKm - state.player.positionKm,
    );
    const competitorDistance = Math.abs(
      customer.positionKm - state.competitor.positionKm,
    );

    if (playerDistance === competitorDistance) {
      counts.none += 1;
      continue;
    }

    const nearest: Vendor =
      playerDistance < competitorDistance ? state.player : state.competitor;
    const distanceToNearest =
      nearest.id === "player" ? playerDistance : competitorDistance;
    const willingness = getWillingness(distanceToNearest);

    if (nearest.price <= willingness) {
      if (nearest.id === "player") {
        counts.player += 1;
      } else {
        counts.competitor += 1;
      }
    } else {
      counts.none += 1;
    }
  }

  const playerRevenue = counts.player * state.player.price;
  const competitorRevenue = counts.competitor * state.competitor.price;

  return {
    roundIndex: state.roundIndex + 1,
    playerCustomers: counts.player,
    competitorCustomers: counts.competitor,
    noPurchaseCustomers: counts.none,
    playerRevenue,
    competitorRevenue,
  };
}

function applyMovement(
  positionKm: number,
  direction: "left" | "right",
): number {
  const delta = direction === "left" ? -1 : 1;
  const next = positionKm + delta;
  if (next < 0) return 0;
  if (next > 10) return 10;
  return next;
}

function applyPriceChange(price: number, direction: "up" | "down"): number {
  const delta = direction === "up" ? 1 : -1;
  const next = price + delta;
  return next < 0 ? 0 : next;
}

export function applyPlayerAction(
  state: GameState,
  action: PlayerAction,
): GameState {
  if (state.roundIndex >= state.maxRounds) {
    return state;
  }

  const nextPlayer: Vendor = { ...state.player };

  if (action === "move_left") {
    nextPlayer.positionKm = applyMovement(state.player.positionKm, "left");
  } else if (action === "move_right") {
    nextPlayer.positionKm = applyMovement(state.player.positionKm, "right");
  } else if (action === "price_up") {
    nextPlayer.price = applyPriceChange(state.player.price, "up");
  } else if (action === "price_down") {
    nextPlayer.price = applyPriceChange(state.player.price, "down");
  }

  const intermediateState: GameState = {
    ...state,
    player: nextPlayer,
  };

  const roundResult = resolveRound(intermediateState);

  return {
    ...intermediateState,
    roundIndex: roundResult.roundIndex,
    history: [...state.history, roundResult],
  };
}

export function getCumulativeRevenues(history: RoundResult[]): {
  player: number[];
  competitor: number[];
} {
  const cumulativePlayer: number[] = [];
  const cumulativeCompetitor: number[] = [];

  let runningPlayer = 0;
  let runningCompetitor = 0;

  for (const round of history) {
    runningPlayer += round.playerRevenue;
    runningCompetitor += round.competitorRevenue;
    cumulativePlayer.push(runningPlayer);
    cumulativeCompetitor.push(runningCompetitor);
  }

  return { player: cumulativePlayer, competitor: cumulativeCompetitor };
}
