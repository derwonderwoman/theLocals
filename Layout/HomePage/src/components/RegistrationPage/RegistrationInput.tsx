import axios from 'axios';
import { useState, useEffect, FormEvent, useContext } from 'react';
import Title from '../HomePage/Title';
import { useNavigate } from "react-router-dom";
import { BASE_URL, ISRAEL_CITIES } from '../../config';
import { AuthContext } from '../../App';


const RegistrationInput = () => { 

    const {type, setType} = useContext(AuthContext);
    
    const [israeliCities, setIsraeliCities] = useState<string[]>([]);
    const [town, setSelectedCity] = useState<string>("");
    const [first_name, setFirstName] = useState<string>("");
    const [last_name, setLastName] = useState<string>("");
    const [year_of_birth, setYear] = useState<number>();
    const [gender, setGender] = useState<string>("");
    const [phone_number, setPhone] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [specialisation, setServices] = useState<string[]>([]);
    const navigate = useNavigate();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${BASE_URL}/${type}/register`, {
                first_name,
                last_name,
                town,
                phone_number,
                year_of_birth,
                email,
                password,
                type,
                specialisation
            }, { withCredentials: true });

            if (response.status === 200) {
                alert("Registration successful!");
                setFirstName("");
                setLastName("");
                setYear(undefined);
                setGender("");
                setSelectedCity("");
                setPhone("");
                setEmail("");
                setPassword("");
                setType("client");
                setServices([]);

                navigate("/");
            }
        } catch (error) {
            console.log(error);
            alert("Registration failed. Please try again later.");
        }
    };


    useEffect(() => {
        const fetchCities = async () => {
            try {
                const response = await axios.get(ISRAEL_CITIES);                
                setIsraeliCities(response.data.data);
            } catch (error) {
                console.error('Error fetching Israeli cities:', error);
            }
        };

        fetchCities();
    }, []);

    const handleServiceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (specialisation.includes(value)) {
            setServices(specialisation.filter(service => service !== value));
        } else {
            setServices([...specialisation, value]);
        }
    };

    return (
        <>
        <Title/>
        <div className="registration-form">
            <h1>Registration Form</h1>
            <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input id="firstName" className="form-control" type="text" placeholder="Enter your first name" value={first_name} onChange={(e) => setFirstName(e.target.value)} required />
            </div>
            <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input id="lastName" className="form-control" type="text" placeholder="Enter your last name" value={last_name} onChange={(e) => setLastName(e.target.value)} required />
            </div>
            <div className="form-group">
                <label htmlFor="yearOfBirth">Year of Birth</label>
                <input id="yearOfBirth" className="form-control" type="number" placeholder="Enter your year of birth" value={year_of_birth} onChange={(e) => setYear(parseInt(e.target.value))} required />
            </div>
            <div className="form-group">
                <label htmlFor="gender">Gender</label>
                <select id="gender" className="form-control" value={gender} onChange={(e) => setGender(e.target.value)} required>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="city">City</label>
                <select id="city" className="form-control" value={town} onChange={(e) => setSelectedCity(e.target.value)}>
                    <option value="">Select City</option>
                    {israeliCities.map(city => (
                        <option key={city} value={city}>{city}</option>
                    ))}
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="mobilePhone">Mobile Phone</label>
                <input id="mobilePhone" className="form-control" type="tel" placeholder="Enter your mobile phone number" value={phone_number} onChange={(e) => setPhone(e.target.value)} required />
            </div>
            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input id="email" className="form-control" type="email" placeholder="Enter your email address" value={email} onChange={(e) => setEmail(e.target.value)}  required />
            </div>
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input id="password" className="form-control" type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <div className="form-group">
                <label>Account Type(If you want to register as both, please make it twice with different types)</label><br />
                <input id="client" type="radio" name="accountType" value="client" checked={type === "client"} onChange={() => setType("client")} />
                <label htmlFor="client">Client</label>
                <input id="specialist" type="radio" name="accountType" value="specialist" checked={type === "specialist"} onChange={() => setType("specialist")} />
                <label htmlFor="specialist">Specialist</label>
                {type === "specialist" && (
                    <div className="form-group">
                    <label>Services Offered</label><br />
                    <input type="checkbox" id="cleaning" value="cleaning" checked={specialisation.includes("cleaning")} onChange={handleServiceChange} />
                    <label htmlFor="cleaning">Cleaning</label>
                    <input type="checkbox" id="babysitting" value="babysitting" checked={specialisation.includes("babysitting")} onChange={handleServiceChange} />
                    <label htmlFor="babysitting">Babysitting</label>
                    <input type="checkbox" id="cooking" value="cooking" checked={specialisation.includes("cooking")} onChange={handleServiceChange} />
                    <label htmlFor="cooking">Preparing Food</label>
                </div>
                )}
            </div>
            <button type="submit" className="btn btn-primary">Register</button>
            </form>
        </div>
        </>
    )
}

export default RegistrationInput;