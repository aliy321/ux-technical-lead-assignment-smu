"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

interface RevenueLineChartProps {
  cumulativePlayer: number[];
  cumulativeCompetitor: number[];
}

const chartConfig = {
  player: {
    label: "Player",
    color: "var(--chart-1)",
  },
  competitor: {
    label: "Competitor",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

export function RevenueLineChart({
  cumulativePlayer,
  cumulativeCompetitor,
}: RevenueLineChartProps) {
  if (cumulativePlayer.length === 0) {
    return null;
  }

  const chartData = cumulativePlayer.map((playerRevenue, index) => ({
    round: index + 1,
    player: playerRevenue,
    competitor: cumulativeCompetitor[index] || 0,
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Cumulative Revenue Comparison</CardTitle>
        <CardDescription>Player vs Competitor across 10 rounds</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="round"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Line
              dataKey="player"
              type="monotone"
              stroke="var(--color-player)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="competitor"
              type="monotone"
              stroke="var(--color-competitor)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="text-muted-foreground leading-none text-center text-xs text-balance">
          This chart visualizes how cumulative revenue evolved for both vendors
          as pricing and location decisions were made each round.
        </div>
      </CardFooter>
    </Card>
  );
}
