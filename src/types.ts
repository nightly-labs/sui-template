import '@mysten/sui.js'
import {
  PublicKey,
  SignableTransaction,
  ExecuteTransactionRequestType,
  SuiTransactionResponse
} from '@mysten/sui.js'

export interface WalletAdapter {
  publicKey: string
  connected: boolean
  signAndExecuteTransaction: (
    transaction: SignableTransaction,
    options?: {
      requestType?: ExecuteTransactionRequestType
    }
  ) => Promise<SuiTransactionResponse>
  connect: () => any
  disconnect: () => any
}

export declare class Nightly {
  sui: SuiNightly
  private readonly _nightlyEventsMap
  constructor()
  invalidate(): void
}

export declare class SuiNightly {
  publicKey: string
  _onDisconnect: () => void
  private readonly _nightlyEventsMap
  constructor(eventMap: Map<string, (data: any) => any>)
  connect(onDisconnect?: () => void, eagerConnect?: boolean): Promise<string>
  disconnect(): Promise<void>
  signAndExecuteTransaction: (
    transaction: SignableTransaction,
    options?: {
      requestType?: ExecuteTransactionRequestType
    }
  ) => Promise<SuiTransactionResponse>
}
