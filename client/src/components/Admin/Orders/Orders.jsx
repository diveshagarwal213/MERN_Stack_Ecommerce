import ApiErrorHandler from "../../../utils/ClientOther";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

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
            <p>{order.totalPrice} ₹</p>
            <p>No. of Items : {order.userItems.length}</p>
            <p>Delivery Date : {date.toDateString()} </p>
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
        <div>
            {item.qty}
            {item.image}
            {item.name}
            {item.totalprice}
            {item.price}
        </div>
    );
};

const UpdateOrderCard = (props) => {
    const {order, UpdateOrderState, userDetails} = props;
    const [currentOrderState, setCurrentOrderState] = useState(order.orderState)

    const stateUpdate = async (state) => {
        const result = await UpdateOrderState(state);
        if(result === true) {
            setCurrentOrderState(state);
        };
    }
    return(
        <div id="update_order_card">
            {currentOrderState} <br />
            {order.paymentMethod} <br />
            {order.subtotal} <br />
            {order.shippingprice} <br />
            {order.totalPrice} <br />
            {order.selectedDate} <br />
            
            <h3>Order Items</h3>
            {order.userItems.map(x => <OrderItemsCard key={x._id} item={x} />)}
            
            <h3>User details</h3>
            {userDetails.username}
            {userDetails.address.street}
            {userDetails.address.zip}
            {userDetails.address.mobNumber}
            
            <h3>change order State :</h3>
            <button onClick={() => stateUpdate("REJECT")}>Reject Order</button>
            <button onClick={() => stateUpdate("PENDING")}>Accept Order</button>
            <button onClick={() => stateUpdate("DELIVERY")}>set order Out for Delivery</button>
            <button onClick={() => stateUpdate("COMPLETE")}>completed order</button>
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
            const result = await axios.get(`http://${window.location.hostname}:5000/admin/fetchsingleuser/${order.userId}`);
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
            const result = await axios.get(`http://${window.location.hostname}:5000/admin/fetchorders`);
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
            const result = await axios.post(`http://${window.location.hostname}:5000/admin/updateordersstate`,Data,config);
            if(result.data.nModified === 1){
                toast.success("Order State Updated");
                //setOrder({});
                return true;
            }
        } catch (error) {
            ApiErrorHandler(error);
        }
    }

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

            <button onClick={fetchallOrders}>refresh</button>
            
            <div id="select_order_div">
                <div>
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