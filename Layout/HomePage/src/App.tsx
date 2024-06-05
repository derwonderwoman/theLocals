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

export type TokenType = {
  token: string;
  setToken: (token: string) => void;
};

export type TypeType = {
  type: string;
  setType: (type: string) => void;
};
export type AuthContextType = TokenType & TypeType;

export const AuthContext = createContext<AuthContextType>({type: "client"} as AuthContextType);

function App() {
  const [token, setToken] = useState<string>("");
  const [type, setType] = useState<string>("");

  return (
    <AuthContext.Provider value={{ token, setToken, type, setType }}>
    <div>
      <Routes>
        <Route path = "/" element = {<Home/>}/>
        <Route path = "/client/login" element = {<LoginClient/>}/>
        <Route path ='/register' element = {<RegistrationInput/>}/>
        <Route path = "/specialist/login" element = {<LoginSpec/>}/>
        <Route path = "/client/application" element = {<Auth><Application/></Auth>}/>
        <Route path = "/client/orderstatus" element = {<OrderStatus/>}/>
      </Routes>
    </div>
    </AuthContext.Provider>
  )
}

export default App;
