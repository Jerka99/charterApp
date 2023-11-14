import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Form from './components/Form'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Form provider="Google" url = "/.netlify/functions/mailer"/>
      <Form provider="Brevo with SMTP KEY" url = "/.netlify/functions/brevoNodemailer"/>
      {/* <Form provider="Brevo with API" url = "/.netlify/functions/brevoMailer"/> */}

    </>
  )
}

export default App
