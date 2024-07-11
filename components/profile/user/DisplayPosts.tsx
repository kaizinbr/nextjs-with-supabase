"use client";
import { useCallback, useEffect, useState, ChangeEvent } from "react";
import { createClient } from "@/utils/supabase/client";
import { useSearchParams, useRouter } from "next/navigation";
import { X } from "lucide-react";
import Loading, { LoadingSm } from "@/components/Loading";
import Image from "next/image";

import classes from "./AcForm.module.css";
import CardsContainer from "@/components/posts/cardsContainer";
import UserCardsContainer from "@/components/posts/userCards";

export default function DisplayPosts({ user }: { user: any }) {
    const supabase = createClient();
    const [loading, setLoading] = useState(true);
    const [posts, setPosts] = useState<any[]>([]);

    const getPosts = useCallback(async () => {
        try {
            setLoading(true);

            const { data, error, status } = await supabase
                .from("posts")
                .select()
                .eq("author_id", user[0]?.id)
                .order('updated_at', { ascending: false })

            if (error && status !== 406) {
                console.log(error);
                throw error;
            }
            if (data) {
                setPosts(data);
                console.log(data);
            }

        } catch (error) {
            alert("Error loading user data!");
        } finally {
            setLoading(false);
        }
    }, [user, supabase]);

    useEffect(() => {
        getPosts();
    }, [user, getPosts]);

    const router = useRouter();

    return (
        <div className="flex-1 w-full flex flex-col mr-8 items-center">
            <UserCardsContainer posts={posts} />
        </div>
    );
}
