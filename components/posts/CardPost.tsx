/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import Avatar from "./AvatarDisplay";
import PastRelativeTime from "../core/PastRelativeTime";

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

            console.log(extractParagraphFromEditor);

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
        <div className="flex flex-col gap-2 border border-sandybrown-950/20 rounded-3xl overflow-hidden">
            <Link href={`/${edit ? "create" : "chapter"}/${post.room}`}>
                {post.image && (
                    <picture className="w-full">
                        <Image
                            src={post.image}
                            alt="Authentication"
                            width={500}
                            height={500}
                            className="object-cover w-full max-h-[400px]"
                        />
                    </picture>
                )}
                <div className="flex flex-col gap-3 p-3">
                    <span className=" text-xs text-stone-500">
                        <PastRelativeTime date={new Date(post.updated_at)} />
                    </span>
                    <h1 className="text-3xl PFRegalTextPro">{post.title}</h1>
                    {paragraph && (
                        <p className="text-sm line-clamp-3">
                            {paragraph.content![0].text}
                        </p>
                    )}
                </div>
                <div className="flex flex-row items-center gap-1 p-3 pt-0">
                    {userProfile && (
                        <>
                            <div className="flex relative flex-col justify-center items-center h-10 w-10 rounded-full ">
                                <Avatar
                                    size={36}
                                    url={userImg}
                                    username={userProfile.username}
                                    intrisicSize={"size-8"}
                                />
                            </div>
                            <p className="text-sm PFRegalTextPro">
                                {userProfile!.username}
                            </p>
                        </>
                    )}
                </div>
            </Link>
            {edit && (
                <div className="footercard grid grid-cols-2 gap-4">
                    <button className="w-full rounded-lg bg-sky-700/30 border-2 border-sky-600/30 py-3">
                        Ver publicação
                    </button>
                    <button className="w-full rounded-lg bg-sky-700/30 border-2 border-sky-600/30 py-3">
                        Mais opções
                    </button>
                </div>
            )}
        </div>
    );
}
