import ApiErrorHandler from "../../../utils/ClientOther";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {Link} from 'react-router-dom';

const config ={
    headers: {
        "Content-Type": "application/json"
        //Authorization: `Bearer ${localStorage.getItem('accessToken')}`
    }
}

const OrderCard = (props) => {
    const {order, SetOrderForUpdate} = props;
    let date = new Date(order.selectedDate);
    return(
        <div className="order_card" >
            <p>₹ {order.totalPrice} </p>
            <p>{order.userItems.length}</p>
            <p> {date.toDateString()} </p>
            <button onClick={()=> SetOrderForUpdate(order)}>Update</button>
        </div>
    );

};

const ListOrders = (props) =>{
   let {data, SetOrderForUpdate} = props;
   if (!data) data = [];

   return(
       <>
            {data.map(x => <OrderCard key={x._id} order={x} SetOrderForUpdate={SetOrderForUpdate} /> )}
       </>
   );

};

const OrderItemsCard = props => {
    const {item} = props;
    return(
        <div className="order_item_card">
            <Link to={`product/${item._id}`} target="_blank">
            <div className="item_img_div" style={{backgroundImage: `url(/public/images/${item.image})`}}></div>
            </Link>
            <p>{item.name}</p>
            <p>qty: {item.qty}</p>
            <p>price: {item.price} </p>            
            <p>total price: {item.totalprice} </p>
        </div>
    );
};

const UpdateOrderCard = (props) => {
    const {order, UpdateOrderState, userDetails} = props;
    const [currentOrderState, setCurrentOrderState] = useState("");
    let date = new Date(order.selectedDate);
    
    const stateUpdate = async (state) => {
        const result = await UpdateOrderState(state);
        if(result === true) {
            setCurrentOrderState(state);
        };
    }
    
    useEffect(()=>{
        setCurrentOrderState(order.orderState);
        console.log("hi");
    },[order.orderState]);

    return(
        <div id="update_order_card">
            <div>
                <p> Order State : {currentOrderState}</p>
                <p>
                    Total price : {order.totalPrice}₹ 
                    <span> ({order.subtotal} + {order.shippingprice})</span>  
                </p>
                <p>Payment Method : {order.paymentMethod}</p>
                <p>Delivery Date : {date.toDateString()}</p>
            </div> 
            
            <div>
                <h3>Order Items</h3>
                {order.userItems.map(x => <OrderItemsCard key={x._id} item={x} />)}
            </div> 
            
            <div>
                <h3>Customer details</h3>
                <p> <b>{userDetails.username}</b></p>
                     
                <p>{userDetails.address.street}</p>
                <p>{userDetails.address.city}, {userDetails.address.state}, {userDetails.address.zip} </p>
                <p>Phone number: {userDetails.address.mobNumber}</p>
                
            </div>
            
            <div>
                {currentOrderState === 'CONFIRM' ? (
                    <>
                        <button className="red" onClick={() => stateUpdate("REJECT")}>Reject Order</button>
                        <button className="green" onClick={() => stateUpdate("PENDING")}>Accept Order</button>
                    </>
                ) : ("")}
                {currentOrderState === 'PENDING' ? (
                    <button className="purple" onClick={() => stateUpdate("DELIVERY")}>set order Out for Delivery</button> 
                ) : ("")}
                {currentOrderState === 'DELIVERY' ? (
                    <button className="blue" onClick={() => stateUpdate("COMPLETE")}>completed order</button>
                ) : ("")}
            </div>

        </div>
    );
};

const Orders = () => {

    const [OrdersList, setOrderlist] = useState({
        NewOrders:[],
        PendingOrders:[],
        OFDOrders:[],
        CompleteOrders:[],
        RejectedOrders:[]
    });

    const [order, setOrder] = useState({});
    const [updateOrderId , setUpdateOrderId] = useState("");
    const [userDetails, setUserDetails] = useState({});

    const SetOrderForUpdate = async (order) =>{
        try {
            const result = await axios.get(`/admin/fetchsingleuser/${order.userId}`);
            if(result.data){
                setUserDetails(result.data);
            }
        } catch (error) {
            ApiErrorHandler(error)
        }
        setUpdateOrderId(order._id);
        setOrder(order);

    }

    const fetchallOrders = async () =>{
        try {
            const result = await axios.get(`/admin/fetchorders`);
            //console.log(result);
            if(result.data){
                const {
                    confirmOrders,
                    pendingOrders,
                    deliveryOrders,
                    completeOrders,
                    rejectOrders
                } = result.data;
                setOrderlist({
                    NewOrders:confirmOrders,
                    PendingOrders:pendingOrders,
                    OFDOrders:deliveryOrders,
                    CompleteOrders:completeOrders,
                    RejectedOrders:rejectOrders
                });
            }
        } catch (error) {
            ApiErrorHandler(error);
        }
    }

    const UpdateOrderState = async (orderState) =>{
        const Data = {
            orderId:updateOrderId,
            OrderState:orderState
        }
        try {
            const result = await axios.post(`/admin/updateordersstate`,Data,config);
            if(result.data.nModified === 1){
                toast.success("Order State Updated");
                fetchallOrders();
                //setOrder({});
                return true;
            }
        } catch (error) {
            ApiErrorHandler(error);
        }
    }

    useEffect(()=>{
        fetchallOrders();
    },[])

    return(
        <div id="admin_orders" >
            
            <div id="update_orders">
                <h1>Update Orders</h1>
                {
                    order._id ? (
                        <UpdateOrderCard userDetails={userDetails} order={order} UpdateOrderState={UpdateOrderState} />
                        ) : ("please select a order to update its state")
                    }
            </div>

            
            <div id="select_order_div">
            <button onClick={fetchallOrders}>refresh</button>
                <div>
                    <div className="order_card" >
                        <p>Total price</p>
                        <p>No. of Items </p>
                        <p>Delivery Date</p>
                        <button>Button</button>
                    </div>
                    <h2>New orders</h2>
                    <ListOrders data={OrdersList.NewOrders} SetOrderForUpdate={SetOrderForUpdate} />
                </div>
                <div>
                    <h2>pending orders</h2>
                    <ListOrders data={OrdersList.PendingOrders} SetOrderForUpdate={SetOrderForUpdate} />
                </div>
                <div>
                    <h2>Out for Delivery</h2>
                    <ListOrders data={OrdersList.OFDOrders} SetOrderForUpdate={SetOrderForUpdate} />
                </div>
                <div>
                    <h2>Completed orders</h2>
                    <ListOrders data={OrdersList.CompleteOrders} SetOrderForUpdate={SetOrderForUpdate} />
                </div>
                <div>
                    <h2>Rejected orders</h2>
                    <ListOrders data={OrdersList.RejectedOrders} SetOrderForUpdate={SetOrderForUpdate} />
                </div>
            </div>
        </div>
    );
};
export default Orders;