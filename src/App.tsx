import { Typography } from '@mui/material'
import Button from '@mui/material/Button'
import { useState } from 'react'
import { NightlyWalletAdapter } from './nightly'
import './App.css'
import { devnetConnection, JsonRpcProvider, UnserializedSignableTransaction } from '@mysten/sui.js'
import { Collection } from './Collection'

export const DEFAULT_GAS_BUDGET = 10000
export const SUI_TOKEN_ADDRESS = '0x2::sui::SUI'
const NightlySui = new NightlyWalletAdapter()
const RECIPIENT = '0x5a1115abbde8f1c4e449ae0e27f6cec3a990ebd0'

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

            const object = await sui.getAllCoins(userAddress)
            const inputCoins = object.data
              .filter(item => item.coinType === SUI_TOKEN_ADDRESS)
              .map(item => item.coinObjectId)
            const tmpTransfer: UnserializedSignableTransaction = {
              kind: 'paySui',
              data: {
                inputCoins: inputCoins,
                recipients: [RECIPIENT],
                amounts: [100000],
                gasBudget: DEFAULT_GAS_BUDGET
              }
            }

            const signetTxParse = await NightlySui.signAndExecuteTransaction(tmpTransfer)
            const id = signetTxParse?.certificate.transactionDigest
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
        {/* ssds */}

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
