import './App.css';
import {Routes, Route} from "react-router-dom";
import Home from './components/HomePage/Home';
import LoginClient from './components/LoginClient/LoginClient';
import LoginSpec from './components/LoginSpec/LoginSpec';
import RegistrationInput from './components/RegistrationPage/RegistrationInput';
import Application from './components/ApplicationForm/Aplication';
import {useState, createContext} from "react";
import OrderStatus from './components/ApplicationForm/OrderStatus';
import Auth from './Auth/Auth';
import OrdersList from './components/ApplicationForm/OrdersList';

interface LoggedInUser {
  id:number;
  email:string;
  first_name:string;
  last_name:string;
  phone_number:string;
  town:string;
  type:"client" | "specialist";
  token: string;
}

export type ApplicationContext = {
  loggedInUser: LoggedInUser;
  setLoggedInUser: (u:LoggedInUser) => void;
};

const ctx = {} as ApplicationContext 

if (localStorage.getItem("loggedInUser")) {
  ctx.loggedInUser = JSON.parse(localStorage.getItem("loggedInUser") as string)
}

export const AuthContext = createContext<ApplicationContext>(ctx);

function App() {
  const[loggedInUser, setLoggedInUser] = useState(ctx.loggedInUser)

  return (
    <AuthContext.Provider value={{ loggedInUser, setLoggedInUser }}>
    <div>
      <Routes>
        <Route path = "/" element = {<Home/>}/>
        <Route path = "/client/login" element = {<LoginClient/>}/>
        <Route path ='/register' element = {<RegistrationInput/>}/>
        <Route path = "/specialist/login" element = {<LoginSpec/>}/>
        <Route path = "/client/application" element = {<Auth><Application/></Auth>}/>
        <Route path = "/client/orderstatus" element = {<Auth><OrderStatus/></Auth>}/>
        <Route path = "/specialist/orderslist" element = {<Auth><OrdersList type="specialist" /></Auth>}/>
        <Route path = "/client/orderslist" element = {<Auth><OrdersList type="client" /></Auth>} />
      </Routes>
    </div>
    </AuthContext.Provider>
  )
}

export default App;
