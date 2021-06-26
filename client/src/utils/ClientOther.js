import { toast } from "react-toastify";

const ApiErrorHandler = error => {
    if(error.response){
        toast.error(error.response.data.error.message)
    }else{
        toast.error(error.message)
    }
    return null;
}

export default ApiErrorHandler;