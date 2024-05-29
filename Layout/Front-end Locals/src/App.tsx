import './App.css'
import CallForRegistration from './components/CallForRegistration'
import LoginClient from './components/LoginClient'
import LoginSpec from './components/LoginSpec'
import Title from './components/Title'
import WelcomeInput from './components/WelcomeInput'

function App() {

  return (
    <>
      <Title/>
      <CallForRegistration/>
      <WelcomeInput/>
      <LoginSpec/>
      <LoginClient/>
    </>
  )
}

export default App
