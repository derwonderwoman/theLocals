import { useState} from 'react';
import Title from '../HomePage/Title';

const LoginClient = ({page}) => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    

    return (
        <>
            <Title/>
        <div className='login-container'>
           <h1> Login </h1>
           <div className="form-group">
                <label htmlFor="email">Email</label>
                <input id="email" className="form-control" type="email" placeholder="Enter your email address" value={email} onChange={(e) => setEmail(e.target.value)}  required />
            </div>
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input id="password" className="form-control" type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </div>
        </>
        
    )
}

export default LoginClient;