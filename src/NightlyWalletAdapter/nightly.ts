import {
  SuiSignAndExecuteTransactionBlockInput,
  SuiSignMessageInput,
  WalletAccount
} from '@mysten/wallet-standard'
import { SuiNightly, WalletAdapter } from './types'

export class NightlyWalletAdapter implements WalletAdapter {
  _address: string
  _connected: boolean
  activeAccount: WalletAccount
  constructor() {
    this._connected = false
    this._address = ''
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
    return this._address
  }

  async signAndExecuteTransactionBlock(inputs: SuiSignAndExecuteTransactionBlockInput) {
    return await this._provider.signAndExecuteTransactionBlock(inputs)
  }

  async connect() {
    try {
      const connectionAccounts = await this._provider.connect({})
      this.activeAccount = connectionAccounts.accounts[0]
      this._address = connectionAccounts.accounts[0].address
      this._connected = true
      return connectionAccounts
    } catch (error) {
      console.log(error)
      throw new Error('User refused connection')
    }
  }

  async signMessage(input: SuiSignMessageInput) {
    try {
      const signature = await this._provider.signMessage(input)
      return signature
    } catch (error) {
      console.log(error)
      throw new Error('User refused sign message')
    }
  }

  async disconnect() {
    if (this._address) {
      await this._provider.disconnect()
      this._address = ''
      this._connected = false
    }
  }
}
