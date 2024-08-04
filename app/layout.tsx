import "./globals.css";
import type { Metadata } from "next";
import { createClient } from "@/utils/supabase/server";

import localFont from "next/font/local";


import "cal-sans";
import "@mantine/core/styles.css";

import { ColorSchemeScript, MantineProvider } from "@mantine/core";


import SmoothWrapper from "@/components/SmoothWrapper";

import "@fontsource/inter/100.css";
import "@fontsource/inter/200.css";
import "@fontsource/inter/300.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import HeaderTabs from "@/components/Navbar/Navbar";

export const metadata: Metadata = {
    title: "Kaizin",
    description: "Portfólio de Kaio Lucas, desenvolvedor front end e designer.",	
    metadataBase: new URL("http://localhost:3000"),
    // openGraph: {
    //     type: "website",
    //     locale: "pt_BR",
    //     url: "https://kaizin.vercel.app",
    //     siteName: "Kaizin",
    //     title: "Kaizin",
    //     description: "Portfólio de Kaio Lucas, desenvolvedor front end e designer.",
    //     images: [
    //         {
    //             url: "https://kaizin.vercel.app/site-banner.png",
    //             width: 800,
    //             height: 600,
    //             alt: "Kaizin",
    //         },
    //     ],
    // },
    // twitter: {
    //     site: "kaizin",
    //     images: [
    //         {
    //             url: "https://kaizin.vercel.app/site-banner.png",
    //             width: 800,
    //             height: 600,
    //             alt: "Kaizin",
    //         },
    //     ],
    // },
//     openGraph: {
//         title: "Tiptap block editor template",
//         description:
//             "Tiptap is a suite of open source content editing and real-time collaboration tools for developers building apps like Notion or Google Docs.",
//     },

};

// Font files can be colocated inside of `app`
const myFont = localFont({
    src: "../public/fonts/font-1.ttf",
    display: "swap",
});

// export const metadata: Metadata = {
//     metadataBase: new URL("http://localhost:3000"),
//     title: "Tiptap block editor template",
//     description:
//         "Tiptap is a suite of open source content editing and real-time collaboration tools for developers building apps like Notion or Google Docs.",
//     robots: "noindex, nofollow",
//     icons: [{ url: "/favicon.svg" }],
//     twitter: {
//         card: "summary_large_image",
//         site: "@tiptap_editor",
//         creator: "@tiptap_editor",
//     },
//     openGraph: {
//         title: "Tiptap block editor template",
//         description:
//             "Tiptap is a suite of open source content editing and real-time collaboration tools for developers building apps like Notion or Google Docs.",
//     },
// };

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
            <body className={
                
                myFont.className +`
                    flex flex-col h-full text-woodsmoke-700 bg-woodsmoke-100
                `}>
                <MantineProvider>
                    {/* <SmoothWrapper> */}
                        <main className="h-full">{children}</main>
                    {/* </SmoothWrapper> */}
                </MantineProvider>
            </body>
        </html>
    );
}
