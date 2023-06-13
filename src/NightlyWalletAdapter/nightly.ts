import {
  type ExecuteTransactionRequestType,
  type SuiTransactionBlockResponseOptions,
  type TransactionBlock
} from '@mysten/sui.js'
import { WalletAdapter, type SuiNightly } from './types'

export class NightlyWalletAdapter implements WalletAdapter {
  _publicKey: string
  _connected: boolean
  constructor() {
    this._connected = false
    this._publicKey = ''
  }

  get connected() {
    return this._connected
  }

  private get _provider(): SuiNightly {
    if ((window as any)?.nightly.sui) {
      return (window as any).nightly.sui
    } else {
      throw new Error('SuiNightly: sui is not defined')
    }
  }

  get publicKey() {
    return this._publicKey
  }

  async signAndExecuteTransactionBlock(input: {
    transactionBlock: TransactionBlock
    requestType?: ExecuteTransactionRequestType
    options?: SuiTransactionBlockResponseOptions
  }) {
    return await this._provider.signAndExecuteTransactionBlock(input)
  }

  async connect(onDisconnect?: () => void, eager?: boolean) {
    try {
      const pk = await this._provider.connect(onDisconnect, eager)
      this._publicKey = pk.accounts[0].address
      this._connected = true
      return pk.accounts[0].address
    } catch (error) {
      console.log(error)
      throw new Error('User refused connection')
    }
  }

  async disconnect() {
    if (this._publicKey) {
      await this._provider.disconnect()
      this._publicKey = ''
      this._connected = false
    }
  }
}
