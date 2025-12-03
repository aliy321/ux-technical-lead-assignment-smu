"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RevenueLineChart } from "@/components/revenue-line-chart";
import { useGameState } from "@/hooks/use-game-state";
import { describeLastRound } from "@/lib/game-utils";

export default function Home() {
  const {
    state,
    isGameOver,
    cumulative,
    totalPlayerRevenue,
    totalCompetitorRevenue,
    latestRound,
    handleAction,
    handleReset,
  } = useGameState();

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 px-4 py-8 font-sans text-zinc-900">
      <main className="mx-auto flex w-full max-w-3xl flex-col gap-8 rounded-xl bg-white p-6 shadow-sm">
        <section className="space-y-2">
          <h1 className="text-2xl font-semibold">
            Perfect Competition: Location and Pricing Game
          </h1>
          <p className="text-sm text-zinc-600">
            You are a vendor competing with another vendor along a 10km line.
            Each round, adjust your price or move your stall to maximise your
            revenue. Customers always choose the nearest affordable vendor.
          </p>
        </section>

        <section className="grid gap-6 md:grid-cols-2">
          <div className="space-y-3 rounded-lg border border-zinc-200 p-4">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-500">
              Rounds played
            </h2>
            <p className="text-lg font-medium">
              {state.roundIndex} / {state.maxRounds}
            </p>
            <p className="text-sm text-zinc-600">
              {isGameOver
                ? "All rounds complete. Review your results below."
                : `Next action will be round ${state.roundIndex + 1}.`}
            </p>
          </div>

          <div className="space-y-3 rounded-lg border border-zinc-200 p-4">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-500">
              Market overview
            </h2>
            <dl className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <dt className="text-zinc-500">Your position</dt>
                <dd className="font-medium">{state.player.positionKm} km</dd>
              </div>
              <div>
                <dt className="text-zinc-500">Competitor position</dt>
                <dd className="font-medium">{state.competitor.positionKm} km</dd>
              </div>
              <div>
                <dt className="text-zinc-500">Your price</dt>
                <dd className="font-medium">${state.player.price}</dd>
              </div>
              <div>
                <dt className="text-zinc-500">Competitor price</dt>
                <dd className="font-medium">${state.competitor.price}</dd>
              </div>
            </dl>
            <p className="text-xs text-zinc-500">
              There are 9 customers spread evenly between 1 km and 9 km. Each
              customer&apos;s willingness to pay decreases by $1 for every 1 km
              they are away from a vendor.
            </p>
          </div>
        </section>

        <section className="space-y-3 rounded-lg border border-zinc-200 p-4">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-500">
            Choose your action
          </h2>
          <p className="text-sm text-zinc-600">
            Select exactly one action each round. Customers then decide which
            vendor to buy from (if any) based on distance and price.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button
              type="button"
              disabled={isGameOver}
              onClick={() => handleAction("price_up")}
              variant="outline"
            >
              Increase price by $1
            </Button>
            <Button
              type="button"
              disabled={isGameOver}
              onClick={() => handleAction("price_down")}
              variant="outline"
            >
              Decrease price by $1
            </Button>
            <Button
              type="button"
              disabled={isGameOver}
              onClick={() => handleAction("move_left")}
              variant="outline"
            >
              Move 1km left
            </Button>
            <Button
              type="button"
              disabled={isGameOver}
              onClick={() => handleAction("move_right")}
              variant="outline"
            >
              Move 1km right
            </Button>
          </div>
          {isGameOver && (
            <p className="text-sm text-amber-600">
              You have completed all {state.maxRounds} rounds. Review your
              results below or reset the game to try a different strategy.
            </p>
          )}
        </section>

        <section className="space-y-3 rounded-lg border border-zinc-200 p-4">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-500">
            Round summary
          </h2>
          <p className="text-sm text-zinc-700">
            {describeLastRound(latestRound)}
          </p>
          <p className="text-sm text-zinc-700">
            Cumulative revenue so far:{" "}
            <span className="font-semibold">
              ${totalPlayerRevenue.toFixed(2)}
            </span>
            .
          </p>
        </section>

        {isGameOver && (
          <Card>
            <CardHeader>
              <div className="space-y-1.5">
                <CardTitle>End of Game Summary</CardTitle>
                <CardDescription>
                  You earned{" "}
                  <span className="font-semibold text-foreground">
                    ${totalPlayerRevenue.toFixed(2)}
                  </span>{" "}
                  vs competitor's{" "}
                  <span className="font-semibold text-foreground">
                    ${totalCompetitorRevenue.toFixed(2)}
                  </span>
                  .{" "}
                  {totalPlayerRevenue > totalCompetitorRevenue
                    ? "You won! 🎉"
                    : totalPlayerRevenue < totalCompetitorRevenue
                      ? "Competitor won."
                      : "It's a tie!"}
                </CardDescription>
              </div>
              <CardAction>
                <Button
                  type="button"
                  onClick={handleReset}
                  variant="outline"
                  size="sm"
                >
                  Reset game
                </Button>
              </CardAction>
            </CardHeader>
            <CardContent className="space-y-2">
              <RevenueLineChart
                cumulativePlayer={cumulative.player}
                cumulativeCompetitor={cumulative.competitor}
              />
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}

