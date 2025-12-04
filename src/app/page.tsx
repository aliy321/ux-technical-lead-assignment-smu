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
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { RevenueLineChart } from "@/components/revenue-line-chart";
import { MarketLineVisualization } from "@/components/market-line-visualization";
import { GameOnboarding } from "@/components/game-onboarding";
import { useGameState } from "@/hooks/use-game-state";
import { describeLastRound } from "@/lib/game-utils";
import { Separator } from "@/components/ui/separator";

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
    <main className="min-h-screen bg-zinc-50 px-4 py-6 sm:py-8 font-sans text-zinc-900">
      <section className="container mx-auto max-w-4xl space-y-6 sm:space-y-8">
        <section className="rounded-xl bg-white p-4 sm:p-6 shadow-sm space-y-6 sm:space-y-8">
          <section className="space-y-2">
            <h1 className="text-2xl font-semibold">
              Location and Pricing Game
            </h1>
            <p className="text-sm text-zinc-600">
              You are a vendor competing with another vendor along a 10km line.
              Each round, adjust your price or move your stall to maximise your
              revenue. Customers always choose the nearest affordable vendor.
            </p>
          </section>

          <GameOnboarding />

          <section className="rounded-lg border border-zinc-200 bg-white p-4">
            <MarketLineVisualization
              playerPosition={state.player.positionKm}
              competitorPosition={state.competitor.positionKm}
              customerPositions={state.customers.map((c) => c.positionKm)}
            />
          </section>

          <section className="gap-6 flex flex-col md:flex-row">
            {/* Rounds Progress */}
            <div className="space-y-4 rounded-lg border border-zinc-200 p-4 bg-linear-to-br from-white to-zinc-50">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-500">
                  Game Progress
                </h2>
                <Badge variant={isGameOver ? "default" : "secondary"}>
                  {isGameOver ? "Complete" : "In Progress"}
                </Badge>
              </div>

              <div className="space-y-2">
                <div className="flex items-baseline justify-between">
                  <p className="text-3xl font-bold text-zinc-900">
                    {state.roundIndex}
                    <span className="text-lg text-zinc-500 font-normal">
                      {" "}
                      / {state.maxRounds}
                    </span>
                  </p>
                  <p className="text-sm text-zinc-600">
                    {Math.round((state.roundIndex / state.maxRounds) * 100)}%
                  </p>
                </div>

                <Progress
                  value={(state.roundIndex / state.maxRounds) * 100}
                  className="h-2"
                />

                <p className="text-sm text-zinc-600 pt-1">
                  {isGameOver
                    ? "🎉 All rounds complete! Check your results below."
                    : `⚡ Next: Round ${state.roundIndex + 1}`}
                </p>
              </div>
            </div>

            {/* Market Stats */}
            <div className="flex-1 space-y-4 rounded-lg border border-zinc-200 p-4 bg-linear-to-br from-white to-zinc-50">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-500">
                Market Overview
              </h2>

              <div className="flex h-5 items-center space-x-4 text-sm">
                <div className="font-bold w-full text-center">
                  Your Position
                </div>
                <Separator orientation="vertical" />
                <div className="w-full text-center">
                  {state.player.positionKm} km
                </div>
                <Separator orientation="vertical" />
                <div className="font-bold w-full text-center">Your Price</div>
                <Separator orientation="vertical" />
                <div className="w-full text-center">
                  ${state.competitor.price}
                </div>
              </div>

              <Separator orientation="horizontal" />

              <div className="flex h-5 items-center space-x-4 text-sm">
                <div className="font-bold w-full text-center">
                  Competitor Position
                </div>
                <Separator orientation="vertical" />
                <div className="w-full text-center">
                  {state.competitor.positionKm} km
                </div>
                <Separator orientation="vertical" />
                <div className="font-bold w-full text-center">
                  Competitor Price
                </div>
                <Separator orientation="vertical" />
                <div className="w-full text-center">
                  ${state.competitor.price}
                </div>
              </div>
            </div>
          </section>

          <section
            className={`space-y-4 rounded-lg border p-6 transition-all ${
              !isGameOver
                ? "border-blue-200 bg-linear-to-br from-blue-50 to-white shadow-sm"
                : "border-zinc-200 bg-zinc-50/50"
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-500">
                  Choose your action
                </h2>
                {/* {!isGameOver && (
                <p className="text-xs text-blue-600 font-medium mt-1">
                  ⚡ Round {state.roundIndex + 1} - Make your move!
                </p>
              )} */}
              </div>
              {/* {!isGameOver && (
              <Badge variant="outline" className="border-blue-300 text-blue-700">
                Your Turn
              </Badge>
            )} */}
            </div>

            <p className="text-xs sm:text-sm text-zinc-600">
              Select one action. Customers buy from the nearest affordable
              vendor.
            </p>

            <div className="grid grid-cols-2 gap-2 sm:gap-3">
              <Button
                type="button"
                disabled={isGameOver}
                onClick={() => handleAction("price_up")}
                variant="outline"
                className="h-auto py-2 sm:py-3 flex-col items-start"
              >
                <span className="text-sm sm:text-base font-semibold">
                  💰 Increase Price
                </span>
                <span className="text-xs text-muted-foreground">
                  +$1 per sale
                </span>
              </Button>

              <Button
                type="button"
                disabled={isGameOver}
                onClick={() => handleAction("price_down")}
                variant="outline"
                className="h-auto py-2 sm:py-3 flex-col items-start"
              >
                <span className="text-sm sm:text-base font-semibold">
                  💸 Decrease Price
                </span>
                <span className="text-xs text-muted-foreground">
                  -$1 per sale
                </span>
              </Button>

              <Button
                type="button"
                disabled={isGameOver}
                onClick={() => handleAction("move_left")}
                variant="outline"
                className="h-auto py-2 sm:py-3 flex-col items-start"
              >
                <span className="text-sm sm:text-base font-semibold">
                  ⬅️ Move Left
                </span>
                <span className="text-xs text-muted-foreground">
                  -1km position
                </span>
              </Button>

              <Button
                type="button"
                disabled={isGameOver}
                onClick={() => handleAction("move_right")}
                variant="outline"
                className="h-auto py-2 sm:py-3 flex-col items-start"
              >
                <span className="text-sm sm:text-base font-semibold">
                  ➡️ Move Right
                </span>
                <span className="text-xs text-muted-foreground">
                  +1km position
                </span>
              </Button>
            </div>

            {isGameOver && (
              <div className="bg-amber-50 border border-amber-200 rounded-md p-3">
                <p className="text-sm text-amber-800">
                  ✓ Game complete! Review your results below or reset to try
                  again.
                </p>
              </div>
            )}
          </section>

          <section className="space-y-3 rounded-lg border border-zinc-200 p-4 bg-white">
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
                    variant="destructive"
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
        </section>
      </section>
    </main>
  );
}
