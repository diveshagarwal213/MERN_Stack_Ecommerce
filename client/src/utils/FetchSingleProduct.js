import axios from "axios";
import { toast } from "react-toastify";

const  FetchSingleProduct = async (id) =>  {
    
    if(id.match(/^[0-9a-fA-F]{24}$/)){
        try {
            const res = await axios.get(`http://localhost:5000/public/productid/${id}`)
            const data = res.data.product;
            return data;
    
        } catch (error) {
            toast.error(error.message);
            return null
        }
    }else{
        return null
    }
       
}

export default FetchSingleProduct;