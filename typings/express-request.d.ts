import { UserParticipantInstance } from 'App/Models/UserParticipant'

declare module 'express' {
  export interface Request {
     userParticipant?: UserParticipantInstance;
  }
}
