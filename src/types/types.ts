export enum EnumSocketClientEvents {
  MESSAGE = 'MESSAGE',
  DISCONNECT = 'DISCONNECT',
}

export enum EnumBESocketEvents {
  BE_MESSAGE = 'BE_MESSAGE',
  BE_DISCONNECT = 'BE_DISCONNECT',
}

export interface DisconnectEvent {
  user: string
  date: Date
}
