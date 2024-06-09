import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../App";

const LogOut = () => {
    const { setLoggedInUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        setLoggedInUser({
            id:0,
            email:"",
            first_name:"",
            last_name:"",
            phone_number:"",
            town:"",
            type:"client",
            token: ""
        });
    
        localStorage.removeItem('loggedInUser');
        navigate("/");
    }

    return (
        <div>
            <button onClick={handleLogout} id="loginspec">Log Out</button>
        </div>
    );
}

export default LogOut;