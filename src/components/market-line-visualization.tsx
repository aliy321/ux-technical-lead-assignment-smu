import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface MarketLineVisualizationProps {
    playerPosition: number;
    competitorPosition: number;
    customerPositions: number[];
}

export function MarketLineVisualization({
    playerPosition,
    competitorPosition,
    customerPositions,
}: MarketLineVisualizationProps) {
    const lineLength = 10; // 10km
    const pixelsPerKm = 80; // Scale for visualization
    const totalWidth = lineLength * pixelsPerKm;

    const getPosition = (km: number) => (km / lineLength) * 100; // Returns percentage

    return (
        <ScrollArea className="w-full">
            <div
                className="relative pb-16"
                style={{ minWidth: `${totalWidth + 160}px` }}
            >
                {/* Add padding containers to ensure 0km and 10km vendors are visible */}
                <div className="relative px-20">
                    {/* Customers Row */}
                    <div
                        className="relative mb-6 flex items-center"
                        style={{ height: "48px" }}
                    >
                        <div className="relative w-full">
                            {customerPositions.map((pos) => (
                                <div
                                    key={`customer-${pos}`}
                                    className="absolute flex items-center justify-center transition-all duration-300"
                                    style={{
                                        left: `${getPosition(pos)}%`,
                                        transform: "translateX(-50%)",
                                    }}
                                >
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-100 border-2 border-zinc-300 text-lg shadow-sm">
                                        👤
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Timeline Line with Markers */}
                    <div className="relative">
                        {/* Horizontal timeline line */}
                        <div className="h-0.5 bg-border w-full" />

                        {/* Distance markers */}
                        <div className="relative w-full" style={{ height: "32px" }}>
                            {Array.from({ length: lineLength + 1 }, (_, km) => km).map(
                                (km) => (
                                    <div
                                        key={`marker-${km}`}
                                        className="absolute flex flex-col items-center"
                                        style={{
                                            left: `${getPosition(km)}%`,
                                            transform: "translateX(-50%)",
                                            top: "0px",
                                        }}
                                    >
                                        <div className="w-0.5 h-4 bg-muted-foreground/40" />
                                        <span className="mt-1 text-xs text-muted-foreground font-medium">
                                            {km}km
                                        </span>
                                    </div>
                                ),
                            )}
                        </div>
                    </div>

                    {/* Vendors Row */}
                    <div
                        className="relative -mt-3 flex items-center"
                        style={{ height: "72px" }}
                    >
                        <div className="relative w-full">
                            {/* Player Vendor */}
                            <div
                                className="absolute flex flex-col items-center transition-all duration-500 ease-out"
                                style={{
                                    left: `${getPosition(playerPosition)}%`,
                                    transform: "translateX(-50%)",
                                }}
                            >
                                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-green-500 text-2xl shadow-lg border-3 border-green-600 hover:scale-110 transition-transform">
                                    🏠
                                </div>
                                <span className="mt-2 text-xs font-bold text-green-700 bg-green-50 px-2 py-0.5 rounded-full">
                                    You
                                </span>
                            </div>

                            {/* Competitor Vendor */}
                            <div
                                className="absolute flex flex-col items-center transition-all duration-500 ease-out"
                                style={{
                                    left: `${getPosition(competitorPosition)}%`,
                                    transform: "translateX(-50%)",
                                }}
                            >
                                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-red-500 text-2xl shadow-lg border-3 border-red-600">
                                    🏠
                                </div>
                                <span className="mt-2 text-xs font-bold text-red-700 bg-red-50 px-2 py-0.5 rounded-full">
                                    Competitor
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ScrollBar orientation="horizontal" />
        </ScrollArea>
    );
}
