import axios from "axios";
import { toast } from "react-toastify";
import ApiErrorHandler from "./ClientOther";

const  FetchSingleProduct = async (id) =>  {
    
    try {
        const res = await axios.get(`http://${window.location.hostname}:5000/public/productid/${id}`)
        const data = res.data.product;
        return data;

    } catch (error) {
        ApiErrorHandler(error);
    }
       
}

export default FetchSingleProduct;