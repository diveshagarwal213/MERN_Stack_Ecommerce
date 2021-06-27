import axios from "axios";
import { toast } from "react-toastify";
import ApiErrorHandler from "./ClientOther";

const FetchMostPopular = async (limit) => {
    try {
        let result;
        if(limit){
            result = await axios.get(`http://${window.location.hostname}:5000/public/mostpopular?limit=${limit}`);
        }else{
            result = await axios.get(`http://${window.location.hostname}:5000/public/mostpopular`);
        }
        return result;
    } catch (error) {
        ApiErrorHandler(error);
    }
}

export default FetchMostPopular;