import axios from "axios";
import ApiErrorHandler from "./ClientOther";
import { toast } from "react-toastify";

const PlaceOrdserApi = async (order) => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        };
        const result = await axios.post(`/private/placeorder`,order,config);
        //console.log(result);
        toast.success("order placed");
        return result;
    } catch (error) {
        ApiErrorHandler(error);
    }
};

export default PlaceOrdserApi;