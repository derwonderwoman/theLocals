import { useContext, useEffect, ReactNode } from "react";
import { AuthContext } from "../App";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface AuthProps {
    children: ReactNode;
}

interface Token {
    token: string | null;
    type: string;
}
const Auth = ({ children }: AuthProps) => {
    const { token, type} = useContext(AuthContext) as Token;
    const nav = useNavigate();

    useEffect(() => {
        verify();
    }, []);

    const verify = async () => {
        const response = await axios.get(`${process.env.BASE_URL}/${type}/verify`, {
            headers: {
                "x-access-token": token
            },
            withCredentials: true,
        });
        if (response.status != 200) {
            type === "client" ? nav("/client/login") : nav("/specialist/login")
        }
    };

    return <>{children}</> 
};

export default Auth;
