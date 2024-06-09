import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../App";

const LogOut = () => {
    const { setLoggedInUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const [showConfirmation, setShowConfirmation] = useState(false);

    const handleLogout = () => {
        setLoggedInUser({
            id: 0,
            email: "",
            first_name: "",
            last_name: "",
            phone_number: "",
            town: "",
            type: "client",
            token: ""
        });
    
        localStorage.removeItem('loggedInUser');
        navigate("/client/login");
    }

    return (
        <div>
            <button onClick={() => setShowConfirmation(true)} id="loginspec">Log Out</button>
            {showConfirmation && (
                <div>
                    <p>Are you sure you want to log out?</p>
                    <button onClick={handleLogout}>Yes</button>
                    <button onClick={() => setShowConfirmation(false)}>Cancel</button>
                </div>
            )}
        </div>
    );
}

export default LogOut;
