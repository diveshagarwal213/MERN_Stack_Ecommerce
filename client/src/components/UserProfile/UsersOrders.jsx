import ApiErrorHandler from "../../utils/ClientOther";
import axios from 'axios';
import { useState, useEffect } from "react";

const FetchUsersOrders = async () => {
    try {
        const config ={
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        } 
        const result = await axios.get(`/private/fetchuserorders`,config);
        if(result.data.userOrders){
            return result.data.userOrders;
        }else{
            return false;
        }
           
    } catch (error) {
        ApiErrorHandler(error);
    }
};

const YourOrderItemsCard = props => {
    const {item} = props;
    return(
        <div className="YourOrderItemsCard">
            <div className="YourOrderItemsCard_img" style={{backgroundImage: `url(/public/images/${item.image})`}}></div>
            <p>{item.name}</p>            
            <p>{item.price}₹ X {item.qty}  </p>
        </div>
    );
};

const YourOrdersCard = (props) => {
    const {order} = props;
    let Deliverydate = new Date(order.selectedDate);
    let placedOn = new Date(order.createdAt);
    return(
        //paymentMethod subtotal selectedDate orderState createdAt totalPrice shippingprice
        //userItems => image name price qty totalprice
        <div className="your_orders_card">
            <div>
                <p> Order State : {order.orderState === 'CONFIRM' ? ("NOT CONFIRM") : (order.orderState)} </p>
                <p> subtotal price : {order.subtotal}₹ </p>
                <p> shipping price : {order.shippingprice}₹ </p>
                <p> Total price : {order.totalPrice}₹ </p>
                <p>Payment Method : {order.paymentMethod}</p>
                <p>Delivery Date : {Deliverydate.toDateString()}</p>
                <p>placed On : {placedOn.toDateString()}</p>
            </div> 
            
            <div className="YourOrderItemsCard_upper_div">
                {order.userItems.map(x => <YourOrderItemsCard key={x._id} item={x} />)}
            </div> 
        </div>
    );
};

const UsersOrders = () => {
    const [orderList, setOrderList] = useState([]);

    const SetUserOrdersList = async () => {
        const result = await FetchUsersOrders();
        if(result) setOrderList(result);
    };

    useEffect(()=>{
        SetUserOrdersList();
    },[])

    return (
        <div id="your_orders">
            <h2> Your Orders</h2>
            <div id="your_orders_div">
            {orderList.map(x => <YourOrdersCard key={x._id} order={x}/>)}
            </div>
        </div>
    );
};
export default UsersOrders;