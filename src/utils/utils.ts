import { publicKeyFromSerialized } from '@mysten/sui.js'
import bs58 from 'bs58'

export const convertBase58toBase64 = (base58: string) => {
  const buffer = bs58.decode(base58)
  return Buffer.from(buffer).toString('base64')
}

export const getSuiAddress = (publicKeyBase58: string) => {
  if (!publicKeyBase58) return ''
  const address = publicKeyFromSerialized(
    'ED25519',
    convertBase58toBase64(publicKeyBase58)
  ).toSuiAddress()
  return '0x' + address
}
