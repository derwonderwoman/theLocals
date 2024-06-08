import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../config';
import { AuthContext } from '../../App';
import Title from '../HomePage/Title';

const AllAplications = ({pendingOrders}:{pendingOrders:any[]} ) => {
    const [orders, setOrders] = useState<any[]>([]);
    const { loggedInUser } = useContext(AuthContext);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/specialist/applications`, {
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
    }, [pendingOrders]);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const formattedDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
        return formattedDate;
    };

    return (
        <div>
            <Title/>
            <hr />
            <h2>All orders</h2>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Order id</th>
                        <th scope="col">Date</th>
                        <th scope="col">Client First Name</th>
                        <th scope="col">Client Last Name</th>
                        <th scope="col">Requested Service</th>
                        <th scope="col">Specialist First Name</th>
                        <th scope="col">Specialist Last Name</th>
                        <th scope="col">Status of order</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order, index) => (
                        <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>{order.id}</td>
                            <td>{formatDate(order.date)}</td>
                            <td>{order.client_first_name}</td>
                            <td>{order.client_last_name}</td>
                            <td>{order.specialisation}</td>
                            <td>{order.specialist_first_name}</td>
                            <td>{order.specialist_last_name}</td>
                            <td>{order.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AllAplications;