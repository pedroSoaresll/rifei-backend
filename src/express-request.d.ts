import { UserParticipantInstance } from 'App/Models/UserParticipant'

declare namespace Express {
  export interface Request {
     userParticipant?: UserParticipantInstance;
  }
}
