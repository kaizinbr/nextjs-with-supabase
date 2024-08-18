"use client";
import { useCallback, useEffect, useState, ChangeEvent } from "react";
// import { createClient } from "@/utils/supabase/client";
import { type User } from "@supabase/supabase-js";
import Avatar from "@/components/posts/AvatarDisplay";
import PastRelativeTime from "@/components/core/PastRelativeTime";
import CoreComment from "@/components/room/comments/CoreComment";
import { createClient } from "@/utils/supabase/client";

import Link from "next/link";
import Icon from "@/components/core/Icon";
import classes from "@/styles/Textarea.module.css";

export default function Comments({ post }: { post?: any }) {
    const supabase = createClient();
    const [comments, setComments] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const getComments = useCallback(async () => {
        try {
            setLoading(true);

            const { data, error, status } = await supabase
                .from("comments")
                .select(
                    `*,
	                profiles!comments_author_fkey("*")`,
                )
                .eq("post_id", post?.id)
                .order("created_at", { ascending: false });

            if (error && status !== 406) {
                console.log(error);
                throw error;
            }

            if (data) {
                console.log(data);
                setComments(data);
            }
        } catch (error) {
            alert("Error loading user data!");
        } finally {
            setLoading(false);
        }
    }, [post, supabase]);

    useEffect(() => {
        getComments();
    }, [post, getComments]);

    return (
        <div className="w-full mb-4">
            <div className="w-full flex flex-col items-end gap-3">
                <div className="w-full flex flex-col items-start gap-3">
                    {comments.map((comment: any) => (
                        <div
                            key={comment.id}
                            className="w-full flex flex-col items-start gap-3"
                        >
                            <CoreComment comment={comment} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
