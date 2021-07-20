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
        const result = await axios.get(`http://${window.location.hostname}:5000/private/fetchuserorders`,config);
        if(result.data.userOrders){
            return result.data.userOrders;
        }else{
            return false;
        }
           
    } catch (error) {
        ApiErrorHandler(error);
    }
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
        <div>
            this is UsersOrders
            {orderList.map(x=> x.orderState)}
        </div>
    );
};
export default UsersOrders;