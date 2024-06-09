import CallForRegistration from "./CallForRegistration";
import LoginClient from './LoginClient';
import LoginSpec from './LoginSpec';
import Title from './Title';
import WelcomeInput from './WelcomeInput';


const Home = () => {

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

export default Home;