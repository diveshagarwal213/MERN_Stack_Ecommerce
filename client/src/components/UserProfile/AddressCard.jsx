import { useEffect, useState } from "react";
import ApiErrorHandler from "../../utils/ClientOther";
import axios from "axios";
import { toast } from "react-toastify";
import {rootUserData} from '../../utils/ClientOther';

const AddressCard = () => {
    
    const [addressState, setAddressState] = useState(false);

    const [address, setAddress] = useState({
        street: "",
        city:"",
        state:"",
        zip:"",
        mobNumber:""
    });

    useEffect(()=>{
        const userData = rootUserData(true);
        if(userData.address){
            const Address = userData.address
            if(Address.zip){
                setAddress(userData.address);
                setAddressState(true);
            }
        }  
    },[]);

    const inputHandler = (e) => {
        const {name , value} = e.target;
        setAddress((preValue)=>{
            //console.log(preValue);
            return{
                ...preValue,
                [name]: value,
            }
        });
    }
    const addressHandler = async (e) => {
        e.preventDefault();

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        };

        try {
            const result = await axios.post(`/private/adduseraddress`,{address},config);
            toast.success("Address Updated");
            setAddressState(true);
            const userdata = rootUserData(true);
            const updateUserdata = {...userdata, address: address};
            rootUserData(updateUserdata);
        } catch (error) {
            ApiErrorHandler(error);
        }

    };
    return(
        <div id="user_address">
            <h2>Manage Address</h2>
            <form onSubmit={addressHandler}>
                <div>
                    <text>Street Address</text>
                    <input type="text" disabled={addressState} onChange={inputHandler} name="street" value={address.street} placeholder="Street" /> 
                </div>
                <div>
                    <text>City</text>
                    <input type="text" disabled={addressState} onChange={inputHandler} name="city" value={address.city} placeholder="City" /> 
                </div>
                <div>
                    <text>State</text>
                    <input type="text" disabled={addressState} onChange={inputHandler} name="state" value={address.state} placeholder="State" /> 
                </div>
                <div>
                    <text>Zip code</text>
                    <input type="number" disabled={addressState} onChange={inputHandler} name="zip" value={address.zip} placeholder="Zip code" /> 
                </div>
                <div>
                    <text>Mobile Number</text>
                    <input type="number" disabled={addressState} onChange={inputHandler} name="mobNumber" value={address.mobNumber} placeholder="Mobile Number" /> 
                </div>
                <div>
                    {
                        addressState ? (<button type="button" onClick={()=> setAddressState(false)} >Edit</button>) : (
                            <>
                                <button type="button" onClick={()=> setAddressState(true)} >cancel</button>
                                <button type="submit" >Save</button>
                            </>
                        )
                    }
                </div>
                
            </form>
            
        </div>
    );
};

export default AddressCard;