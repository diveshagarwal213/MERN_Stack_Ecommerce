import axios from "axios";
import { toast } from "react-toastify";

const FetchMostPopular = async (limit) => {
    try {
        let result;
        if(limit){
            result = await axios.get(`http://localhost:5000/public/mostpopular?limit=${limit}`);
        }else{
            result = await axios.get(`http://localhost:5000/public/mostpopular`);
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

export default FetchMostPopular;