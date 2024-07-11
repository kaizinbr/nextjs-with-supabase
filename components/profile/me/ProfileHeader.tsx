"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function ProfileHeader(session: any, userData: any) {
    const data = userData.userData;
    console.log(data);

    return (
        <div
            className={`
            
            w-full rounded-lg overflow-hidden
            flex flex-row
            z-10 relative mt-12 px-6

        `}
        >
            <div className="bgPfp flex flex-col justify-center items-start relative">
                <Image
                    src={session?.user?.image!}
                    width={200}
                    height={200}
                    alt={`Profile picture of ${session?.user?.name}`}
                    className={`
                        rounded-full
                        h-32 w-32
                    `}
                />
            </div>
            <div className="flex flex-col justify-start items-start ml-6">
                <h1 className="text-4xl displayExtBold mt-2">
                    {session?.user?.name}
                </h1>
                <h2 className="text-base displayMedium text-gray-600 ">
                    @{session?.user?.username}
                </h2>
                <div className={`
                        flex flex-row gap-6 justify-center items-center mt-2
                        text-gray-800 text-sm
                    `}>
                    {data?.user?.pronous ? (
                        <Link
                            // href={`/profile/${session?.user?.username}/following`}
                            href={`#`}
                            id="pronous"
                        >
                            {data?.userProfile?.pronous!}
                        </Link>
                    ) : null}
                    {data?.user?.createdAt ? (
                        <Link
                            // href={`/profile/${session?.user?.username}/following`}
                            href={`#`}
                            id="pronous"
                        >
                            Entrou em{" "}
                            {new Date(data?.user?.createdAt).getUTCFullYear()}
                        </Link>
                    ) : null}
                    {data?.user?.posts ? (
                        <Link
                            // href={`/profile/${session?.user?.username}/following`}
                            href={`#`}
                            id="pronous"
                            className="flex flex-row items-center hover:text-violet-500 transition-all"
                        >
                            {data?.user?.posts?.length} Posts
                        </Link>
                    ) : null}
                </div>
            </div>
        </div>
    );
}
