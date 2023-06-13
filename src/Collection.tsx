import { Button } from '@mui/material'
import { devnetConnection, JsonRpcProvider, TransactionBlock } from '@mysten/sui.js'
import { NightlyWalletAdapter } from './NightlyWalletAdapter/nightly'

interface ICollection {
  recipient: string
  NightlySui: NightlyWalletAdapter
}

export const Collection: React.FC<ICollection> = props => {
  const sui = new JsonRpcProvider(devnetConnection)
  const DEV_PACKAGE_MOVE_NFT_ADDRESS = '0x2'

  const signAndSend = async () => {
    const transactionBlock = new TransactionBlock()
    transactionBlock.moveCall({
      target: `${DEV_PACKAGE_MOVE_NFT_ADDRESS}::devnet::mint`,
      typeArguments: [],
      arguments: [
        transactionBlock.pure('some name'),
        transactionBlock.pure('some description'),
        transactionBlock.pure(
          'https://cdn.britannica.com/94/194294-138-B2CF7780/overview-capybara.jpg?w=800&h=450&c=crop'
        )
      ]
    })

    const signetTxParse = await props.NightlySui.signAndExecuteTransactionBlock({
      transactionBlock
    })
    const data = await sui.getTransactionBlock({ digest: signetTxParse.digest })
    console.log(data.digest)
  }
  return (
    <Button
      variant='contained'
      style={{ margin: 10 }}
      onClick={async () => {
        await signAndSend()
      }}>
      Create random collection
    </Button>
  )
}
