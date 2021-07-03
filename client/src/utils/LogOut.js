import axios from "axios";
import ApiErrorHandler from "./ClientOther";

const LogOut = async () => {
    const accessToken = localStorage.getItem('accessToken');
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`
        }
    };
    try {
        const result = await axios.get(`http://${window.location.hostname}:5000/auth/logout`, config);
        
    } catch (error) {
        ApiErrorHandler(error);
    } finally{
        localStorage.removeItem('accessToken');
        localStorage.removeItem('isLogin'); 
        localStorage.removeItem('rootUser'); 
    }
};

export default LogOut;