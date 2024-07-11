"use client";

import { useState, useEffect, useRef } from "react";

import CardPost from "./CardPost";

export default function CardsContainer({ posts, edit }: { posts: any[] | null, edit?: Boolean }) {
    



    const firstColumn = posts?.filter(
        (_: any, index: number) => index % 3 === 0,
    );
    const secondColumn = posts?.filter(
        (_: any, index: number) => index % 3 === 1,
    );
    const thirdColumn = posts?.filter(
        (_: any, index: number) => index % 3 === 2,
    );

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mt-20  mx-auto max-w-4xl">
            <div className="grid gap-4">
                {firstColumn?.map((post) => (
                    <CardPost key={post.id} post={post} />
                ))}
            </div>
            <div className="grid gap-4">
                {secondColumn?.map((post) => (
                    <CardPost key={post.id} post={post} />
                ))}
            </div>
            <div className="grid gap-4">
                {thirdColumn?.map((post) => (
                    <CardPost key={post.id} post={post} />
                ))}
            </div>
        </div>
    );

    return (
        <div
            className={`
                w-full grid grid-cols-1 md:grid-cols-2 gap-10
                px-10 mt-20
            `}
        >
            {posts?.map((post) => <CardPost key={post.id} post={post} />)}
        </div>
    );
}
