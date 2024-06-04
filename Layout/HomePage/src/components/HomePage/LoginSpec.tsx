import { Link } from "react-router-dom";

const LoginSpec = () => {
    return (
        <div>
            <Link to="/specialist/login">
                <button id="loginspec">Log in for specialists</button>
            </Link>
        </div>
    );
}

export default LoginSpec;