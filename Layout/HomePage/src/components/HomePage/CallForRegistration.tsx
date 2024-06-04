import { Link } from "react-router-dom";

const CallForRegistration = () => {
    return (
        <div className="call">
            <h1 id="reg">You are not registered yet?</h1>
            <Link to="/register">
            <button>Sign in</button>
            </Link>
        </div>
    )
}

export default CallForRegistration;