"use client";

import { TiptapCollabProvider } from "@hocuspocus/provider";
import "iframe-resizer/js/iframeResizer.contentWindow";
import { useSearchParams } from "next/navigation";
import {
    useCallback,
    useEffect,
    useLayoutEffect,
    useMemo,
    useState,
} from "react";
import { Doc as YDoc } from "yjs";

import { BlockEditor } from "../../../../components/BlockEditor";
import { createPortal } from "react-dom";
import { Surface } from "../../../../components/ui/Surface";
import { Toolbar } from "../../../../components/ui/Toolbar";
import { Icon } from "../../../../components/ui/Icon";

import { createClient } from "@/utils/supabase/client";

export default function Document({ params }: { params: { room: string } }) {
    // const { isDarkMode, darkMode, lightMode } = useDarkmode()
    const [provider, setProvider] = useState<TiptapCollabProvider | null>(null);
    const [collabToken, setCollabToken] = useState<string | null>(null);
    const searchParams = useSearchParams();

    const hasCollab = parseInt(searchParams.get("noCollab") as string) !== 1;

    const { room } = params;

    const [initialContent, setInitialContent] = useState<string | null>(null);
    const [title, setTitle] = useState<string | null>(null);
    const [image, setImage] = useState<string | null>(null);

    const supabase = createClient();

    // const { data, error } = await supabase.from('posts').select('content').eq('room', params.room).single()

    useEffect(() => {
        // fetch data
        const contentfetch = async () => {
            const { data, error } = await supabase
                .from("posts")
                .select("content,title,image")
                .eq("room", room)
                .single();

            console.log(data);
            if (error) {
                console.error("error", error);
                return;
            }

            setInitialContent(data.content);
            setTitle(data.title);
            setImage(data.image);
            
        };

        contentfetch();
            console.log(initialContent);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        // fetch data
        const dataFetch = async () => {
            const data = await (
                await fetch("/api/collaboration", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
            ).json();

            const { token } = data;

            // set state when the data received
            setCollabToken(token);
        };

        dataFetch();
    }, []);

    const ydoc = useMemo(() => new YDoc(), []);
    

    useLayoutEffect(() => {
        if (hasCollab && collabToken) {
            setProvider(
                new TiptapCollabProvider({
                    name: `${process.env.NEXT_PUBLIC_COLLAB_DOC_PREFIX}${room}`,
                    appId: process.env.NEXT_PUBLIC_TIPTAP_COLLAB_APP_ID ?? "",
                    token: collabToken,
                    document: ydoc,
                }),
            );
        }
    }, [setProvider, collabToken, ydoc, room, hasCollab]);

    if (hasCollab && (!collabToken || !provider)) return;

    return (
        <>
            {/* {DarkModeSwitcher} */}
            <BlockEditor
                hasCollab={false}
                ydoc={ydoc}
                provider={null}
                room={room}
                initialContent={initialContent}
            />
        </>
    );
}
