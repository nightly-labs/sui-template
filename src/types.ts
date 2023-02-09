import '@mysten/sui.js'
import { PublicKey, Base64DataBuffer } from '@mysten/sui.js'

export interface WalletAdapter {
  publicKey: PublicKey
  connected: boolean
  signTransaction: (transaction: Base64DataBuffer) => Promise<Uint8Array>
  signAllTransactions: (transaction: Base64DataBuffer[]) => Promise<Uint8Array[]>
  connect: () => any
  disconnect: () => any
}

export declare class Nightly {
  aptos: SuiNightly
  private readonly _nightlyEventsMap
  constructor()
  invalidate(): void
}

export declare class SuiNightly {
  publicKey: PublicKey
  _onDisconnect: () => void
  private readonly _nightlyEventsMap
  constructor(eventMap: Map<string, (data: any) => any>)
  connect(onDisconnect?: () => void, eagerConnect?: boolean): Promise<PublicKey>
  disconnect(): Promise<void>
  signTransaction(tx: Base64DataBuffer): Promise<Uint8Array>
  signAllTransactions(txs: Base64DataBuffer[]): Promise<Uint8Array[]>
  signMessage(msg: string): Promise<Uint8Array>
}
