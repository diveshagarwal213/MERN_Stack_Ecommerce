import { toast } from "react-toastify";

const ApiErrorHandler = error => {
    if(error.response){
        if(error.response.data.error.status < 500 ){
            toast.error(error.response.data.error.message)
        }else{
            toast.error("Server Error")
        }
    }else{
        toast.error(error.message)
    }
    return null;
}

function ArrayToString (array) {
    if(typeof array !== "object") return "";
    return array =  array.join(" ")
}

export default ApiErrorHandler;
export {ArrayToString};