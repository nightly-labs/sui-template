import { Button } from '@mui/material'
import {
  devnetConnection,
  JsonRpcProvider,
  MoveCallTransaction,
  SuiJsonValue,
  UnserializedSignableTransaction
} from '@mysten/sui.js'
import { DEFAULT_GAS_BUDGET } from './App'
import { NightlyWalletAdapter } from './nightly'
import { fenecImages } from './utils/const'

interface ICollection {
  recipient: string
  NightlySui: NightlyWalletAdapter
}

export const Collection: React.FC<ICollection> = props => {
  const sui = new JsonRpcProvider(devnetConnection)
  const DEV_PACKAGE_MOVE_NFT_ADDRESS = '0x2'
  const randomNumber = Math.floor(Math.random() * 100000)
  const transaction: UnserializedSignableTransaction = {
    kind: 'moveCall',
    data: {
      packageObjectId: DEV_PACKAGE_MOVE_NFT_ADDRESS,
      module: 'devnet_nft',
      function: 'mint',
      typeArguments: [],
      arguments: [
        `Nightly NFT #${randomNumber}`,
        'Created by Nightly for testing (https://wallet.nightly.app/)',
        fenecImages[Math.floor(Math.random() * fenecImages.length)]
      ],
      gasBudget: DEFAULT_GAS_BUDGET
    }
  }

  const signeAndSend = async () => {
    const signetTxParse = await props.NightlySui.signAndExecuteTransaction(transaction)

    const id = signetTxParse?.certificate.transactionDigest
    console.log(id)
  }
  return (
    <Button
      variant='contained'
      style={{ margin: 10 }}
      onClick={async () => {
        await signeAndSend()
      }}>
      Create random collection
    </Button>
  )
}
