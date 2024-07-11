"use client";

import Link from "next/link";
import { ProfilePicGen } from "./ProfilePic";
import { useEffect, useState, useRef } from "react";

import Tabs from "../user/Tabs";

type userProps = {
    id: string;
    username: string;
    name: string | null;
    email: string | null;
    createdAt: Date;
    updatedAt: Date;
    Profile: {
        id: string;
        bio: string | null;
        name: string | null;
        image: string | null;
        userId: string;
        pronouns: string | null;
    } | null;
    posts: {
        id: string;
        slug: string;
        title: string | null;
        color: string | null;
        subtitle: string | null;
        tags: string | null;
        createdAt: Date;
        updatedAt: Date;
    }[];
    followers: {
        userId: string;
    }[];
    following: {
        followerId: string;
    }[];
};

export default function Bio({
    userData,
    isItMe,
    setTab,
    tab,
}: {
    userData: userProps | any;
    isItMe: boolean;
    setTab: Function;
    tab: string;
}) {
    console.log(userData.followers, "followers");
    const ProfilePicProps = {
        src: userData.Profile?.image!,
        size: 220,
        alt: `Foto de perfil de ${userData.name}`,
    };

    // checa se a bio esta visivel e ativa as tabs
    const [isVisible, setIsVisible] = useState(false);
    const targetRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting);
            },
            {
                root: null, // viewport
                rootMargin: "0px", // no margin
                threshold: 0.5, // 50% of target visible
            }
        );

        if (targetRef.current) {
            observer.observe(targetRef.current);
        }

        // Clean up the observer
        return () => {
            if (targetRef.current) {
                // eslint-disable-next-line react-hooks/exhaustive-deps
                observer.unobserve(targetRef.current);
            }
        };
    }, []);

    // console.log(isItMe, "isItMe");

    return (
        <>
            <div
                className={`
                    flex items-center justify-center
                    col-span-6 lg:col-span-4 
                    relative
                    order-1 lg:order-none w-full 
                    -top-[46.4px]
                    border-b border-neutral-800/80
                `}
                ref={targetRef}
            >
                <div
                    className={`
                        flex flex-col justify-center lg:items-center
                        
                        bg-default-fill
                        rounded-3xl lg:fixed w-full md:w-[352px] top-9
                        py-6 pt-14 px-4 gap-3
                    `}
                >
                    {/* {isItMe ? (
                        <Link href="/settings/profile">
                            <span className="text-center text-violet-500 text-sm">
                                Editar perfil
                            </span>
                        </Link>
                    ) : null} */}

                    <div
                        className={`
                        flex flex-col p-4 
                        bg-neutral-800 rounded-2xl
                    `}
                    >
                        <h2 className="text-lg font-bold">{userData.name}</h2>
                        <p className="text-sm text-neutral-400">
                            @{userData.username}
                        </p>
                        {userData.Profile?.pronouns ? (
                            <span className="text-sm text-neutral-500">
                                {userData.Profile?.pronouns!}
                            </span>
                        ) : null}

                        {isItMe ? (
                            <Link
                                href="/settings/profile"
                                className="py-2 px-4 rounded-full bg-neutral-300 mt-3 w-auto flex"
                            >
                                <span className="text-center font-bold text-neutral-800 text-base m-auto">
                                    Editar perfil
                                </span>
                            </Link>
                        ) : (
                            <Link
                                href="#"
                                className="py-2 px-4 rounded-full bg-neutral-300 mt-3 w-auto flex"
                            >
                                <span className="text-center font-bold text-neutral-800 text-base m-auto">
                                    Seguir
                                </span>
                            </Link>
                        )}
                    </div>

                    <div
                        className={`
                        
                            text-neutral-200 text-sm
                            w-full
                            flex flex-col p-4 
                            bg-neutral-800 rounded-2xl
                        `}
                    >
                        <span className="font-semibold text-neutral-400 mb-1">Bio:</span>
                        <p>{userData.Profile?.bio!}</p>
                    </div>

                    <div className={`
                        flex flex-col t w-full
                        p-4 
                        bg-neutral-800 rounded-2xl
                    `}>
                        <div
                            className={`
                                        flex flex-row gap-6 justify-around items-center
                                        text-neutral-200 text-sm
                                    `}
                        >
                            {userData.posts ? (
                                <div
                                    className="flex flex-col items-center hover:text-violet-500 transition-all"
                                >
                                    <span className={`
                                        text-2xl font-semibold
                                    `}>{userData.posts?.length} </span>{" "}
                                    <span className="text-neutral-400 ml-1">
                                        Posts
                                    </span>
                                </div>
                            ) : null}
                            {userData.followers ? (
                                <div
                                    className="flex flex-col items-center hover:text-violet-500 transition-all"
                                >
                                    <span className={`
                                        text-2xl font-semibold
                                    `}>{userData.followers?.length}</span>{" "}
                                    <span className="text-neutral-400 ml-1">
                                        Seguidores
                                    </span>
                                </div>
                            ) : null}

                            {userData.following ? (
                                <div
                                    className="flex flex-col items-center hover:text-violet-500 transition-all"
                                >
                                    <span className={`
                                        text-2xl font-semibold
                                    `}>{userData.following?.length}</span>{" "}
                                    <span className="text-neutral-400 ml-1">
                                        Seguindo
                                    </span>
                                </div>
                            ) : null}
                        </div>
                    </div>

                    <div
                        className={`
                        
                            text-neutral-200 text-sm
                            w-full
                            flex flex-col p-4 
                            bg-neutral-800 rounded-2xl
                        `}
                    >
                        <span className="font-semibold text-neutral-400 mb-1">Membro desde</span>
                        
                        {new Date(userData.createdAt).toLocaleDateString("pt-BR", {
                                                day: "numeric",
                                                month: "long",
                                                year: "numeric",
                                            })}
                    </div>

                    {/* <div className="flex flex-col justify-start items-start w-full">
                        {/* <h1 className="text-3xl displayBold mt-2">
                            {userData.name}
                        </h1>
                        <h2 className="text-base displayMedium text-gray-600 ">
                            @{userData.username}
                        </h2> 
                        <div
                            className={`
                                        flex flex-row gap-6 justify-center items-center
                                        text-neutral-200 text-sm
                                    `}
                        >
                            {userData.Profile?.pronouns ? (
                                <Link
                                    // href={`/profile/${session?.user?.username}/following`}
                                    href={`#`}
                                    id="pronous"
                                >
                                    {userData.Profile?.pronouns!}
                                </Link>
                            ) : null}
                            {userData.createdAt ? (
                                <Link
                                    // href={`/profile/${session?.user?.username}/following`}
                                    href={`#`}
                                    id="pronous"
                                >
                                    Entrou em{" "}
                                    {new Date(
                                        userData.createdAt
                                    ).getUTCFullYear()}
                                </Link>
                            ) : null}
                        </div>
                    </div> */}
                </div>
            </div>
            <div className="flex justify-center items-center relative">
                <div
                    className={`
                    fixed top-3 m-auto  flex items-center justify-center
                    transition-transform duration-300
                    ${isVisible ? "-translate-y-[200%]" : "translate-y-0"}
                `}
                >
                    <Tabs setTab={setTab} tab={tab} />
                </div>
            </div>
        </>
    );
}
