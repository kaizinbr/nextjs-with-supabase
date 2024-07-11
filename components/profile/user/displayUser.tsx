"use client";
import { useCallback, useEffect, useState, ChangeEvent } from "react";
import { createClient } from "@/utils/supabase/client";
import { type User } from "@supabase/supabase-js";
import Avatar from "./avatar";
import { Textarea } from "@mantine/core";
import { ProfilePic } from "@/components/profile/general/ProfilePic";
import { useSearchParams, useRouter } from "next/navigation";
import { X } from "lucide-react";
import Loading, { LoadingSm } from "@/components/Loading";
import containsSpecialChars from "@/lib/utils/containsSpecialChars";
import ColorSelect from "@/components/profile/me/ColorSelect";
import Image from "next/image";

import classes from "./AcForm.module.css";

export default function DisplayUser({ user }: { user: any }) {
    const supabase = createClient();
    const [loading, setLoading] = useState(true);
    const [fullname, setFullname] = useState<string | null>(null);
    const [username, setUsername] = useState<string | null>(null);
    const [website, setWebsite] = useState<string | null>(null);
    const [avatar_url, setAvatarUrl] = useState<string | null>(null);
    const [bio, setBio] = useState<string | null>(null);
    const [pronouns, setPronouns] = useState<string | null>(null);

    const getProfile = useCallback(async () => {
        try {
            setLoading(true);

            const { data, error, status } = await supabase
                .from("profiles")
                .select(
                    `full_name, username, website, avatar_url, bio, pronouns`,
                )
                .eq("username", user[0]?.username)
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
                setBio(data.bio);
                setPronouns(data.pronouns);
            }
        } catch (error) {
            alert("Error loading user data!");
        } finally {
            setLoading(false);
        }
    }, [user, supabase]);

    useEffect(() => {
        getProfile();
    }, [user, getProfile]);

    async function updateProfile({
        username,
        website,
        avatar_url,
        fullname,
        bio,
        pronouns,
    }: {
        username: string | null;
        fullname: string | null;
        website: string | null;
        avatar_url: string | null;
        bio: string | null;
        pronouns: string | null;
    }) {
        try {
            setLoading(true);

            const { error } = await supabase.from("profiles").upsert({
                id: user?.id as string,
                full_name: fullname,
                username,
                website,
                avatar_url,
                bio,
                pronouns,
                updated_at: new Date().toISOString(),
            });
            if (error) throw error;
            alert("Profile updated!");
        } catch (error) {
            alert("Error updating the data!");
        } finally {
            setLoading(false);
        }
    }
    const router = useRouter();

    return (
        <div className="form-widget flex flex-col justify-center w-full md:max-w-md md:w-2/5 pt-16 px-8 md:px-0 md:pl-16">
            <div
                className={`
                    flex flex-col justify-start
                    w-full
                `}
            >
                <div
                    className={`
                        bgPfp flex flex-col justify-end items-start relative
                        h-56 w-full
                    `}
                >
                    <div
                        className={`
                    
                        flex flex-row justify-start items-center
                        gap-3 pt-8 px-4 w-full h-56
                        bg-gradient-to- from-transparent to-black/45 from-40% 
                        z-30
                    `}
                    >
                        <picture
                    className={`
                        flex flex-row justify-center items-center
                        bg-neutral-800 rounded-full overflow-hidden
                        w-48 h-48
                        
                    `}
                >
                    <Image
                        width={192}
                        height={192}
                        src={user[0]?.avatar_url || ""}
                        alt="Avatar"
                        className={`
                                object-cover object-center
                                min-w-full
                                avatar image
                            `}
                        style={{ height: 192, width: 192 }}
                    />
                </picture>
                    </div>
                </div>
            </div>

            <div
                className={`
                    profile  flex-col-reverse
                    flex items-center justify-center
                    col-span-6 lg:col-span-4 
                    relative
                    w-full
                    mt-8
                    px-4
                `}
            >
                <div
                    className={`
                            

                            flex flex-col justify-center lg:items-center
                            
                            bg-default-fill
                            rounded-3xl w-full
                            gap-3
                        `}
                >
                    <div className="flex flex-col justify-start items-start w-full">
                        <div>
                            <p
                                className={`
                                         rounded-lg
                                        outline-none
                                         w-full
                                        transition duration-200 ease-in-out
                                        text-3xl font-bold 
                                    `}
                            >
                                {fullname || ""}
                            </p>
                        </div>
                        <div className="flex flex-row py-1">
                            <span className="text-lg font-medium">@</span>
                            <p
                                className={`
                                        rounded-lg
                                        outline-none
                                         w-full
                                        transition duration-200 ease-in-out
                                        text-lg  font-medium
                                    `}
                            >
                                {username || ""}
                            </p>
                        </div>
                        <div>
                            <p
                                className={`
                                        rounded-lg
                                        outline-none
                                         w-full
                                        transition duration-200 ease-in-out
                                        text-lg  font-medium py-1
                                    `}
                            >{website || ""}</p>
                        </div>

                        <div>
                            <p
                                className={`
                                        rounded-lg
                                        outline-none
                                         w-full
                                        transition duration-200 ease-in-out
                                        text-lg  font-medium py-1
                                    `}
                            >{pronouns || ""}</p>
                        </div>
                        <div
                            className={`
                    
                                text-lg 
                                w-full
                            `}
                        >
                            <p
                            >{bio || ""}</p>
                        </div>
                    </div>
                    {/* </div> */}
                </div>
            </div>
        </div>
    );
}
