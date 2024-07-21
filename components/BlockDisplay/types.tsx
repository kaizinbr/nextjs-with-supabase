import { TiptapCollabProvider } from '@hocuspocus/provider'
import type { Doc as YDoc } from 'yjs'

export interface TiptapProps {
  hasCollab: boolean
  ydoc: YDoc
  provider?: TiptapCollabProvider | null | undefined
  room?: string
}


export interface TiptapDisplayProps {
    hasCollab: boolean
    ydoc: YDoc
    provider?: TiptapCollabProvider | null | undefined
    json?: string
    room?: string
  }
  

export type EditorUser = {
  clientId: string
  name: string
  color: string
  initials?: string
}
