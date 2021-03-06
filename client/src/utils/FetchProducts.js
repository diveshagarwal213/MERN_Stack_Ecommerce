import axios from "axios";
import ApiErrorHandler from "./ClientOther";

const FetchProducts = async (categories = null, limit = null , page = null) => {

    try {
        let result;
        if (page) {
            if(limit){
                if(categories){
                    result = await axios.get(`/public/products?page=${page}&categories=${categories}&limit=${limit}`);
                }else{
                    result = await axios.get(`/public/products?page=${page}&limit=${limit}`);
                }
            
            }else{
                if(categories){
                    result = await axios.get(`/public/products?page=${page}&categories=${categories}`)
                }else{
                    result = await axios.get(`/public/products?page=${page}`); //default limit
                }
            }
        } else if(limit){
            if(categories){
                result = await axios.get(`/public/products?limit=${limit}&categories=${categories}`)
            }else{
                result = await axios.get(`/public/products?limit=${limit}`); 
            }
        }else{
            if(categories){
                result = await axios.get(`/public/products?categories=${categories}`)
            }else{
                result = await axios.get(`/public/products`); 
            }
        }
        
        return result;

    } catch (error) {
        ApiErrorHandler(error);
    }
}

export default FetchProducts;