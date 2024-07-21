const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
        "./pages/**/*.{ts,tsx}",
        "./components/**/*.{ts,tsx}",
        "./app/**/*.{ts,tsx}",
        "./src/**/*.{ts,tsx}",
    ],
    safelist: ["ProseMirror"],
    theme: {
        extend: {
            fontFamily: {
                sans: ["Inter", ...defaultTheme.fontFamily.sans],
                gelica: ["Gelica", ...defaultTheme.fontFamily.serif],
            },
            colors: {
                woodsmoke: {
                    50: "#f6f6f6",
                    100: "#e7e7e7",
                    200: "#d1d1d1",
                    300: "#9C9C9C",
                    400: "#888888",
                    500: "#6A6A6A",
                    550: "#5B5B5B",
                    600: "#383838",
                    700: "#282828",
                    800: "#181818",
                    900: "#0c0c0c",
                    950: "#080808",
                },
            },
        },
    },
    plugins: [
        require("tailwindcss-animate"),
        require("@tailwindcss/typography"),
    ],
};
