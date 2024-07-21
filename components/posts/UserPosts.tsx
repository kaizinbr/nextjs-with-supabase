"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import CardPost from "./CardPost";


export default function UserPosts({ user }: { user: any }) {
    const supabase = createClient();
    const [posts, setPosts] = useState<any[] | null>([]);

    useEffect(() => {
        async function fetchPosts() {
            const { data: posts, error } = await supabase
                .from("posts")
                .select()
                .eq("author_id", user.id);

            console.log(posts);
            setPosts(posts);
        }

        fetchPosts();
    }, []);

    return (
        <div
            className={`
            w-full grid grid-cols-1 md:grid-cols-2 gap-10
            px-10 mt-20
        `}
        >
                {posts?.map((post) => (
                    <CardPost key={post.id} post={post} />
                ))}
        </div>
    );
}