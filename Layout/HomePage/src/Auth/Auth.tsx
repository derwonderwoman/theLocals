import { useContext, useEffect, ReactNode } from "react";
import { ApplicationContext, AuthContext } from "../App";
import { useNavigate } from "react-router-dom";

interface AuthProps {
    children: ReactNode;
}

const Auth = ({ children }: AuthProps) => {
    const {loggedInUser:{token}} = useContext(AuthContext) as ApplicationContext;
    const nav = useNavigate();

    useEffect(() => {
        verify();
    }, []);

    const verify = async () => {
        if (!token){
            alert("You need to be logged in to access this page");
            nav("/");
        }
    };

    return <>{children}</> 
};

export default Auth;
