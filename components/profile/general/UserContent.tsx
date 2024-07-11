"use client";

import React, { useRef, useEffect, useState } from "react";
import Posts from "./Posts";
import Bio from "./Bio";

export default function UserContent({
    POSTS,
    RESPONSES,
    userData,
    isItMe,
}: {
    POSTS: any[];
    RESPONSES: any[];
    userData: any;
    isItMe: boolean;
}) {
    const [tab, setTab] = useState("posts");
    return (
        <div className="">
            <Bio userData={userData} isItMe={isItMe} setTab={setTab} tab={tab} />
            {/* <div className="fixed top-3 left-3 right-3 flex items-center justify-center">
                <Tabs />
            </div> */}
            <div className="">
                {tab === "posts" ? (
                    <Posts data={POSTS} />
                ) : (
                    <Posts data={RESPONSES}/>
                )}
            </div>
        </div>
    )
}
