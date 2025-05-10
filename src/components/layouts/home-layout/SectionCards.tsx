import { TrendingDownIcon, TrendingUpIcon } from "lucide-react";
import { useThemeConfig } from "@/providers/ActiveTheme";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Theme-specific color classes for cards
const themeCardClasses = {
  default: [
    "bg-gradient-to-br from-purple-500/20 to-indigo-600/20 dark:from-purple-800/30 dark:to-indigo-700/30 border-purple-200 dark:border-purple-800/40",
    "bg-gradient-to-br from-blue-500/20 to-cyan-600/20 dark:from-blue-800/30 dark:to-cyan-700/30 border-blue-200 dark:border-blue-800/40",
    "bg-gradient-to-br from-emerald-500/20 to-teal-600/20 dark:from-emerald-800/30 dark:to-teal-700/30 border-emerald-200 dark:border-emerald-800/40",
    "bg-gradient-to-br from-amber-500/20 to-orange-600/20 dark:from-amber-800/30 dark:to-orange-700/30 border-amber-200 dark:border-amber-800/40",
  ],
  blue: [
    "bg-gradient-to-br from-blue-500/20 to-indigo-600/20 dark:from-blue-800/30 dark:to-indigo-700/30 border-blue-200 dark:border-blue-800/40",
    "bg-gradient-to-br from-cyan-500/20 to-blue-600/20 dark:from-cyan-800/30 dark:to-blue-700/30 border-cyan-200 dark:border-cyan-800/40",
    "bg-gradient-to-br from-indigo-500/20 to-violet-600/20 dark:from-indigo-800/30 dark:to-violet-700/30 border-indigo-200 dark:border-indigo-800/40",
    "bg-gradient-to-br from-sky-500/20 to-blue-600/20 dark:from-sky-800/30 dark:to-blue-700/30 border-sky-200 dark:border-sky-800/40",
  ],
  green: [
    "bg-gradient-to-br from-emerald-500/20 to-green-600/20 dark:from-emerald-800/30 dark:to-green-700/30 border-emerald-200 dark:border-emerald-800/40",
    "bg-gradient-to-br from-green-500/20 to-teal-600/20 dark:from-green-800/30 dark:to-teal-700/30 border-green-200 dark:border-green-800/40",
    "bg-gradient-to-br from-teal-500/20 to-cyan-600/20 dark:from-teal-800/30 dark:to-cyan-700/30 border-teal-200 dark:border-teal-800/40",
    "bg-gradient-to-br from-lime-500/20 to-green-600/20 dark:from-lime-800/30 dark:to-green-700/30 border-lime-200 dark:border-lime-800/40",
  ],
  amber: [
    "bg-gradient-to-br from-amber-500/20 to-orange-600/20 dark:from-amber-800/30 dark:to-orange-700/30 border-amber-200 dark:border-amber-800/40",
    "bg-gradient-to-br from-orange-500/20 to-red-600/20 dark:from-orange-800/30 dark:to-red-700/30 border-orange-200 dark:border-orange-800/40",
    "bg-gradient-to-br from-yellow-500/20 to-amber-600/20 dark:from-yellow-800/30 dark:to-amber-700/30 border-yellow-200 dark:border-yellow-800/40",
    "bg-gradient-to-br from-red-500/20 to-rose-600/20 dark:from-red-800/30 dark:to-rose-700/30 border-red-200 dark:border-red-800/40",
  ],
};

// Badge color classes by theme
const themeBadgeClasses = {
  default: [
    "bg-purple-100 text-purple-700 border-purple-300 dark:bg-purple-900/40 dark:text-purple-200 dark:border-purple-700",
    "bg-blue-100 text-blue-700 border-blue-300 dark:bg-blue-900/40 dark:text-blue-200 dark:border-blue-700",
    "bg-emerald-100 text-emerald-700 border-emerald-300 dark:bg-emerald-900/40 dark:text-emerald-200 dark:border-emerald-700",
    "bg-amber-100 text-amber-700 border-amber-300 dark:bg-amber-900/40 dark:text-amber-200 dark:border-amber-700",
  ],
  blue: [
    "bg-blue-100 text-blue-700 border-blue-300 dark:bg-blue-900/40 dark:text-blue-200 dark:border-blue-700",
    "bg-cyan-100 text-cyan-700 border-cyan-300 dark:bg-cyan-900/40 dark:text-cyan-200 dark:border-cyan-700",
    "bg-indigo-100 text-indigo-700 border-indigo-300 dark:bg-indigo-900/40 dark:text-indigo-200 dark:border-indigo-700",
    "bg-sky-100 text-sky-700 border-sky-300 dark:bg-sky-900/40 dark:text-sky-200 dark:border-sky-700",
  ],
  green: [
    "bg-emerald-100 text-emerald-700 border-emerald-300 dark:bg-emerald-900/40 dark:text-emerald-200 dark:border-emerald-700",
    "bg-green-100 text-green-700 border-green-300 dark:bg-green-900/40 dark:text-green-200 dark:border-green-700",
    "bg-teal-100 text-teal-700 border-teal-300 dark:bg-teal-900/40 dark:text-teal-200 dark:border-teal-700",
    "bg-lime-100 text-lime-700 border-lime-300 dark:bg-lime-900/40 dark:text-lime-200 dark:border-lime-700",
  ],
  amber: [
    "bg-amber-100 text-amber-700 border-amber-300 dark:bg-amber-900/40 dark:text-amber-200 dark:border-amber-700",
    "bg-orange-100 text-orange-700 border-orange-300 dark:bg-orange-900/40 dark:text-orange-200 dark:border-orange-700",
    "bg-yellow-100 text-yellow-700 border-yellow-300 dark:bg-yellow-900/40 dark:text-yellow-200 dark:border-yellow-700",
    "bg-red-100 text-red-700 border-red-300 dark:bg-red-900/40 dark:text-red-200 dark:border-red-700",
  ],
};

export function SectionCards() {
  const { activeTheme } = useThemeConfig();

  // Get the base theme name
  const getThemeBase = () => {
    const baseTheme = activeTheme.split("-")[0]; // Handle scaled variants
    return themeCardClasses[baseTheme as keyof typeof themeCardClasses]
      ? baseTheme
      : "default";
  };

  const themeBase = getThemeBase();
  const cardClasses =
    themeCardClasses[themeBase as keyof typeof themeCardClasses];
  const badgeClasses =
    themeBadgeClasses[themeBase as keyof typeof themeBadgeClasses];

  return (
    <div className="*:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-4 grid grid-cols-1 gap-4 px-4 lg:px-6">
      <Card className={`@container/card ${cardClasses[0]}`}>
        <CardHeader className="relative">
          <CardDescription className="text-purple-700 dark:text-purple-300">
            Total Revenue
          </CardDescription>
          <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums text-purple-950 dark:text-purple-100">
            $1,250.00
          </CardTitle>
          <div className="absolute right-4 top-4">
            <Badge
              variant="outline"
              className={`flex gap-1 rounded-lg text-xs ${badgeClasses[0]}`}
            >
              <TrendingUpIcon className="size-3 text-green-600 dark:text-green-400" />
              +12.5%
            </Badge>
          </div>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium text-purple-800 dark:text-purple-200">
            Trending up this month{" "}
            <TrendingUpIcon className="size-4 text-green-600 dark:text-green-400" />
          </div>
          <div className="text-purple-600 dark:text-purple-400">
            Visitors for the last 6 months
          </div>
        </CardFooter>
      </Card>
      <Card className={`@container/card ${cardClasses[1]}`}>
        <CardHeader className="relative">
          <CardDescription className="text-blue-700 dark:text-blue-300">
            New Customers
          </CardDescription>
          <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums text-blue-950 dark:text-blue-100">
            1,234
          </CardTitle>
          <div className="absolute right-4 top-4">
            <Badge
              variant="outline"
              className={`flex gap-1 rounded-lg text-xs ${badgeClasses[1]}`}
            >
              <TrendingDownIcon className="size-3 text-red-600 dark:text-red-400" />
              -20%
            </Badge>
          </div>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium text-blue-800 dark:text-blue-200">
            Down 20% this period{" "}
            <TrendingDownIcon className="size-4 text-red-600 dark:text-red-400" />
          </div>
          <div className="text-blue-600 dark:text-blue-400">
            Acquisition needs attention
          </div>
        </CardFooter>
      </Card>
      <Card className={`@container/card ${cardClasses[2]}`}>
        <CardHeader className="relative">
          <CardDescription className="text-emerald-700 dark:text-emerald-300">
            Active Accounts
          </CardDescription>
          <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums text-emerald-950 dark:text-emerald-100">
            45,678
          </CardTitle>
          <div className="absolute right-4 top-4">
            <Badge
              variant="outline"
              className={`flex gap-1 rounded-lg text-xs ${badgeClasses[2]}`}
            >
              <TrendingUpIcon className="size-3 text-green-600 dark:text-green-400" />
              +12.5%
            </Badge>
          </div>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium text-emerald-800 dark:text-emerald-200">
            Strong user retention{" "}
            <TrendingUpIcon className="size-4 text-green-600 dark:text-green-400" />
          </div>
          <div className="text-emerald-600 dark:text-emerald-400">
            Engagement exceed targets
          </div>
        </CardFooter>
      </Card>
      <Card className={`@container/card ${cardClasses[3]}`}>
        <CardHeader className="relative">
          <CardDescription className="text-amber-700 dark:text-amber-300">
            Growth Rate
          </CardDescription>
          <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums text-amber-950 dark:text-amber-100">
            4.5%
          </CardTitle>
          <div className="absolute right-4 top-4">
            <Badge
              variant="outline"
              className={`flex gap-1 rounded-lg text-xs ${badgeClasses[3]}`}
            >
              <TrendingUpIcon className="size-3 text-green-600 dark:text-green-400" />
              +4.5%
            </Badge>
          </div>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium text-amber-800 dark:text-amber-200">
            Steady performance{" "}
            <TrendingUpIcon className="size-4 text-green-600 dark:text-green-400" />
          </div>
          <div className="text-amber-600 dark:text-amber-400">
            Meets growth projections
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
