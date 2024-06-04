import { useState, useEffect} from 'react';
import Title from '../HomePage/Title';
import axios from 'axios';
import OrdersList from './OrdersList';

const Application = () => {
    const [israeliCities, setIsraeliCities] = useState<string[]>([]);
    const [selectedCity, setSelectedCity] = useState<string>("");
    const [type, setType] = useState<string>("")
    const [date, setDate] = useState<Date>(new Date());
    const [selectedTime, setSelectedTime] = useState<string>("");
    const [rate, setRate] = useState<number>();


    const services = ["Cleaning", "Babysitting", "Preparing food"];

    useEffect(() => {
        const fetchCities = async () => {

            try {
                const response = await axios.get('https://api.geonames.org/searchJSON', {
                    params: {
                        country: 'IL',
                        username: 'derwonderwoman', 
                    }
                });
                const data = response.data.geonames.map((city: any) => city.name);
                const uniqueCities : string[] = Array.from(new Set(data));
                setIsraeliCities(uniqueCities);
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
           <h1> Your new application </h1>
           <div className="form-group">
                <select id="service" className="form-control" value={type} onChange={(e) => setType(e.target.value)} required>
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
                <select id="city" className="form-control" value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)}>
                    <option value="">Select City</option>
                    {israeliCities.map(city => (
                        <option key={city} value={city}>{city}</option>
                    ))}
                </select>
            </div>
            <div>
                <label htmlFor="time">Estimated time (if you don't know-leave it empty)</label>
                <input id="time" type="time" className="form-control" value={selectedTime} onChange={(e) => setSelectedTime(e.target.value)}/>
            </div>
            <div>
                <div className="form-group">
                <label htmlFor="rate">How much are you ready to pay? (if you don't know-leave it empty)</label>
                <input id="rate" className="form-control" type="number" placeholder="Rate per hour" value={rate} onChange={(e) => setRate(parseInt(e.target.value))}/>
            </div>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </div>
        <OrdersList/>
        </>
        
    )
}

export default Application;