import { Typography } from '@mui/material'
import Button from '@mui/material/Button'
import { useState } from 'react'
import './App.css'
import { NightlyWalletAdapter } from './nightly'
import docs from './docs.png'
import { PublicKey, Base64DataBuffer } from '@mysten/sui.js'

const NightlySui = new NightlyWalletAdapter()

// const faucetClient = new FaucetClient(TESTNET_URL, FAUCET_URL)

function App() {
  const [userPublicKey, setUserPublicKey] = useState<PublicKey | undefined>(undefined)

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

        <Typography>
          {userPublicKey ? `Hello, ${userPublicKey.toSuiAddress()}` : 'Hello, stranger'}
        </Typography>
        <Button
          variant='contained'
          style={{ margin: 10 }}
          onClick={async () => {
            const value = await NightlySui.connect(() => {
              console.log('Trigger disconnect Sui')
              setUserPublicKey(undefined)
            })

            setUserPublicKey(value)
            console.log(value.toString())
          }}>
          Connect Sui
        </Button>
        <Button
          variant='contained'
          style={{ margin: 10 }}
          onClick={async () => {
            if (!userPublicKey) return
          }}>
          Send test 1000 SuiCoin
        </Button>
        <Button
          variant='contained'
          style={{ margin: 10 }}
          onClick={async () => {
            if (!userPublicKey) return
          }}>
          Send test 1000 SuiCoin x2
        </Button>

        <Button
          variant='contained'
          color='primary'
          style={{ margin: 10 }}
          onClick={async () => {
            if (!userPublicKey) {
              console.log('Error with connected')
              return
            }
            const messageToSign =
              'I like turtles I like turtlesI like turtlesI like turtlesI like turtles I like turtlesI like turtlesI like turtlesI like turtles I like turtlesI like turtlesI like turtlesI like turtles I like turtlesI like turtlesI like turtlesI like turtles I like turtlesI like turtlesI like turtlesI like turtles I like turtlesI like turtlesI like turtlesI like turtles I like turtlesI like turtlesI like turtlesI like turtles I like turtlesI like turtlesI like turtlesI like turtles I like turtlesI like turtlesI like turtlesI like turtles I like turtlesI like turtlesI like turtlesI like turtles I like turtlesI like turtlesI like turtlesI like turtles I like turtlesI like turtlesI like turtlesI like turtles I like turtlesI like turtlesI like turtlesI like turtles I like turtlesI like turtlesI like turtlesI like turtles I like turtlesI like turtlesI like turtlesI like turtles I like turtlesI like turtlesI like turtlesI like turtles I like turtlesI like turtlesI like turtlesI like turtles I like turtlesI like turtlesI like turtlesI like turtles I like turtlesI like turtlesI like turtlesI like turtles I like turtlesI like turtlesI like turtlesI like turtles I like turtlesI like turtlesI like turtlesI like turtles I like turtlesI like turtlesI like turtlesI like turtles I like turtlesI like turtlesI like turtlesI like turtles I like turtlesI like turtlesI like turtlesI like turtles I like turtlesI like turtlesI like turtlesI like turtles I like turtlesI like turtlesI like turtlesI like turtles I like turtlesI like turtlesI like turtles'
            const signedMessage = await NightlySui.signMessage(messageToSign)
            console.log(signedMessage)
          }}>
          Sign Message
        </Button>

        {/* <Button
          variant='contained'
          style={{ margin: 10 }}
          onClick={async () => {
            await NightlySui.disconnect()
          }}>
          Disconnect Sui
        </Button> */}
      </header>
    </div>
  )
}

export default App
