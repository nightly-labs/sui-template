import { Typography } from '@mui/material'
import Button from '@mui/material/Button'
import { useState } from 'react'
import { NightlyWalletAdapter } from './nightly'
import './App.css'
import { devnetConnection, JsonRpcProvider, TransactionBlock } from '@mysten/sui.js'
import { Collection } from './Collection'

export const DEFAULT_GAS_BUDGET = 10000
export const SUI_TOKEN_ADDRESS = '0x2::sui::SUI'
const NightlySui = new NightlyWalletAdapter()
const RECIPIENT = '0xde06e7ab60f89597530356efddda07b8146245063e5de5e18f646274d15a331d'

function App() {
  const [userAddress, setUserAddress] = useState<string>('')

  const sui = new JsonRpcProvider(devnetConnection)
  const getAirdrop = async (address: string) => {
    try {
      if (!userAddress) return
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
            const value = await NightlySui.connect(() => {
              console.log('Trigger disconnect Sui')
              setUserAddress(undefined)
            })
            console.log(value)
            setUserAddress(value)
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

            const object = await sui.getAllCoins({ owner: userAddress })
            const tx = new TransactionBlock()
            const coin = tx.splitCoins(tx.gas, [tx.pure(100000)])
            tx.transferObjects([coin], tx.pure(RECIPIENT))
            const signetTxParse = await NightlySui.signAndExecuteTransaction(tx)
            const id = signetTxParse.digest
          }}>
          Send test 0.001 SUI
        </Button>
        <Collection recipient={userAddress} NightlySui={NightlySui} />
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
          }}>
          Disconnect Sui
        </Button>
      </header>
    </div>
  )
}

export default App
