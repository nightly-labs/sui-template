import { Typography } from '@mui/material'
import Button from '@mui/material/Button'
import { devnetConnection, JsonRpcProvider, TransactionBlock } from '@mysten/sui.js'
import { useState } from 'react'
import './App.css'
import { RECIPIENT } from './utils/static'
import { NightlyWalletAdapter } from './NightlyWalletAdapter/nightly'
import { Collection } from './Collection'

function App() {
  const [userAddress, setUserAddress] = useState<string>('')
  const NightlySui = new NightlyWalletAdapter()
  const sui = new JsonRpcProvider(devnetConnection)

  const getAirdrop = async (address: string) => {
    try {
      if (!userAddress) return
      await sui.requestSuiFromFaucet(address)
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
            const value = await NightlySui.connect(() => {
              console.log('Trigger disconnect Sui')
              setUserAddress(undefined)
            })
            setUserAddress(value)
            try {
              await getAirdrop(userAddress)
            } catch {
              console.log('failed to get airdrop')
            }
          }}>
          Connect Sui
        </Button>
        <Button
          variant='contained'
          style={{ margin: 10 }}
          onClick={async () => {
            if (!userAddress) return
            const transactionBlock = new TransactionBlock()
            const coin = transactionBlock.splitCoins(transactionBlock.gas, [
              transactionBlock.pure(100)
            ])
            transactionBlock.transferObjects([coin], transactionBlock.pure(RECIPIENT))
            await NightlySui.signAndExecuteTransactionBlock({ transactionBlock })
          }}>
          Send test 0.001 SUI
        </Button>
        {/* <Collection recipient={userAddress} NightlySui={NightlySui} userAddress={userAddress} /> */}
        {/* <Button
          variant='contained'
          style={{ margin: 10 }}
          onClick={async () => {
            if (!userAddress) return
          }}>
          Send test 1000 SuiCoin x2
        </Button> */}

        {/* <Button
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
            const signedMessage = await NightlySui.signMessage(messageToSign)
            console.log(signedMessage)
          }}>
          Sign Message
        </Button> */}
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
