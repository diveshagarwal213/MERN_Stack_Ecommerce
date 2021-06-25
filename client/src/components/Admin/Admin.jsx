import  "./admin.scss";
import AddProducts from "./AddProducts";
import UpdateProducts from "./UpdateProducts/UpdateProducts";
import { useState } from "react";

const Admin =  () => {
    const [adminNav, setadminNav] = useState("ORDERS");
    const adminNavHandler =  (value) => {
        setadminNav(value);
    };

    return(
        <div id='admin'>
            <div id="admin_nav">
                <button className="btn" onClick={() => {adminNavHandler("ORDERS")}} >Orders</button>
                <button className="btn" onClick={() => {adminNavHandler("ADD_PRODUCTS")}} >Add Products</button>
                <button className="btn" onClick={() => {adminNavHandler("UPDATE_PRODUCTS")}} >Update Products</button>
                <button className="btn" onClick={() => {adminNavHandler("ADMIN_PROFILE")}} >Profile</button>
            </div>

            
            {adminNav === "ORDERS" ? ("this is orders") : ("")}
            {adminNav === "ADD_PRODUCTS" ? (<AddProducts/>) : ("")}
            {adminNav === "UPDATE_PRODUCTS" ? (<UpdateProducts/>) : ("")}
            {adminNav === "ADMIN_PROFILE" ? ("this is ADMIN_PROFILE") : ("")}
            
            
        </div>
    )
};

export default Admin;