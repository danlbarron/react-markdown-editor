import { useEffect } from "react";

export default function useAutoThemePrism(isDarkTheme: boolean) {
    useEffect(() => {
        const theme = {
            dark: 'prism-vsc-dark-plus',
            light: 'prism-vs'
        } as const;

        const prismThemeElement = document.getElementById('prism-theme') as HTMLLinkElement;
        prismThemeElement.href = `https://cdn.jsdelivr.net/npm/prism-themes@1.9.0/themes/${isDarkTheme ? theme.dark : theme.light}.min.css`;
    }, [isDarkTheme]);
}