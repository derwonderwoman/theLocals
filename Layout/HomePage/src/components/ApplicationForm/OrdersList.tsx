import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../config';
import { AuthContext } from '../../App';

const OrdersList = ({ type }: { type: string }) => {
    const [orders, setOrders] = useState<any[]>([]);
    const {loggedInUser} = useContext(AuthContext);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/client/orderslist`,
                { withCredentials: true, 
                    headers:{
                        "x-access-token":loggedInUser.token,
                    } });
                setOrders(response.data);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        fetchOrders();
    }, []);

    return (
        <div>
            <hr></hr>
            <h2>My previous orders ({type})</h2>
            <ul>
                {orders.map((order, index) => (
                    <li key={index}>{order.date} - {order.specialisation} - {order.status} - {order.first_name} {order.last_name}</li>
                ))}
            </ul>
            <hr></hr>
        </div>
    );
};

export default OrdersList;