import { useState, useContext, FormEvent } from 'react';
import Title from '../HomePage/Title';
import axios from "axios";
import { AuthContext } from '../../App';
import { useNavigate } from "react-router-dom";


const LoginSpec = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const { setToken } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/specialist/login", {
                email,
                password 
            }, { withCredentials: true });

            if (response.status === 200) {
                setToken(response.data);
                navigate("/");
            }
        } catch (error) {
            console.log(error);
            setToken("");
        }
    };

    return (
        <>
            <Title/>
            <div className='login-container'>
                <h1> Login for a specialist</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input id="email" className="form-control" type="email" placeholder="Enter your email address" value={email} onChange={(e) => setEmail(e.target.value)}  required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input id="password" className="form-control" type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
                <hr />
                <h2> Please login first and we will find you your best match!</h2>
                <h3>If you are not registered yet, please sign in <a href='/register'>here</a></h3>
            </div>
        </>
    );
};

export default LoginSpec;