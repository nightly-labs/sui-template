import { Button } from '@mui/material'
import { devnetConnection, JsonRpcProvider, TransactionBlock } from '@mysten/sui.js'
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

  const signAndSend = async () => {
    const tx = new TransactionBlock()
    tx.moveCall({
      target: `${DEV_PACKAGE_MOVE_NFT_ADDRESS}::devnet_nft::mint`,
      typeArguments: [],
      arguments: [
        tx.pure('some name'),
        tx.pure('some description'),
        tx.pure(
          'https://cdn.britannica.com/94/194294-138-B2CF7780/overview-capybara.jpg?w=800&h=450&c=crop'
        )
      ]
    })

    // const transaction = {
    //   kind: 'moveCall',
    //   data: {
    //     packageObjectId: DEV_PACKAGE_MOVE_NFT_ADDRESS,
    //     module: 'devnet_nft',
    //     function: 'mint',
    //     typeArguments: [],
    //     arguments: [
    //       `Nightly NFT #${randomNumber}`,
    //       'Created by Nightly for testing (https://wallet.nightly.app/)',
    //       fenecImages[Math.floor(Math.random() * fenecImages.length)]
    //     ],
    //     gasBudget: DEFAULT_GAS_BUDGET
    //   }
    // }
    const signetTxParse = await props.NightlySui.signAndExecuteTransaction(tx)
    const data = await sui.getTransactionBlock({ digest: signetTxParse.digest })
    console.log(data)
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
