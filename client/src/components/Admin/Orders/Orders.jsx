import ApiErrorHandler from "../../../utils/ClientOther";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

const OrderCard = (props) => {
    const {order, SetOrderForUpdate} = props;
    return(
        <div className="order_card" >
            <p>total price-: {order.totalPrice}</p>
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

const UpdateOrderCard = (props) => {
    const {order, UpdateOrderState} = props;
    return(
        <div id="update_order_card">
            {order.orderState} <br />
            {order.paymentMethod} <br />
            {order.subtotal} <br />
            {order.shippingprice} <br />
            {order.totalPrice} <br />
            {order.selectedDate} <br />
            <h2>change order State :</h2>
            <button onClick={() => UpdateOrderState("REJECT")}>Reject Order</button>
            <button onClick={() => UpdateOrderState("PENDING")}>Accept Order</button>
            <button onClick={() => UpdateOrderState("DELIVERY")}>set order Out for Delivery</button>
            <button onClick={() => UpdateOrderState("COMPLETE")}>completed order</button>
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
        setUpdateOrderId(order._id);
        setOrder(order);
        

    }

    const fetchallOrders = async () =>{
        const config = {}
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
        const config ={
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        }
        try {
            const result = await axios.post(`http://${window.location.hostname}:5000/admin/updateordersstate`,Data,config);
            if(result.data.nModified === 1){
                toast.success("Order State Updated");
                setOrder({});
            }
        } catch (error) {
            ApiErrorHandler(error);
        }
    }

    return(
        <div id="admin_orders" >
            <button onClick={fetchallOrders}>refresh</button>
            <div>
                <h1>Update Orders</h1>
                {
                    order._id ? (
                        <UpdateOrderCard order={order} UpdateOrderState={UpdateOrderState} />
                    ) : ("please select a order to update its state")
                }
            </div>
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
    );
};
export default Orders;