import { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../config';

const OrdersList = ({ type }: { type: string }) => {
    const [orders, setOrders] = useState<any[]>([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/client/orderslist`);
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