"use client";

import { EditorContent, PureEditorContent } from "@tiptap/react";
import React, { useMemo, useRef, useEffect } from "react";
import { LinkMenu } from "../menus";

import { useBlockEditor } from "../../hooks/useBlockEditor";

import "@/styles/index.css";

import { Sidebar } from "../Sidebar";
import { EditorContext } from "../../context/EditorContext";
import ImageBlockMenu from "../../extensions/ImageBlock/components/ImageBlockMenu";
import { ColumnsMenu } from "../../extensions/MultiColumn/menus";
import { TableColumnMenu, TableRowMenu } from "../../extensions/Table/menus";
import { TiptapProps } from "./types";
import { EditorHeader } from "./components/EditorHeader";
import { TextMenu } from "../menus/TextMenu";
import { ContentItemMenu } from "../menus/ContentItemMenu";

import { createClient } from "@/utils/supabase/client";

export const BlockEditor = ({
    ydoc,
    provider,
    room,
    initialContent,
}: TiptapProps) => {
    const menuContainerRef = useRef(null);
    const editorRef = useRef<PureEditorContent | null>(null);
    const supabase = createClient();

    const { editor, users, characterCount, collabState, leftSidebar } =
        useBlockEditor({ ydoc, provider, room, supabase, initialContent });

    const displayedUsers = users.slice(0, 3);

    const providerValue = useMemo(() => {
        return {};
    }, []);

    if (!editor) {
        return null;
    }

    return (
        <EditorContext.Provider value={providerValue}>
            <div className="flex h-full " ref={menuContainerRef}>
                
                <Sidebar
                    isOpen={leftSidebar.isOpen}
                    onClose={leftSidebar.close}
                    editor={editor}
                />
                <div className="relative flex flex-col flex-1 h-full overflow-hidden">
                    <EditorHeader
                        characters={characterCount.characters()}
                        collabState={collabState}
                        users={displayedUsers}
                        words={characterCount.words()}
                        isSidebarOpen={leftSidebar.isOpen}
                        toggleSidebar={leftSidebar.toggle}
                        room={room}
                        editor={editor}
                    />
                    <EditorContent
                        editor={editor}
                        ref={editorRef as React.RefObject<HTMLDivElement>}
                        className="flex-1 overflow-y-auto mt-20"
                    />
                    {/* <ContentItemMenu editor={editor} /> */}
                    <LinkMenu editor={editor} appendTo={menuContainerRef} />
                    <TextMenu editor={editor} />
                    <ColumnsMenu editor={editor} appendTo={menuContainerRef} />
                    <TableRowMenu editor={editor} appendTo={menuContainerRef} />
                    <TableColumnMenu
                        editor={editor}
                        appendTo={menuContainerRef}
                    />
                    <ImageBlockMenu
                        editor={editor}
                        appendTo={menuContainerRef}
                    />
                </div>
            </div>
        </EditorContext.Provider>
    );
};

export default BlockEditor;
