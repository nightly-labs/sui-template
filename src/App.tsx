import { Typography } from '@mui/material'
import Button from '@mui/material/Button'
import { devnetConnection, JsonRpcProvider, TransactionBlock } from '@mysten/sui.js'
import { useState } from 'react'
import './App.css'
import { RECIPIENT } from './utils/static'
import { NightlyWalletAdapter } from './NightlyWalletAdapter/nightly'
import { Collection } from './Collection'
import { SUI_DEVNET_CHAIN, WalletAccount } from '@mysten/wallet-standard'

function App() {
  const [userAddress, setUserAddress] = useState<string>('')
  const [activeAccount, setActiveAccount] = useState<WalletAccount | undefined>()
  const NightlySui = new NightlyWalletAdapter()
  const getAirdrop = async (address: string) => {
    try {
      if (!userAddress) return
      const sui = new JsonRpcProvider(devnetConnection)
      const airdrop = await sui.requestSuiFromFaucet(address)
      console.log(airdrop)
    } catch (e) {
      console.log('airdrop error')
      console.log(e)
    }
  }
  return (
    <div className='App'>
      <header className='App-header'>
        {/* <div>
          <Button
            variant='contained'
            onClick={() => {
              window.open('https://docs.nightly.app/docs/sui/sui/detecting')
            }}
            style={{ background: '#2680d9', marginBottom: '64px' }}>
            <img src={docs} style={{ width: '40px', height: '40px', paddingRight: '16px' }} />
            Open documentation
          </Button>
        </div> */}
        <Typography>{userAddress ? `Hello, ${userAddress}` : 'Hello, stranger'}</Typography>
        <Button
          variant='contained'
          style={{ margin: 10 }}
          onClick={async () => {
            const value = (await NightlySui.connect()).accounts
            setActiveAccount(value[0])
            console.log(value)
            setUserAddress(value[0].address)
            await getAirdrop(userAddress)
            // console.log(value.toString())
          }}>
          Connect Sui
        </Button>
        <Button
          variant='contained'
          style={{ margin: 10 }}
          onClick={async () => {
            if (!userAddress) return
            const sui = new JsonRpcProvider(devnetConnection)
            // const object = await sui.getAllCoins({ owner: userAddress })
            const tx = new TransactionBlock()
            const coin = tx.splitCoins(tx.gas, [tx.pure(100000)])
            tx.transferObjects([coin], tx.pure(RECIPIENT))
            const signetTxParse = await NightlySui.signAndExecuteTransactionBlock({
              transactionBlock: tx,
              account: activeAccount,
              chain: SUI_DEVNET_CHAIN
            })
            const id = signetTxParse.digest
            console.log(id)
          }}>
          Send test 0.001 SUI
        </Button>
        <Collection recipient={userAddress} NightlySui={NightlySui} activeAccount={activeAccount} />
        {/* <Button
          variant='contained'
          style={{ margin: 10 }}
          onClick={async () => {
            if (!userAddress) return
          }}>
          Send test 1000 SuiCoin x2
        </Button> */}

        <Button
          variant='contained'
          color='primary'
          style={{ margin: 10 }}
          onClick={async () => {
            if (!userAddress) {
              console.log('Error with connected')
              return
            }
            const messageToSign =
              'I like turtles I like turtlesI like turtlesI like turtlesI like turtles I like turtlesI like turtlesI like turtlesI like turtles I like turtlesI like turtlesI like turtlesI like turtles I like turtlesI like turtlesI like turtlesI like turtles I like turtlesI like turtlesI like turtlesI like turtles I like turtlesI like turtlesI like turtlesI like turtles I like turtlesI like turtlesI like turtlesI like turtles I like turtlesI like turtlesI like turtlesI like turtles I like turtlesI like turtlesI like turtlesI like turtles I like turtlesI like turtlesI like turtlesI like turtles I like turtlesI like turtlesI like turtlesI like turtles I like turtlesI like turtlesI like turtlesI like turtles I like turtlesI like turtlesI like turtlesI like turtles I like turtlesI like turtlesI like turtlesI like turtles I like turtlesI like turtlesI like turtlesI like turtles I like turtlesI like turtlesI like turtlesI like turtles I like turtlesI like turtlesI like turtlesI like turtles I like turtlesI like turtlesI like turtlesI like turtles I like turtlesI like turtlesI like turtlesI like turtles I like turtlesI like turtlesI like turtlesI like turtles I like turtlesI like turtlesI like turtlesI like turtles I like turtlesI like turtlesI like turtlesI like turtles I like turtlesI like turtlesI like turtlesI like turtles I like turtlesI like turtlesI like turtlesI like turtles I like turtlesI like turtlesI like turtlesI like turtles I like turtlesI like turtlesI like turtlesI like turtles I like turtlesI like turtlesI like turtles'
            const messageBytes = new TextEncoder().encode(messageToSign)

            const signedMessage = await NightlySui.signMessage({
              message: messageBytes,
              account: activeAccount
            })
            console.log(signedMessage)
          }}>
          Sign Message
        </Button>
        <Button
          variant='contained'
          color='secondary'
          style={{ margin: 10 }}
          onClick={async () => {
            await NightlySui.disconnect()
            setUserAddress('')
          }}>
          Disconnect Sui
        </Button>
      </header>
    </div>
  )
}

export default App
