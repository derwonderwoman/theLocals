import { Link } from "react-router-dom";

const WelcomeInput = () => {
    return (
        <div className="welcome-container">
            <h1 className="heading">find your specialist</h1>
            <div className="input-container">
                <input className="form-control form-control-lg" type="text" placeholder="f.e. cleaning"></input>
                <Link to="/client/login">
                <button className="bigger-button">find</button>
                </Link>
            </div>
        </div>
    )
}

export default WelcomeInput;