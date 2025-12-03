import type { RoundResult } from "@/game/perfectCompetitionGame";

export function describeLastRound(lastRound: RoundResult | undefined): string {
  if (!lastRound) {
    return "No rounds played yet. Choose an action to begin.";
  }

  return `Round ${lastRound.roundIndex}: You served ${lastRound.playerCustomers} customer(s), earning $${lastRound.playerRevenue.toFixed(2)}. The competitor served ${lastRound.competitorCustomers} customer(s), and ${lastRound.noPurchaseCustomers} customer(s) did not buy from anyone.`;
}

