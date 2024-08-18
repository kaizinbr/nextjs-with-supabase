"use client";

import { EditorContent, PureEditorContent } from "@tiptap/react";
import React, { useMemo, useRef, useEffect } from "react";

import { LinkMenu } from "../menus";

import { useBlockEditor } from "../../hooks/useBlockEditorOff";

import "@/styles/index.css";

import { Sidebar } from "../Sidebar";
import { EditorContext } from "../../context/EditorContext";
import ImageBlockMenu from "../../extensions/ImageBlock/components/ImageBlockMenu";
import { ColumnsMenu } from "../../extensions/MultiColumn/menus";
import { TableColumnMenu, TableRowMenu } from "../../extensions/Table/menus";
import { TiptapDisplayProps } from "./types";
import { EditorHeader } from "./components/EditorHeader";
import { TextMenu } from "../menus/TextMenu";
import { ContentItemMenu } from "../menus/ContentItemMenu";

import { createClient } from "@/utils/supabase/client";

export const BlockEditor = ({ json }: { json: string }) => {
    // const menuContainerRef = useRef(null);
    const editorRef = useRef<PureEditorContent | null>(null);
    // console.log(json);

    const { editor } = useBlockEditor(json);

    const providerValue = useMemo(() => {
        return {};
    }, []);

    if (!editor) {
        return null;
    }

    // console.log(editor.getJSON());

    return (
        <EditorContext.Provider value={providerValue}>
            <div className="relative flex flex-col flex-1 h-full overflow-hidden">
                <EditorContent
                    editor={editor}
                    ref={editorRef as React.RefObject<HTMLDivElement>}
                    className="flex-1 overflow-y-auto"
                />
            </div>
        </EditorContext.Provider>
    );
};

export default BlockEditor;
