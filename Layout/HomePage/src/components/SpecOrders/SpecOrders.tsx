import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../config';
import { AuthContext } from '../../App';
import Title from '../HomePage/Title';

const SpecOrders = () => {
    const [orders, setOrders] = useState<any[]>([]);
    const { loggedInUser } = useContext(AuthContext);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/specialist/orders`, {
                    withCredentials: true,
                    params: {
                        id: loggedInUser.id
                    },
                    headers: {
                        "x-access-token": loggedInUser.token,
                    }
                });
                setOrders(response.data);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        fetchOrders();
    }, []);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const formattedDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
        return formattedDate;
    };

    return (
        <div>
            <Title/>
            <h1>Hello, {loggedInUser.first_name}!</h1>
            <hr />
            <h2>You can apply to these orders</h2>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Date</th>
                        <th scope="col">Town</th>
                        <th scope="col">Time</th>
                        <th scope="col">Rate per hour</th>
                        <th scope="col">Client's First Name</th>
                        <th scope="col">Client's Last Name</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order, index) => (
                        <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>{formatDate(order.date)}</td>
                            <td>{order.town}</td>
                            <td>{order.time}</td>
                            <td>{order.rate_per_hour}</td>
                            <td>{order.first_name}</td>
                            <td>{order.last_name}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default SpecOrders;