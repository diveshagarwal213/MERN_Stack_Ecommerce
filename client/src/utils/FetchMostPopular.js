import axios from "axios";
import ApiErrorHandler from "./ClientOther";

const FetchMostPopular = async (limit) => {
    try {
        let result;
        if(limit){
            result = await axios.get(`/public/mostpopular?limit=${limit}`);

        }else{
            result = await axios.get(`/public/mostpopular`);
        }
        console.log(result);
        return result;
    } catch (error) {
        ApiErrorHandler(error);
        //console.log(error);
        //return null;
    }
}

export default FetchMostPopular;