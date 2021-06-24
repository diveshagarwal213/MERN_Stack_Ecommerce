import axios from "axios";
import { toast } from "react-toastify";

const FetchProducts = async (categories = null, limit = null , page = null) => {

    try {
        let result;
        if (page) {
            if(categories){
                result = await axios.get(`http://${window.location.hostname}:5000/public/products?page=${page}&categories=${categories}`)
            }else{
                result = await axios.get(`http://${window.location.hostname}:5000/public/products?page=${page}`); 
            }
        } else if(limit){
            if(categories){
                result = await axios.get(`http://${window.location.hostname}:5000/public/products?limit=${limit}&categories=${categories}`)
            }else{
                result = await axios.get(`http://${window.location.hostname}:5000/public/products?limit=${limit}`); 
            }
        }else{
            if(categories){
                result = await axios.get(`http://${window.location.hostname}:5000/public/products?categories=${categories}`)
            }else{
                result = await axios.get(`http://${window.location.hostname}:5000/public/products`); 
            }
        }
        
        return result;

    } catch (error) {
        if (error.response) {
            toast.error(error.response.data.error.message)
       }else{
           toast.error(error.message)
       }
        return null
    }
}

export default FetchProducts;