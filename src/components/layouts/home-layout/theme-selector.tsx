"use client";

import { useThemeConfig } from "@/providers/active-theme";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const DEFAULT_THEMES = [
  {
    name: "Default",
    value: "default",
    indicator: "⚪️",
  },
  {
    name: "Blue",
    value: "blue",
    indicator: "🔵",
  },
  {
    name: "Green",
    value: "green",
    indicator: "🟢",
  },
  {
    name: "Amber",
    value: "amber",
    indicator: "🟠",
  },
];

const SCALED_THEMES = [
  {
    name: "Default Scaled",
    value: "default-scaled",
    indicator: "⚪️+",
  },
  {
    name: "Blue Scaled",
    value: "blue-scaled",
    indicator: "🔵+",
  },
];

const MONO_THEMES = [
  {
    name: "Mono",
    value: "mono-scaled",
    indicator: "⌨️",
  },
];

export function ThemeSelector() {
  const { activeTheme, setActiveTheme } = useThemeConfig();

  // Find the current theme object
  const findThemeObject = (value: string) => {
    return [...DEFAULT_THEMES, ...SCALED_THEMES, ...MONO_THEMES].find(
      (theme) => theme.value === value
    );
  };

  const currentTheme = findThemeObject(activeTheme);

  return (
    <div className="flex items-center gap-2">
      <Label htmlFor="theme-selector" className="sr-only">
        Theme
      </Label>
      <Select value={activeTheme} onValueChange={setActiveTheme}>
        <SelectTrigger
          id="theme-selector"
          size="sm"
          className="flex justify-between items-center gap-2 min-w-[130px] sm:min-w-[160px]"
        >
          <span className="text-muted-foreground hidden sm:block flex-shrink-0">
            Theme:
          </span>
          <span className="flex items-center gap-2">
            {currentTheme?.indicator && (
              <span className="mr-1">{currentTheme.indicator}</span>
            )}
            <SelectValue placeholder="Select a theme" />
          </span>
        </SelectTrigger>
        <SelectContent align="end">
          <SelectGroup>
            <SelectLabel>Default</SelectLabel>
            {DEFAULT_THEMES.map((theme) => (
              <SelectItem key={theme.name} value={theme.value}>
                <span className="flex items-center gap-2">
                  <span>{theme.indicator}</span>
                  <span>{theme.name}</span>
                </span>
              </SelectItem>
            ))}
          </SelectGroup>
          <SelectSeparator />
          <SelectGroup>
            <SelectLabel>Scaled</SelectLabel>
            {SCALED_THEMES.map((theme) => (
              <SelectItem key={theme.name} value={theme.value}>
                <span className="flex items-center gap-2">
                  <span>{theme.indicator}</span>
                  <span>{theme.name}</span>
                </span>
              </SelectItem>
            ))}
          </SelectGroup>
          <SelectGroup>
            <SelectLabel>Monospaced</SelectLabel>
            {MONO_THEMES.map((theme) => (
              <SelectItem key={theme.name} value={theme.value}>
                <span className="flex items-center gap-2">
                  <span>{theme.indicator}</span>
                  <span>{theme.name}</span>
                </span>
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
