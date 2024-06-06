import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../config';
import { AuthContext } from '../../App';
import Title from '../HomePage/Title';

const OrdersList = () => {
    const [orders, setOrders] = useState<any[]>([]);
    const { loggedInUser } = useContext(AuthContext);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/client/orderslist`, {
                    withCredentials: true,
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
            <hr />
            <h2>My previous orders</h2>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Date</th>
                        <th scope="col">Requested Service</th>
                        <th scope="col">Status of order</th>
                        <th scope="col">Specialist First Name</th>
                        <th scope="col">Specialist Last Name</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order, index) => (
                        <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>{formatDate(order.date)}</td>
                            <td>{order.specialisation}</td>
                            <td>{order.status}</td>
                            <td>{order.first_name}</td>
                            <td>{order.last_name}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default OrdersList;