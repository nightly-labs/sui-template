import '@mysten/sui.js'
import {
  type ExecuteTransactionRequestType,
  type SuiTransactionBlockResponse,
  type SuiTransactionBlockResponseOptions,
  type TransactionBlock
} from '@mysten/sui.js'

export interface WalletAdapter {
  publicKey: string
  connected: boolean
  signAndExecuteTransactionBlock: (input: {
    transactionBlock: TransactionBlock
    requestType?: ExecuteTransactionRequestType
    options?: SuiTransactionBlockResponseOptions
  }) => Promise<SuiTransactionBlockResponse>
  connect: () => any
  disconnect: () => any
}

export declare class Nightly {
  sui: SuiNightly
  private readonly _nightlyEventsMap
  constructor()
  invalidate(): void
}

export type WalletIcon = `data:image/${'svg+xml' | 'webp' | 'png' | 'gif'};base64,${string}`
export interface WalletAccount {
  readonly address: string
  readonly publicKey: Uint8Array
  readonly chains: readonly `${string}:${string}`[]
  readonly features: readonly `${string}:${string}`[]
  readonly label?: string
  readonly icon?: WalletIcon
}

export declare class SuiNightly {
  publicKey: string
  _onDisconnect: () => void
  private readonly _nightlyEventsMap
  constructor(eventMap: Map<string, (data: any) => any>)
  connect(onDisconnect?: () => void, eagerConnect?: boolean): Promise<{ accounts: WalletAccount[] }>
  disconnect(): Promise<void>
  signAndExecuteTransactionBlock: (input: {
    transactionBlock: TransactionBlock
    requestType?: ExecuteTransactionRequestType
    options?: SuiTransactionBlockResponseOptions
  }) => Promise<SuiTransactionBlockResponse>
}
