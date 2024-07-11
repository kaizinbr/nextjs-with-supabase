import "./globals.css";
import type { Metadata } from "next";
import { createClient } from "@/utils/supabase/server";


import "cal-sans";
import "@mantine/core/styles.css";

import { ColorSchemeScript, MantineProvider } from "@mantine/core";

import "@fontsource/inter/100.css";
import "@fontsource/inter/200.css";
import "@fontsource/inter/300.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import HeaderTabs from "@/components/Navbar/Navbar";

export const metadata: Metadata = {
    metadataBase: new URL("https://demos.tiptap.dev"),
    title: "Tiptap block editor template",
    description:
        "Tiptap is a suite of open source content editing and real-time collaboration tools for developers building apps like Notion or Google Docs.",
    robots: "noindex, nofollow",
    icons: [{ url: "/favicon.svg" }],
    twitter: {
        card: "summary_large_image",
        site: "@tiptap_editor",
        creator: "@tiptap_editor",
    },
    openGraph: {
        title: "Tiptap block editor template",
        description:
            "Tiptap is a suite of open source content editing and real-time collaboration tools for developers building apps like Notion or Google Docs.",
    },
};

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {



    return (
        <html className="h-full font-sans" lang="pt-br">
            <head>
                <ColorSchemeScript />
            </head>
            <body className="flex flex-col h-full bg-woodsmoke-800 text-woodsmoke-200">
                <MantineProvider>
                    <main className="h-full">{children}</main>
                </MantineProvider>
            </body>
        </html>
    );
}
