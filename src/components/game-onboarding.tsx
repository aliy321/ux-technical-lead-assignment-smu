"use client";

import { useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown, HelpCircle } from "lucide-react";

export function GameOnboarding() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <div className="rounded-lg border border-blue-200 bg-blue-50/50 p-4">
        <CollapsibleTrigger asChild>
          <button
            type="button"
            className="flex w-full items-center justify-between text-left hover:opacity-80 transition-opacity"
          >
            <div className="flex items-center gap-2">
              <HelpCircle className="h-5 w-5 text-blue-600" />
              <span className="font-semibold text-sm text-blue-900">
                How to Play - Click to expand
              </span>
            </div>
            <ChevronDown
              className={`h-5 w-5 text-blue-600 transition-transform duration-200 ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </button>
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-4 space-y-3 text-sm text-blue-900">
          <div className="space-y-2">
            <p className="font-semibold">🎯 Objective</p>
            <p className="text-blue-800">
              Maximize your revenue over 10 rounds by strategically positioning
              your stall and setting competitive prices along a 10km market
              line.
            </p>
          </div>

          <div className="space-y-2">
            <p className="font-semibold">👥 How Customers Decide</p>
            <ul className="space-y-1 text-blue-800 list-disc list-inside pl-2">
              <li>9 customers are positioned between 1-9km</li>
              <li>
                They buy from the <strong>nearest vendor</strong>
              </li>
              <li>
                Willingness to pay: <strong>$10 within 1km</strong>, then -$1
                per km
              </li>
              <li>Won't buy if your price exceeds their willingness</li>
              <li>If both vendors are equal distance, they buy from neither</li>
            </ul>
          </div>

          <div className="space-y-2">
            <p className="font-semibold">🎮 Your Actions (one per round)</p>
            <div className="grid grid-cols-2 gap-2">
              <div className="rounded-md bg-white/80 border border-blue-200 p-2">
                <p className="font-medium text-xs">💰 Increase Price (+$1)</p>
              </div>
              <div className="rounded-md bg-white/80 border border-blue-200 p-2">
                <p className="font-medium text-xs">💸 Decrease Price (-$1)</p>
              </div>
              <div className="rounded-md bg-white/80 border border-blue-200 p-2">
                <p className="font-medium text-xs">⬅️ Move Left (-1km)</p>
              </div>
              <div className="rounded-md bg-white/80 border border-blue-200 p-2">
                <p className="font-medium text-xs">➡️ Move Right (+1km)</p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <p className="font-semibold">🏆 Strategy Tip</p>
            <p className="text-blue-800">
              Balance proximity to customers (shorter distance = higher
              willingness to pay) with competitive pricing. Your competitor
              stays fixed at 10km with $5 price.
            </p>
          </div>
        </CollapsibleContent>
      </div>
    </Collapsible>
  );
}
