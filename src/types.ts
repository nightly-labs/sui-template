import '@mysten/sui.js'
import {
  ExecuteTransactionRequestType,
  SuiTransactionBlockResponseOptions,
  TransactionBlock,
  SuiTransactionBlockResponse
} from '@mysten/sui.js'

export interface WalletAdapter {
  publicKey: string
  connected: boolean
  signAndExecuteTransaction: (
    transaction: TransactionBlock,
    requestType?: ExecuteTransactionRequestType,
    options?: SuiTransactionBlockResponseOptions
  ) => Promise<SuiTransactionBlockResponse>
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
  signAndExecuteTransactionBlock: (
    transaction: TransactionBlock,
    requestType?: ExecuteTransactionRequestType,
    options?: SuiTransactionBlockResponseOptions
  ) => Promise<SuiTransactionBlockResponse>
}
