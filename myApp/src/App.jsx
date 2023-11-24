import { useState, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Form from './components/Form'
import Header from './components/Header'
import Gallery from './components/Gallery'
import About from './components/About'

function App() {
  const [form, setForm] = useState(false)
  const aboutRef = useRef()

  const scrollTo = (el) => {
    el.scrollIntoView({ behavior: 'smooth' });
  };


  return (
    <>
    <Header aboutRef={aboutRef} scrollTo={scrollTo} setForm={setForm}/>
    <About aboutRef={aboutRef}/>
    <Gallery />

      {/* {form && <Form provider="Google" url = "/.netlify/functions/mailer"/>} */}
      {form && <Form  provider="Brevo with SMTP KEY" url = "/.netlify/functions/brevoNodemailer" setForm={setForm}/>}

    </>
  )
}

export default App
