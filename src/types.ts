import '@mysten/sui.js'
import {
  ExecuteTransactionRequestType,
  SuiTransactionBlockResponseOptions,
  TransactionBlock,
  SuiTransactionBlockResponse,
  SignedMessage
} from '@mysten/sui.js'
import {
  StandardConnectInput,
  SuiSignAndExecuteTransactionBlockInput,
  SuiSignMessageInput,
  WalletAccount
} from '@mysten/wallet-standard'

export interface WalletAdapter extends SuiNightly {
  connected: boolean
}

export declare class Nightly {
  sui: SuiNightly
  constructor()
  invalidate(): void
}

export declare class SuiNightly {
  publicKey: string
  constructor(eventMap: Map<string, (data: any) => any>)
  connect(input: StandardConnectInput): Promise<{ accounts: WalletAccount[] }>
  signAndExecuteTransactionBlock: (
    inputs: SuiSignAndExecuteTransactionBlockInput
  ) => Promise<SuiTransactionBlockResponse>
  signMessage: (inputs: SuiSignMessageInput) => Promise<SignedMessage>
  disconnect(): Promise<void>
}
