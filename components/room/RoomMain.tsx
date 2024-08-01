'use client'

import { TiptapCollabProvider } from '@hocuspocus/provider'
import 'iframe-resizer/js/iframeResizer.contentWindow'
import { useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useLayoutEffect, useMemo, useState } from 'react'
import { Doc as YDoc } from 'yjs'

import { BlockEditor } from '@/components/BlockDisplay'
import { useEditor, EditorContent } from '@tiptap/react'
import { createPortal } from 'react-dom'
import { Surface } from '@/components/ui/Surface'
import { Toolbar } from '@/components/ui/Toolbar'
import { Icon } from '@/components/ui/Icon'
import { createClient } from '@/utils/supabase/client'
import ExtensionKit from '@/extensions/extension-kit-display'


export default function RoomMain({json}: { json: string}  ) {
    const editor = useEditor({
        extensions: [
            ...ExtensionKit(),
        ],
        content: json,
        editable: false,
    })


    return (
        <div className='displaying px-5'>
            <BlockEditor json={json} />
        </div>
    )
}
