"use client";
import { ReactLenis, useLenis } from "lenis/react";

export default function SmoothWrapper({
    children,
}: {
    children: React.ReactNode;
}) {
    const lenis = useLenis(({ scroll }) => {
        // called every scroll
    });

    return (
        <ReactLenis root options={{ lerp: 0.1, duration: 1.5 }}>
            {children}
        </ReactLenis>
    );
}
