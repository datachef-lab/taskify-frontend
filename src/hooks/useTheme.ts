import { useContext } from "react";
import { ThemeProviderContext } from "@/providers/ThemeProvider";

export const useTheme = () => {
    const context = useContext(ThemeProviderContext);

    if (context === undefined) {
        console.error("useTheme must be used within a ThemeProvider");
        // Return a fallback to prevent runtime errors
        return {
            theme: "dark",
            setTheme: (theme: "light" | "dark" | "system") => {
                console.warn("ThemeProvider not found, theme change ignored:", theme);
            }
        };
    }

    return context;
};