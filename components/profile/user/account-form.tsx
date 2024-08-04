"use client";
import { useCallback, useEffect, useState, ChangeEvent } from "react";
import { createClient } from "@/utils/supabase/client";
import { type User } from "@supabase/supabase-js";
import Avatar from "./AvatarEdit";
import { Textarea } from "@mantine/core";
import { ProfilePic } from "@/components/profile/general/ProfilePic";
import { useSearchParams, useRouter } from "next/navigation";
import { X } from "lucide-react";
import Loading, { LoadingSm } from "@/components/Loading";
import containsSpecialChars from "@/lib/utils/containsSpecialChars";
import ColorSelect from "@/components/profile/me/ColorSelect";
import Link from "next/link";
import Icon from "@/components/core/Icon";

import classes from "./AcForm.module.css";

export default function AccountForm({ user }: { user: User | null }) {
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
        <div className="form-widget flex flex-col justify-center w-full max-h-screen md:max-w-md md:w-2/5">
            <div
                className={`
                md:fixed top-0 bottom-0 w-full pt-16 md:pt-0 md:max-w-md md:w-2/5 px-8 md:px-0 md:pl-16 flex flex-col justify-center
            `}
            >
                <div
                    className={`
                        flex flex-col justify-start
                        size-10
                    `}
                >
                    <Link href={"/profile/settings"} className="p-2 rounded-lg hover:bg-woodsmoke-300/60 bg-transparent transition-all duration-200">
                        <Icon className="cursor-pointer size-6" type={"settings"} />
                    </Link>
                </div>
                
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
                            <Avatar
                                uid={user?.id ?? null}
                                url={avatar_url}
                                size={192}
                                username={username}
                                onUpload={(url) => {
                                    setAvatarUrl(url);
                                    updateProfile({
                                        fullname,
                                        username,
                                        website,
                                        avatar_url: url,
                                        pronouns,
                                        bio,
                                    });
                                }}
                            />
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
                        <form
                            autoComplete="off"
                            spellCheck="false"
                            className="flex flex-col justify-start items-start w-full"
                        >
                            <div>
                                <input
                                    type="text"
                                    name="name"
                                    value={fullname || ""}
                                    onChange={(e) =>
                                        setFullname(e.target.value)
                                    }
                                    placeholder="Seu Nome..."
                                    className={`
                                             rounded-lg
                                            outline-none
                                            bg-woodsmoke-100 w-full
                                            transition duration-200 ease-in-out
                                            text-3xl font-bold
                                        `}
                                ></input>
                            </div>
                            <div className="flex flex-row py-1">
                                <span className="text-lg font-medium">@</span>
                                <input
                                    type="text"
                                    name="username"
                                    value={username || ""}
                                    onChange={(e) =>
                                        setUsername(e.target.value)
                                    }
                                    placeholder="Seu Username..."
                                    className={`
                                            rounded-lg
                                            outline-none
                                            bg-woodsmoke-100 w-full
                                            transition duration-200 ease-in-out
                                            text-lg  font-medium
                                        `}
                                ></input>
                            </div>
                            <div>
                                <input
                                    type="text"
                                    name="website"
                                    value={website || ""}
                                    onChange={(e) => setWebsite(e.target.value)}
                                    placeholder="Site"
                                    // onKeyUp={(e) => {
                                    //     if (userAlreadyExists(e.currentTarget.value)) {
                                    //         console.log("user already exists");
                                    //     }
                                    // }}
                                    className={`
                                            rounded-lg
                                            outline-none
                                            bg-woodsmoke-100 w-full
                                            transition duration-200 ease-in-out
                                            text-lg  font-medium py-1
                                        `}
                                ></input>
                            </div>
                            <div>
                                <input
                                    type="text"
                                    name="pronouns"
                                    value={pronouns || ""}
                                    onChange={(e) =>
                                        setPronouns(e.target.value)
                                    }
                                    placeholder="Pronomes"
                                    // onKeyUp={(e) => {
                                    //     if (userAlreadyExists(e.currentTarget.value)) {
                                    //         console.log("user already exists");
                                    //     }
                                    // }}
                                    className={`
                                            rounded-lg
                                            outline-none
                                            bg-woodsmoke-100 w-full
                                            transition duration-200 ease-in-out
                                            text-lg  font-medium py-1
                                        `}
                                ></input>
                            </div>
                            <div
                                className={`
            
                                    text-lg
                                   bg-woodsmoke-100 w-full
                                `}
                            >
                                <Textarea
                                    label=""
                                    placeholder="Sua bio"
                                    autosize
                                    variant="unstyled"
                                    minRows={2}
                                    maxRows={4}
                                    value={bio || ""}
                                    classNames={{
                                        root: "w-full",
                                        input: classes.textareaInput,
                                    }}
                                    onChange={(e) => setBio(e.target.value)}
                                />
                            </div>
                        </form>
                        {/* </div> */}
                    </div>
                </div>
                <div className="flex w-full flex-row gap-4 px-4">
                    <button
                        className=" px-4 py-2 rounded-lg bg-indigo-400 font-bold text-stone-100"
                        onClick={() =>
                            updateProfile({
                                fullname,
                                username,
                                website,
                                avatar_url,
                                pronouns,
                                bio,
                            })
                        }
                        disabled={loading}
                    >
                        {loading ? "Salvando..." : "Salvar"}
                    </button>
                    {/* <form action="/auth/signout" method="post">
                        <button
                            className="px-4 py-2 rounded-lg bg-red-400 font-bold text-stone-100"
                            type="submit"
                        >
                            Sair
                        </button>
                    </form> */}
                </div>
            </div>
        </div>
    );
}
