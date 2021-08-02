export interface Room {
  name?: string
  code: string
  startedAt: Date
  isPublic: boolean
  participants: number
  lastActivity: Date
}
