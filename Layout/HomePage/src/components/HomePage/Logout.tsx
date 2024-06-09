import { Link } from "react-router-dom";

const LogOut = () => {
    return (
        <div>
            <Link to="/specialist/login">
                <button id="loginspec">Log Out</button>
            </Link>
        </div>
    );
}

export default LogOut;