import { Dorayaki } from "../dorayaki/Dorayaki"
export enum InboundStatus {
  REQUESTING = "wait",
  ACCEPTED = "acpt",
  REJECTED = "rejc",
  RECEIVED = "recv",
}

export interface Inbound {
  id: number
  note: string
  dorayaki: Dorayaki
  amount: number
  status: InboundStatus
  createdAt: Date
}
