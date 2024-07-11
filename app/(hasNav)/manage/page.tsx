
import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/server";
import UserPosts from "@/components/posts/UserPosts";

export default async function Posts() {
    const supabase = createClient();

    // const [posts, setPosts] = useState([]);
    const {
        data: { user },
    } = await supabase.auth.getUser();

    // console.log(user);

    return (
        <div className="flex-1 w-full flex flex-col gap-20 items-center  mx-auto max-w-4xl">
            <h1>Seus posts</h1>
            <UserPosts user={user} />
        </div>
    );
}