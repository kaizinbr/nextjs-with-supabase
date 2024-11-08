"use client";

import { PenBox, Folder } from "lucide-react";
import Link from "next/link";
import { useEffect, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import { Surface } from "@/components/ui/Surface";
import { Toolbar } from "@/components/ui/Toolbar";
import { Icon } from "@/components/ui/Icon";

const useDarkmode = () => {
    const [isDarkMode, setIsDarkMode] = useState<boolean>(
        typeof window !== "undefined"
            ? window.matchMedia("(prefers-color-scheme: dark)").matches
            : false,
    );

    useEffect(() => {
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        const handleChange = () => setIsDarkMode(mediaQuery.matches);
        mediaQuery.addEventListener("change", handleChange);
        return () => mediaQuery.removeEventListener("change", handleChange);
    }, []);

    useEffect(() => {
        document.documentElement.classList.toggle("dark", isDarkMode);
    }, [isDarkMode]);

    const toggleDarkMode = useCallback(
        () => setIsDarkMode((isDark) => !isDark),
        [],
    );
    const lightMode = useCallback(() => setIsDarkMode(false), []);
    const darkMode = useCallback(() => setIsDarkMode(true), []);

    return {
        isDarkMode,
        toggleDarkMode,
        lightMode,
        darkMode,
    };
};
export default function LoggedStart({ user }: { user: any }) {
    // const { isDarkMode, darkMode, lightMode } = useDarkmode();
    return (
        <div className="flex-1 w-full flex flex-col gap-20 items-center pt-32 pb-16 lg:pt-28 px-4 relative  mx-auto max-w-4xl">
            <div className="w-full flex flex-col gap-4 z-20">
                <h1 className="text-2xl font-bold PFRegalTextPro">
                    Olá, {user.full_name}! 👋
                </h1>
            </div>
        </div>
    );
}
