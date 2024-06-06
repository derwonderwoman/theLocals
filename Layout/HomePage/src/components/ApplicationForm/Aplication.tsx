import { useState, useEffect, FormEvent, useContext} from 'react';
import Title from '../HomePage/Title';
import axios from 'axios';
import { ISRAEL_CITIES } from '../../config';
import { BASE_URL } from '../../config';
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../../App';



const Application = () => {
    const {loggedInUser} = useContext(AuthContext);
    const [israeliCities, setIsraeliCities] = useState<string[]>([]);
    const [town, setSelectedCity] = useState<string>(loggedInUser.town);
    const [specialisation, setType] = useState<string>("")
    const [date, setDate] = useState<Date>(new Date());
    const [time, setSelectedTime] = useState<string>("");
    const [rate_per_hour, setRate] = useState<number>();
    
    const services = ["Cleaning", "Babysitting", "Preparing food"];
    const navigate = useNavigate();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${BASE_URL}/client/application`,{
                town,
                specialisation,
                date,
                time,
                rate_per_hour,
                status:'pending',
                client_id: loggedInUser.id,
            }, { withCredentials: true, 
                headers:{
                    "x-access-token":loggedInUser.token,
                } });

            if (response.status === 200) {
                alert(`Your order #${response.data.id} was succesfully created`);
                navigate("/client/orderslist"); 
            } else {
                alert("Token is invalid, please log in again");
                navigate("/")
            }
        } catch (error) {
            console.error('Error submitting application: ', error);
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


    return (
        <>
            <Title/>
        <div>
            <h1>Hello, {loggedInUser.first_name}!</h1>
           <h1> Do you want to make a new order?  </h1>
           <form onSubmit={handleSubmit}>
           <div className="form-group">
                <select id="service" className="form-control" value={specialisation} onChange={(e) => setType(e.target.value)} required>
                    <option value="">Select Service</option>
                    {services.map(service => (
                        <option key={service} value={service}>{service}</option>
                    ))}
                </select>
            </div>
            <div>
                <label htmlFor="date">When?</label>
                <input id="date" className="form-control" type="date" value={date.toISOString().substr(0, 10)} onChange={(e) => setDate(new Date(e.target.value))} required />
            </div>
            <div className="form-group">
                <label htmlFor="town">City</label>
                <select id="town" className="form-control" value={town} onChange={(e) => setSelectedCity(e.target.value)}>
                    <option key={town} value={town}>{town}</option>
                    {israeliCities.filter(v => v !== town).map(town => (
                        <option key={town} value={town}>{town}</option>
                    ))}
                </select>
            </div>
            <div>
                <label htmlFor="time">Estimated time (if you don't know-make it 00:00)</label>
                <input id="time" type="time" className="form-control" value={time} onChange={(e) => setSelectedTime(e.target.value)}/>
            </div>
            <div>
                <div className="form-group">
                <label htmlFor="rate">How much are you ready to pay? (if you don't know-leave it empty)</label>
                <input id="rate" className="form-control" type="number" placeholder="Rate per hour" value={rate_per_hour} onChange={(e) => setRate(parseInt(e.target.value))}/>
            </div>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            <h3> If you want to see your previous orders press <a href='/client/orderslist'>here</a></h3>
        </div>
        </>
        
    )
}

export default Application;