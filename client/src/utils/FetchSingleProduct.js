import axios from "axios";
import ApiErrorHandler from "./ClientOther";

const  FetchSingleProduct = async (id) =>  {
    
    try {
        const res = await axios.get(`/public/productid/${id}`)
        const data = res.data.product;
        return data;

    } catch (error) {
        ApiErrorHandler(error);
    }
       
}

export default FetchSingleProduct;