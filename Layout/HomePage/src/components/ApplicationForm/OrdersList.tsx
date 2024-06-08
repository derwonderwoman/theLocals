import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../config';
import { AuthContext } from '../../App';
import Title from '../HomePage/Title';

const OrdersList = () => {
    const [orders, setOrders] = useState<any[]>([]);
    const { loggedInUser } = useContext(AuthContext);

    useEffect(() => {
        fetchOrders();
    }, []);

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

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const formattedDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
        return formattedDate;
    };

    const handleApply = async (orderId: number) => {
        try {
            await axios.put(`${BASE_URL}/client/orderslist/${orderId}`, {
                status: 'approved',
                client_id: loggedInUser.id
            }, {
                withCredentials: true,
                headers: {
                    "x-access-token": loggedInUser.token,
                }
            });
            fetchOrders();
        } catch (error) {
            console.error('Error applying:', error);
        }
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
                        <th scope="col">Order id</th>
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
                            <td>{order.id}</td>
                            <td>{formatDate(order.date)}</td>
                            <td>{order.specialisation}</td>
                            <td>{order.status}</td>
                            <td>{order.first_name}</td>
                            <td>{order.last_name}</td>
                            <td>
                                <button>Edit</button>
                            </td>
                            <td>
                                <button>Delete</button>
                            </td>
                            <td>
                                <button
                                    onClick={() => handleApply(order.id)}
                                    disabled={order.status === 'approved'}
                                    style={{ backgroundColor: order.status === 'approved' ? 'grey' : 'default' }}
                                >
                                    {order.status === 'approved' ? 'Approved' : 'Approve'}</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default OrdersList;