import { WebSocketStatus } from '@hocuspocus/provider'

export const getConnectionText = (collabState: WebSocketStatus) => {
  switch (collabState) {
    case WebSocketStatus.Connected:
      return `Salvo`

    case WebSocketStatus.Connecting:
      return `Salvando...`

    case WebSocketStatus.Disconnected:
      return `Desconectado`

    default:
      return `Conectando...`
  }
}
