"use client";

import Icon from "@/components/core/Icon";
import Link from "next/link";
import { usePathname } from "next/navigation";

import AvatarB from "@/components/Navbar/Avatar";
import { useState, useCallback, useEffect, useRef } from "react";
import { createClient } from "@/utils/supabase/client";
import {
    TbUserFilled,
    TbFolderFilled,
    TbSquareRoundedPlusFilled,
} from "react-icons/tb";

import useScrollDirection from "@/hooks/useScrollDirection";

import { type User } from "@supabase/supabase-js";


export default function Navigator({ user }: { user: User | null }) {
    const pathname = usePathname();
    const supabase = createClient();
    const [loading, setLoading] = useState(true);
    const [fullname, setFullname] = useState<string | null>(null);
    const [username, setUsername] = useState<string | null>(null);
    const [website, setWebsite] = useState<string | null>(null);
    const [avatar_url, setAvatarUrl] = useState<string | null>(null);
    const scrollDirection = useScrollDirection();

    const [profilePath, setProfilePath] = useState<string | null>(null);


    const getProfile = useCallback(async () => {
        try {
            setLoading(true);

            const { data, error, status } = await supabase
                .from("profiles")
                .select(`full_name, username, website, avatar_url`)
                .eq("id", user?.id)
                .single();

            if (error && status !== 406) {
                console.log(error);
                throw error;
            }

            if (data) {
                setFullname(data.full_name);
                setUsername(data.username);
                setWebsite(data.website);
                setAvatarUrl(data.avatar_url);

            }

            // console.log(data);
        } catch (error) {
            console.log("Error loading user data!");
        } finally {
            setLoading(false);
        }
    }, [user, supabase]);

    useEffect(() => {
        getProfile();
    }, [user, getProfile]);
    
    return (
        <div className={`
            fixed 
            ${scrollDirection > "down" ? "bottom-0" : "-bottom-24"}
            transition-all duration-300
            left-0 flex w-full items-center justify-evenly border-t-1 border-woodsmoke-50/70 bg-woodsmoke-50/70 backdrop-blur-lg px-6 py-2
        `}>
            <Link
                data-active={pathname === "/"}
                href={`/`}
                className="jelly jelly-increased flex min-w-[70px] basis-0 cursor-pointer flex-col items-center gap-1 rounded-8 p-3 text-woodsmoke-400 data-[active=true]:text-primary-500 selected:bg-woodsmoke-400 selected:text-gray-300"
            >
                <Icon type="home" className="h-5" />
                <div className="text-12 font-600">Home</div>
            </Link>
            <Link
                data-active={pathname === "/create"}
                href={`/create`}
                className="jelly jelly-increased flex min-w-[70px] basis-0 cursor-pointer flex-col items-center gap-1 rounded-8 p-3 text-woodsmoke-400 data-[active=true]:text-primary-500 selected:bg-woodsmoke-400 selected:text-gray-300"
            >
                <TbSquareRoundedPlusFilled className="size-6" />
                <div className="text-12 font-600">Novo</div>
            </Link>
            <Link
                data-active={pathname === "/manage"}
                href={`/manage`}
                className="jelly jelly-increased flex min-w-[70px] basis-0 cursor-pointer flex-col items-center gap-1 rounded-8 p-3 text-woodsmoke-400 data-[active=true]:text-primary-500 selected:bg-woodsmoke-400 selected:text-gray-300"
            >
                <TbFolderFilled className="size-6" />
                <div className="text-12 font-600">Posts</div>
            </Link>
            <Link
                data-active={pathname === "/profile" || pathname === `/profile${username}`}
                href={`/profile${username ? "/" + username : ""}`}
                className="jelly jelly-increased flex min-w-[70px] basis-0 cursor-pointer flex-col items-center gap-1 rounded-8 p-3 text-woodsmoke-400 data-[active=true]:text-primary-500 selected:bg-woodsmoke-400 selected:text-gray-300"
            >
                {avatar_url ? (
                    <AvatarB size={24} url={avatar_url} />
                ) : (
                    <TbUserFilled className="size-6" />
                )}
                <div className="text-12 font-600">Perfil</div>
            </Link>
        </div>
    );
}
