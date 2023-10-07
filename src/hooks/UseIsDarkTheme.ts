import { useEffect, useState } from "react";

export default function useIsDarkTheme(): boolean {
    const [isDarkTheme, setIsDarkTheme] = useState(true);

    useEffect(() => {
        const darkThemePreference = window.matchMedia('(prefers-color-scheme: dark)');
        setIsDarkTheme(darkThemePreference.matches)

        const handleChange = (e: MediaQueryListEvent) => setIsDarkTheme(e.matches);
        darkThemePreference.addEventListener('change', handleChange);

        return () => darkThemePreference.removeEventListener('change', handleChange);
    }, []);

    return isDarkTheme;
}