import { useContext, useEffect, useState, ReactNode } from "react";
import { AuthContext } from "../App";
import axios from "axios";
import LoginClient from "../components/LoginClient/LoginClient"; 
import LoginSpec from "../components/LoginSpec/LoginSpec";

interface AuthProps {
    children: ReactNode;
}

interface Token {
    token: string | null;
    type: string;
}
const Auth = ({ children }: AuthProps) => {
    const { token, type} = useContext(AuthContext) as Token;
    const [redirect, setRedirect] = useState<boolean>(false);

    useEffect(() => {
        verify();
    }, []);

    const verify = async () => {
        try {
            const response = await axios.get(`${process.env.BASE_URL}/${type}/verify`, {
                headers: {
                    "x-access-token": token
                },
                withCredentials: true,
            });
            if (response.status === 200) setRedirect(true);
        } catch (error) {
            setRedirect(false);
        }
    };

    return redirect ? <>{children}</> : type === "client" ? <LoginClient/> : <LoginSpec/>;
};

export default Auth;
