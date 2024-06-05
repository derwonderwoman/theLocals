import { useState, useEffect, FormEvent } from 'react';
import Title from '../HomePage/Title';
import axios from 'axios';
import OrdersList from './OrdersList';
import { ISRAEL_CITIES } from '../../config';
import { BASE_URL } from '../../config';



const Application = () => {
    const [israeliCities, setIsraeliCities] = useState<string[]>([]);
    const [town, setSelectedCity] = useState<string>("");
    const [specialisation, setType] = useState<string>("")
    const [date, setDate] = useState<Date>(new Date());
    const [time, setSelectedTime] = useState<string>("");
    const [rate_per_hour, setRate] = useState<number>();
    // const [status, setStatus] = useState<string>("pending");


    const services = ["Cleaning", "Babysitting", "Preparing food"];
    const first_name = localStorage.getItem("first_name");
    const client_id = localStorage.getItem("client_id");

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${BASE_URL}/client/application`, {
                town,
                specialisation,
                date,
                time,
                rate_per_hour,
                status:'pending',
                client_id: client_id,
                specialist_id: "",
            }, { withCredentials: true });

            if (response.status === 200) {
                
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
            <h1>Hello, {first_name}!</h1>
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
                <label htmlFor="city">City</label>
                <select id="city" className="form-control" value={town} onChange={(e) => setSelectedCity(e.target.value)}>
                    <option value="">Select City</option>
                    {israeliCities.map(city => (
                        <option key={city} value={city}>{city}</option>
                    ))}
                </select>
            </div>
            <div>
                <label htmlFor="time">Estimated time (if you don't know-leave it empty)</label>
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
        </div>
        <OrdersList/>
        </>
        
    )
}

export default Application;