import OrdersList from "./OrdersList";

const OrderStatus= () => {
    return (
        <div>
            <h3>Your order #  was succesfully created</h3>
            <h4>You'll receive a notification on your e-mail about available specialists</h4>
            <OrdersList/>
        </div>
    )
}

export default OrderStatus;