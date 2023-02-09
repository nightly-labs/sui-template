import { PublicKey, publicKeyFromSerialized, Base64DataBuffer } from '@mysten/sui.js'
import { SuiNightly, WalletAdapter } from './types'

export class NightlyWalletAdapter implements WalletAdapter {
  _publicKey: PublicKey
  _connected: boolean
  constructor() {
    this._connected = false
    this._publicKey = publicKeyFromSerialized('ED25519', '')
  }

  get connected() {
    return this._connected
  }

  public async signAllTransactions(transactions: Base64DataBuffer[]): Promise<Uint8Array[]> {
    return await this._provider.signAllTransactions(transactions)
  }

  private get _provider(): SuiNightly {
    if ((window as any)?.nightly.aptos) {
      return (window as any).nightly.aptos
    } else {
      throw new Error('AptosNightly: aptos is not defined')
    }
  }

  get publicKey() {
    return this._publicKey
  }

  async signTransaction(transaction: Base64DataBuffer) {
    return await this._provider.signTransaction(transaction)
  }

  async signMessage(msg: string) {
    if (!this._provider) {
      return msg
    }

    return await this._provider.signMessage(msg)
  }

  async connect(onDisconnect?: () => void, eager?: boolean) {
    try {
      const pk = await this._provider.connect(onDisconnect, eager)
      console.log(pk)
      this._publicKey = pk
      this._connected = true
      return pk
    } catch (error) {
      console.log(error)
      throw new Error('User refused connection')
    }
  }

  async disconnect() {
    if (this._publicKey) {
      await this._provider.disconnect()
      this._publicKey = publicKeyFromSerialized('ED25519', '')
      this._connected = false
    }
  }
}
