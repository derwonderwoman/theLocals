import CallForRegistration from "./CallForRegistration";
import LoginClient from './LoginClient';
import LoginSpec from './LoginSpec';
import Title from './Title';
import WelcomeInput from './WelcomeInput';
import { useContext } from "react";
import { AuthContext } from "../../App";
import LogOut from "./Logout";


const Home = () => {
  const {loggedInUser} = useContext(AuthContext);

  return (
    <>
      <Title/>
      <CallForRegistration/>
      <WelcomeInput/>
      {
        !loggedInUser && (
          <>
              <LoginSpec/>
              <LoginClient/>
          </>
        )
      }
      {
        loggedInUser && (
          <>
              <LogOut/>
          </>
        )
      }

    </>
  )
}

export default Home;