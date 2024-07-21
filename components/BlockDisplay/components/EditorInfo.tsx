"use client";

import { WebSocketStatus } from "@hocuspocus/provider";
import { memo, useState, useEffect } from "react";
import { EditorUser } from "../types";
import { cn } from "../../../lib/utils";
import { getConnectionText } from "../../../lib/utils/getConnectionText";
import { useDisclosure } from "@mantine/hooks";
import { Modal, Button } from "@mantine/core";
import Tooltip from "../../ui/Tooltip";
import classes from "@/styles/EditorInfo.module.css";

import { createClient } from "@/utils/supabase/client";
import PubModal from "./Modal";

export type EditorInfoProps = {
    characters: number;
    words: number;
    collabState: WebSocketStatus;
    users: EditorUser[];
    room: string | any;
};



export const EditorInfo = memo(
    ({ characters, collabState, users, words, room }: EditorInfoProps) => {
        const [opened, { open, close }] = useDisclosure(false);
        const [isPublic, setIsPublic] = useState(false);

        const supabase = createClient();

        useEffect(() => {
            const fetchPublic = async () => {
                const { data, error } = await supabase
                    .from("posts")
                    .select("public")
                    .eq("room", room);

                if (error) {
                    console.log("Error fetching post: ", error);
                    throw error;
                }

                if (data && data.length > 0) {
                    setIsPublic(data[0].public);
                }
            };

            fetchPublic();
        }, [room, supabase]);

        

        async function setPublished(room: string) {
            // const supabase = createClient();
            const { data, error } = await supabase
                .from("posts")
                .update({ public: true })
                .eq("room", room);
        
            if (error) {
                console.log("Error updating post: ", error);
                throw error;
            }
        }
        return (
            <div className="flex items-center">
                <div className="flex flex-col justify-center pr-4 mr-4 text-right border-r border-neutral-200 dark:border-neutral-800">
                    <div className="text-xs font-semibold text-neutral-500 dark:text-neutral-400">
                        {words} {words === 1 ? "word" : "words"}
                    </div>
                    <div className="text-xs font-semibold text-neutral-500 dark:text-neutral-400">
                        {characters}{" "}
                        {characters === 1 ? "character" : "characters"}
                    </div>
                </div>
                <div className="flex items-center gap-2 mr-2">
                    <div
                        className={cn("w-2 h-2 rounded-full", {
                            "bg-yellow-500 dark:bg-yellow-400":
                                collabState === "connecting",
                            "bg-green-500 dark:bg-green-400":
                                collabState === "connected",
                            "bg-red-500 dark:bg-red-400":
                                collabState === "disconnected",
                        })}
                    />
                    <span className="max-w-[4rem] text-xs text-neutral-500 dark:text-neutral-400 font-semibold">
                        {getConnectionText(collabState)}
                    </span>
                </div>
                {/* {collabState === "connected" && (
                    <div className="flex flex-row items-center">
                        <div className="relative flex flex-row items-center ml-3">
                            {users.map((user: EditorUser) => (
                                <div key={user.clientId} className="-ml-3">
                                    <Tooltip title={user.name}>
                                        <img
                                            className="w-8 h-8 border border-white rounded-full dark:border-black"
                                            src={`https://api.dicebear.com/7.x/notionists-neutral/svg?seed=${
                                                user.name
                                            }&backgroundColor=${user.color.replace(
                                                "#",
                                                "",
                                            )}`}
                                            alt="avatar"
                                        />
                                    </Tooltip>
                                </div>
                            ))}
                            {users.length > 3 && (
                                <div className="-ml-3">
                                    <div className="flex items-center justify-center w-8 h-8 font-bold text-xs leading-none border border-white dark:border-black bg-[#FFA2A2] rounded-full">
                                        +{users.length - 3}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )} */}
                <PubModal room={room} isPublic={isPublic} setIsPublic={setIsPublic} />
            </div>
        );
    },
);

EditorInfo.displayName = "EditorInfo";
