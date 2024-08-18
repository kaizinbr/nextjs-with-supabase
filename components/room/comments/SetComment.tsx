
"use client";
import { useCallback, useEffect, useState, ChangeEvent } from "react";
// import { createClient } from "@/utils/supabase/client";
import { type User } from "@supabase/supabase-js";
import Avatar from "@/components/posts/AvatarDisplay";
import { Textarea } from "@mantine/core";
import { createClient } from "@/utils/supabase/client";

import Link from "next/link";
import Icon from "@/components/core/Icon";
import classes from "@/styles/Textarea.module.css";

export default function SetAComment({ data }: { data?: any }) {
    const supabase = createClient();
    const [comment, setComment] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    

    function handleCommentSubmit(e: any) {
        e.preventDefault();
        console.log("Comment submitted");
    }

    async function postComment({
        user_id,
        post_id,
        room,
        is_response,
        response_to,
        content,
    }: {
        user_id: string;
        post_id: string;
        room: string;
        is_response: boolean;
        response_to: string | null;
        content: string;
    }) {
        console.log("Postando comentário...");
        try {
            const { data, error } = await supabase.from("comments").insert([
                {
                    author: user_id,
                    post_id,
                    room,
                    is_response,
                    response_to,
                    content,
                },
            ]);
            if (error) throw error;
            console.log("Postado com sucesso!");
            setComment("");
        } catch (error) {
            console.error("Error posting comment: ", error);
        }
    }

    return (
        <div className="w-full mb-4">
            <div className="w-full flex flex-col items-end gap-3">
                <div
                    className={`
                        w-full flex flex-row gap-2
                        border-2 border-woodsmoke-300/40 bg-woodsmoke-200 
                        dark:bg-woodsmoke-600 dark:border-woodsmoke-550/60
                        rounded-xl p-3 
                        placeholder:text-woodsmoke-400 dark:placeholder:text-woodsmoke-500
                    `}
                >
                    <picture className="rounded-full overflow-hidden size-11 relative mb-2">
                        <div className="flex relative flex-col justify-center items-center size-11 rounded-full ">
                            <Avatar
                                size={44}
                                url={data?.profiles.avatar_url}
                                username={data?.profiles.username}
                                intrisicSize={"size-11"}
                            />
                        </div>
                    </picture>
                    <Textarea
                        className="w-10/12"
                        placeholder="Deixe um comentário"
                        autosize
                        minRows={2}
                        maxRows={4}
                        
                        value={comment || ""}
                        onChange={(e) => setComment(e.target.value)}
                        classNames={{
                            input: classes.input,
                        }}
                    />
                </div>
                <button
                    className="bg-main-500 w-32 text-white rounded-xl py-2"
                    onClick={() => {
                        postComment({
                            user_id: data?.profiles.id,
                            post_id: data?.id,
                            room: data?.room,
                            is_response: false,
                            response_to: null,
                            content: comment || "",
                        });
                    }}
                    type="button"
                >
                    Postar
                </button>
            </div>
        </div>
    );
}
