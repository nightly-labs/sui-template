import {
  publicKeyFromSerialized,
  SignableTransaction,
  ExecuteTransactionRequestType
} from '@mysten/sui.js'
import { SuiNightly, WalletAdapter } from './types'
import { getSuiAddress } from './utils/utils'

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

  async signAndExecuteTransaction(
    transaction: SignableTransaction,
    options?: {
      requestType?: ExecuteTransactionRequestType
    }
  ) {
    return await this._provider.signAndExecuteTransaction(transaction, options)
  }

  async connect(onDisconnect?: () => void, eager?: boolean) {
    try {
      const pk = await this._provider.connect(onDisconnect, eager)
      console.log(pk)
      this._publicKey = getSuiAddress(pk)
      this._connected = true
      return getSuiAddress(pk)
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
