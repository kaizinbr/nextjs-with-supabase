'use client'

import { TiptapCollabProvider } from '@hocuspocus/provider'
import 'iframe-resizer/js/iframeResizer.contentWindow'
import { useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useLayoutEffect, useMemo, useState } from 'react'
import { Doc as YDoc } from 'yjs'

import { BlockEditor } from '../../components/BlockEditor'
import { useEditor, EditorContent } from '@tiptap/react'
import { createPortal } from 'react-dom'
import { Surface } from '../../components/ui/Surface'
import { Toolbar } from '../../components/ui/Toolbar'
import { Icon } from '../../components/ui/Icon'


export default function Document({ params }: { params: { room: string } }) {
    // const { isDarkMode, darkMode, lightMode } = useDarkmode()
    const [provider, setProvider] = useState<TiptapCollabProvider | null>(null)
    const [collabToken, setCollabToken] = useState<string | null>(null)
    const searchParams = useSearchParams()

    const hasCollab = parseInt(searchParams.get('noCollab') as string) !== 1

    const { room } = params

    useEffect(() => {
        // fetch data
        const dataFetch = async () => {
            const data = await (
                await fetch('/api/collaboration', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
            ).json()

            const { token } = data

            // set state when the data received
            setCollabToken(token)
        }

        dataFetch()
    }, [])

    const ydoc = useMemo(() => new YDoc(), [])

    useLayoutEffect(() => {
        if (hasCollab && collabToken) {
            setProvider(
                new TiptapCollabProvider({
                    name: `${process.env.NEXT_PUBLIC_COLLAB_DOC_PREFIX}${room}`,
                    appId: process.env.NEXT_PUBLIC_TIPTAP_COLLAB_APP_ID ?? '',
                    token: collabToken,
                    document: ydoc,
                }),
            )
        }
    }, [setProvider, collabToken, ydoc, room, hasCollab])

    if (hasCollab && (!collabToken || !provider)) return


    return (
        <div>
            <h1 id="\12599b3c-d749-4706-85f5-5852144f7553\" data-toc-id="12599b3c-d749-4706-85f5-5852144f7553\">CUZINHO ROSADO</h1><p>Welcome to our React Block Editor Template built on top of <a target=\"_blank\" rel=\"noopener noreferrer nofollow\" class=\"link\" href=\"https://tiptap.dev/\">Tiptap</a>, <a target=\"_blank\" rel=\"noopener noreferrer nofollow\" class=\"link\" href=\"https://nextjs.org/\">Next.js</a> and <a target=\"_blank\" rel=\"noopener noreferrer nofollow\" class=\"link\" href=\"https://tailwindcss.com/\">Tailwind</a>. This project can be a good starting point for your own implementation of a block editor.</p><pre><code>import { useEditor, EditorContent } from '@tiptap/react'\n\nfunction App() {\n  const editor = useEditor()\n\n  return &lt;EditorContent editor={editor} /&gt;\n}</code></pre><p>This editor includes feat ures like:</p><ul><li><p>A DragHandle including a DragHandle menu</p></li><li><p>A Slash menu that can be triggered via typing a <code>/</code> into an empty paragraph or by using the <strong>+ Button</strong> next to the drag handle</p></li><li><p>A TextFormatting menu that allows you to change the <span style=\"font-size: 18px\">font size</span>, <strong>font weight</strong>, <span style=\"font-family: Georgia\">font family</span>, <span style=\"color: #b91c1c\">color</span>, <mark data-color=\"#7e7922\" style=\"background-color: #7e7922; color: inherit\">highlight</mark> and more</p></li><li><p>A Table of Contents that can be viewed via clicking on the button on the top left corner</p></li><li><p>Live collaboration including content synchronization and collaborative cursors</p></li></ul><img src=\"/placeholder-image.jpg\" data-width=\"100%\" data-align=\"center\"><h2 id=\"02292aaa-9fe1-462d-8861-98b5e3883c24\" data-toc-id=\"02292aaa-9fe1-462d-8861-98b5e3883c24\">Get started</h2><p>To access our block editor template, simply head over to your <a target=\"_blank\" rel=\"noopener noreferrer nofollow\" class=\"link\" href=\"https://cloud.tiptap.dev/react-templates\">Tiptap Account</a> If you are not already a member, sign up for an account and complete the 2-minute React Template survey. Once finished, we will send you an invite to the private GitHub repository.</p><h2 id=\"cf02cb68-ca1b-41e8-b0fd-64d17ba826df\" data-toc-id=\"cf02cb68-ca1b-41e8-b0fd-64d17ba826df\">Installed extensions</h2><ul><li><p>@tiptap-pro/extension-drag-handle</p></li><li><p>@tiptap-pro/extension-drag-handle-react</p></li><li><p>@tiptap-pro/extension-emoji</p></li><li><p>@tiptap-pro/extension-file-handler</p></li><li><p>@tiptap-pro/extension-mathematics</p></li><li><p>@tiptap-pro/extension-node-range</p></li><li><p>@tiptap-pro/extension-table-of-contents</p></li><li><p>@tiptap-pro/extension-unique-id</p></li><li><p>@tiptap/extension-bullet-list</p></li><li><p>@tiptap/extension-character-count</p></li><li><p>@tiptap/extension-code-block</p></li><li><p>@tiptap/extension-code-block-lowlight</p></li><li><p>@tiptap/extension-collaboration</p></li><li><p>@tiptap/extension-collaboration-cursor</p></li><li><p>@tiptap/extension-color</p></li><li><p>@tiptap/extension-document</p></li><li><p>@tiptap/extension-dropcursor</p></li><li><p>@tiptap/extension-focus</p></li><li><p>@tiptap/extension-font-family</p></li><li><p>@tiptap/extension-heading</p></li><li><p>@tiptap/extension-highlight</p></li><li><p>@tiptap/extension-horizontal-rule</p></li><li><p>@tiptap/extension-image</p></li><li><p>@tiptap/extension-link</p></li><li><p>@tiptap/extension-ordered-list</p></li><li><p>@tiptap/extension-paragraph</p></li><li><p>@tiptap/extension-placeholder</p></li><li><p>@tiptap/extension-subscript</p></li><li><p>@tiptap/extension-superscript</p></li><li><p>@tiptap/extension-table</p></li><li><p>@tiptap/extension-table-header</p></li><li><p>@tiptap/extension-table-row</p></li><li><p>@tiptap/extension-task-item</p></li><li><p>@tiptap/extension-task-list</p></li><li><p>@tiptap/extension-text-align</p></li><li><p>@tiptap/extension-text-style</p></li><li><p>@tiptap/extension-typography</p></li><li><p>@tiptap/extension-underline</p></li></ul><p></p>
        </div>
    )
}
