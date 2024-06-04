import { Link } from "react-router-dom";

const LoginClient = () => {
    return (
        <div>
            <Link to="/client/login">
                <button id="logincl">Log in for clients</button>
            </Link>
        </div>
    );
}

export default LoginClient;

