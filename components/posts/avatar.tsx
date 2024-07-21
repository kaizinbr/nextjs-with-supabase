/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import Image from "next/image";

export default function Avatar({
    url,
    size,
    username,
}: {
    url: string | null;
    size: number;
    username?: string | null;
}) {
    const supabase = createClient();
    const [avatarUrl, setAvatarUrl] = useState<string | null>(url);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        console.log("effect")
        async function downloadImage(path: string) {
            try {
                console.log("Downloading image:", path);
                const { data, error } = await supabase.storage
                    .from("avatars")
                    .download(path);
                if (error) {
                    throw error;
                }

                const url = URL.createObjectURL(data);
                setAvatarUrl(url);
            } catch (error) {
                console.log("Error downloading image: ", error);
            }
        }

        if (url) downloadImage(url);
    }, []);

   
    return (
        <div className="flex relative flex-col justify-center items-center h-10 w-10 rounded-full ">
            {avatarUrl ? (
                <picture
                    className={`
                        flex flex-row justify-center items-center
                        bg-neutral-800 rounded-full overflow-hidden
                        size-8
                        
                    `}
                >
                    <Image
                        width={size}
                        height={size}
                        src="/img.jpg"
                        alt="Avatar"
                        className={`
                                object-cover object-center
                                min-w-full
                                avatar image
                            `}
                        style={{ height: size, width: size }}
                    />
                </picture>
            ) : ""}
        </div>
    );
}
