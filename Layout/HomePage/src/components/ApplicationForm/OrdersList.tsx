import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../config';
import { AuthContext } from '../../App';
import Title from '../HomePage/Title';

interface FormData {
    date:Date;
}

const OrdersList = () => {
    const [orders, setOrders] = useState<any[]>([]);
    const [editOrderId, setEditOrderId] = useState<number | null>(null);
    const [formData, setFormData] = useState<any>({});
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

    const handleDelete = async (orderId: number) => {
        try {
            await axios.delete(`${BASE_URL}/client/orderslist/${orderId}`, {
                withCredentials: true,
                headers: {
                    "x-access-token": loggedInUser.token,
                }
            });
            const updatedOrders = orders.filter(order => order.id !== orderId);
            setOrders(updatedOrders);
        } catch (error) {
            console.error('Error deleting order:', error);
        }
    };

    const handleEdit = (orderId: number, date: Date) => {
        setEditOrderId(orderId);
        setFormData(date);
    };

    const handleCloseEdit = () => {
        setEditOrderId(null);
        setFormData({});
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData:FormData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await axios.put(`${BASE_URL}/client/orderslist/${editOrderId}`, formData, {
                withCredentials: true,
                headers: {
                    "x-access-token": loggedInUser.token,
                }
            });
            fetchOrders();
            handleCloseEdit();
        } catch (error) {
            console.error('Error updating order:', error);
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
                        <th scope="col">Order id</th>
                        <th scope="col">Date</th>
                        <th scope="col">Requested Service</th>
                        <th scope="col">Status of order</th>
                        <th scope="col">Specialist First Name</th>
                        <th scope="col">Specialist Last Name</th>
                        <th scope="col">Specialist Phone Number</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order, index) => (
                        <tr key={order.id}>
                            <th scope="row">{index + 1}</th>
                            <td>{order.id}</td>
                            <td>{formatDate(order.date)}</td>
                            <td>{order.specialisation}</td>
                            <td>{order.status}</td>
                            <td>{order.first_name}</td>
                            <td>{order.last_name}</td>
                            <td>{order.status === 'approved' ? order.phone_number : '-'}</td>
                            <td>
                                <button onClick={() => handleEdit(order.id, order.date)}>Edit</button>
                            </td>
                            <td>
                                <button onClick={() => handleDelete(order.id)}>Delete</button>
                            </td>
                            { order.status !== "pending" && (
                                <td>
                                <button
                                    onClick={() => handleApply(order.id)}
                                    disabled={order.status !== 'pending'}
                                    style={{ backgroundColor: order.status === 'approved' ? 'rgb(100, 108, 255)' : 'default' }}
                                >
                                    {order.status !== 'waiting' ? 'Approve' : 'Approved'}</button>
                            </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
            {editOrderId && (
                <div>
                    <h2>Edit Order</h2>
                    <form onSubmit={handleSubmit}>
                        <label>Date:</label>
                        <input type="date" name="date" value={formData.date} onChange={handleChange} />
                        <button type="submit">Update</button>
                        <button type="button" onClick={handleCloseEdit}>Cancel</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default OrdersList;
