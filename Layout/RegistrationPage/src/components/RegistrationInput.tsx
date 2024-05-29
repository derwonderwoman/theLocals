import axios from 'axios';
import { useState, useEffect } from 'react';


const RegistrationInput = () => {
    const [israeliCities, setIsraeliCities] = useState<string[]>([]);
    const [selectedCity, setSelectedCity] = useState<string>("");
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [year, setYear] = useState<number>();
    const [gender, setGender] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [type, setType] = useState<string>("client");
    const [services, setServices] = useState<string[]>([]);


    useEffect(() => {
        const fetchCities = async () => {

            try {
                const response = await axios.get('http://api.geonames.org/searchJSON', {
                    params: {
                        country: 'IL',
                        username: 'derwonderwoman', 
                    }
                });
                const data = response.data.geonames.map((city: any) => city.name);
                setIsraeliCities(data);
            } catch (error) {
                console.error('Error fetching Israeli cities:', error);
            }
        };

        fetchCities();
    }, []);

    const handleServiceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (services.includes(value)) {
            setServices(services.filter(service => service !== value));
        } else {
            setServices([...services, value]);
        }
    };

    return (
        <div className="registration-form">
            <h1>Registration Form</h1>
            <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input id="firstName" className="form-control" type="text" placeholder="Enter your first name" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
            </div>
            <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input id="lastName" className="form-control" type="text" placeholder="Enter your last name" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
            </div>
            <div className="form-group">
                <label htmlFor="yearOfBirth">Year of Birth</label>
                <input id="yearOfBirth" className="form-control" type="number" placeholder="Enter your year of birth" value={year} onChange={(e) => setYear(parseInt(e.target.value))} required />
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
                <select id="city" className="form-control" value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)}>
                    <option value="">Select City</option>
                    {israeliCities.map(city => (
                        <option key={city} value={city}>{city}</option>
                    ))}
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="mobilePhone">Mobile Phone</label>
                <input id="mobilePhone" className="form-control" type="tel" placeholder="Enter your mobile phone number" value={phone} onChange={(e) => setPhone(e.target.value)} required />
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
                    <input type="checkbox" id="cleaning" value="cleaning" checked={services.includes("cleaning")} onChange={handleServiceChange} />
                    <label htmlFor="cleaning">Cleaning</label>
                    <input type="checkbox" id="babysitting" value="babysitting" checked={services.includes("babysitting")} onChange={handleServiceChange} />
                    <label htmlFor="babysitting">Babysitting</label>
                    <input type="checkbox" id="cooking" value="cooking" checked={services.includes("cooking")} onChange={handleServiceChange} />
                    <label htmlFor="cooking">Cooking</label>
                </div>
                )}
            </div>
            <button type="submit" className="btn btn-primary">Register</button>
        </div>
    )
}

export default RegistrationInput;