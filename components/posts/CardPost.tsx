/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import Avatar from "./AvatarDisplay";
import PastRelativeTime from "../core/PastRelativeTime";
import EditOptions from "./EditOptions";
import { motion } from "framer-motion";
import Icon from "../core/Icon";

interface Post {
    title: string;
    content: string | any;
    public: boolean;
    author_id: string;
    id: string;
    created_at: string;
    updated_at: string;
    room: string;
    image: string;
}

interface User {
    id: string;
    updated_at: string;
    username: string;
    full_name: string;
    avatar_url: string;
    website: string;
    bio: string;
    pronouns: string;
}

export default function CardPost({
    post,
    edit,
}: {
    post: any;
    edit?: Boolean;
}) {
    const [userProfile, setUserProfile] = useState<User | null>(null);
    const [userImg, setUserImg] = useState<string | null>(null);
    const [paragraph, setParagraph] = useState<any | null>(null);

    // console.log(post);

    useEffect(() => {
        async function fetchParagraph() {
            const extractParagraphFromEditor =
                post.content.content.find(
                    (item: any) => item.type === "paragraph" && item.content,
                ) || null;

            // console.log(extractParagraphFromEditor);

            setParagraph(extractParagraphFromEditor);
        }

        fetchParagraph();
    }, []);

    useEffect(() => {
        async function fetchUserProfile() {
            const supabase = createClient();
            const { data, error } = await supabase
                .from("profiles")
                .select("*")
                .eq("id", post.author_id)
                .single();

            if (error) {
                console.log(error);
                return null;
            }
            // console.log(data)
            setUserProfile(data);
            setUserImg(data.avatar_url);
        }

        fetchUserProfile();
    }, []);

    // console.log(userProfile);

    return (
        <motion.div
            whileTap={{ scale: 0.8 }}
            className={`
            flex flex-col gap-2 
            
            bg-[#1f1f1f] 
            bg
            transition-all duration-200 ease-in-out   
            rounded-3xl overflow-hidden relative
        `}
        >
            <Link
                href={`/${edit ? "create" : "chapter"}/${post.room}`}
                className="z-20"
            >
                <div className="flex flex-row justify-between items-center gap-1 p-3 pb-0 relative">
                    {userProfile && (
                        <div className="flex flex-row items-center gap-1">
                            <div className="flex relative flex-col justify-center items-center h-10 w-10 rounded-full ">
                                <Avatar
                                    size={36}
                                    url={userImg}
                                    username={userProfile.username}
                                    intrisicSize={"size-8"}
                                />
                            </div>
                            <div className="flex items-center flex-row gap-2">
                                <p className="text-sm PFRegalTextPro">
                                    {userProfile!.username}
                                </p>
                                    <span className=" text-xs text-stone-500 dark:text-stone-400">
                                        <PastRelativeTime
                                            date={new Date(post.updated_at)}
                                        />
                                    </span>
                            </div>
                        </div>
                    )}
                    {edit && <EditOptions />}
                </div>
                <div className="flex flex-col gap-3 p-3">
                    {/* <h1 className="text-3xl PFRegalTextPro">{post.title}</h1> */}
                    {paragraph && (
                        <p className="text-sm line-clamp-3">
                            {paragraph.content![0].text}
                        </p>
                    )}
                </div>
                {post.image && (
                    <picture className="w-full flex p-3">
                        <Image
                            src={post.image}
                            alt="Authentication"
                            width={500}
                            height={500}
                            className="object-cover w-full max-h-[400px] rounded-2xl"
                        />
                    </picture>
                )}

                {/* <div className="flex w-full flex-row justify-between gap-3 p-3">
                    <span className=" text-xs text-stone-500 dark:text-stone-400">
                        <Icon name="eye" type="heart" className="size-6" />
                    </span>
                </div> */}
            </Link>
            {/* {edit && (
                <div className="footercard grid grid-cols-2 gap-4">
                    <Link
                        href={`/chapter/${post.room}`}
                        className="w-full rounded-3xl border border-sandybrown-950/20 py-3"
                    >
                        Ver publicação
                    </Link>
                    <button className="w-full rounded-lg bg-sky-700/30 border-2 border-sky-600/30 py-3">
                        Mais opções
                    </button>
                </div>
            )} */}
        </motion.div>
    );
}
