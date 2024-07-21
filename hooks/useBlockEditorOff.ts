import { useEffect, useMemo, useState } from "react";

import { Editor, useEditor } from "@tiptap/react";
import Collaboration from "@tiptap/extension-collaboration";
import CollaborationCursor from "@tiptap/extension-collaboration-cursor";
import { TiptapCollabProvider, WebSocketStatus } from "@hocuspocus/provider";
import type { Doc as YDoc } from "yjs";

import { ExtensionKit } from "../extensions/extension-kit";
import { userColors, userNames } from "../lib/constants";
import { randomElement } from "../lib/utils";
import { EditorUser } from "../components/BlockEditor/types";
import { useSidebar } from "./useSidebar";
import { initialContent } from "../lib/data/initialContent";

declare global {
    interface Window {
        editor: Editor | null;
    }
}

export const useBlockEditor = (json?: JSON | any) => {
    console.log(json);
    const provider = null
    const leftSidebar = useSidebar();
    const [collabState, setCollabState] = useState<WebSocketStatus>(
        WebSocketStatus.Connecting,
    );

    const editor = useEditor(
        {
            autofocus: true,
            extensions: [
                ...ExtensionKit({
                    provider,
                }),
            ],
            editorProps: {
                attributes: {
                    autocomplete: "off",
                    autocorrect: "off",
                    autocapitalize: "off",
                    class: "min-h-full",
                },
            },
            content: json,
            editable: false,
        },
    );


    // window.editor = editor;

    return { editor };
};
