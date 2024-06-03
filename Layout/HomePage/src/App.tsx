import './App.css';
import {Routes, Route} from "react-router-dom";
import Home from './components/HomePage/Home';
import Application from './components/ApplicationForm/Aplication';
import LoginClient from './components/LoginClient/LoginClient';
import LoginSpec from './components/LoginSpec/LoginSpec';
import RegistrationInput from './components/RegistrationPage/RegistrationInput';
import SpecOrders from './components/SpecOrders/SpecOrders';
import {useState, createContext} from "react";
import Auth from './Auth/Auth';
import React from 'react';

type tokenType = {
  token: "",
  setToken: (token: string) => {}, 
}

type typeType = {
  type: "", 
  setType: (type: string) => {} 
}
export const AuthContext = createContext<tokenType,typeType>({});

function App() {
  const [token, setToken] = useState<string>("");
  const[type, setType] = useState<string>("");

  return (
    <AuthContext.Provider value = {{token, setToken, type, setType}}>
    <div>
      <Routes>
        <Route path = "/" element = {<Home/>}/>
        <Route path = "/application" element ={<Application/>}/>
        <Route path = "clients/login" element = {<LoginClient/>}/>
        <Route path ='/register' element = {<RegistrationInput/>}/>
        <Route path = "specialists/login" element = {<LoginSpec/>}/>
        <Route path = "/specorders" element = {<SpecOrders/>}/>
      </Routes>
    </div>
    </AuthContext.Provider>
  )
}

export default App;
