import { toast } from "react-toastify";
import axios from "axios";

const SearchProduct = async (keyword,mostpopular = false, categories = false) => {
    try {
        
        const result = await axios.get(`http://localhost:5000/public/productname/${keyword}?categories=${categories}&mostpopular=${mostpopular}`);
        return result; //array of products

    } catch (error) {
        if(error.response){
            toast.error(error.response.data.error.message)
        }else{
            toast.error(error.message)
        }
        return null;
    }
}

export default SearchProduct;