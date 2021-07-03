import { toast } from "react-toastify";

const ApiErrorHandler = (error, warning = false) => {
    if(warning){
        toast.warning(error);
        return null
    }
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

function rootUserData (data) { 
    if(data === true){
       let rootUser = localStorage.getItem('rootUser');
       return rootUser = JSON.parse(rootUser);
    }
    const Jdata = JSON.stringify(data);
    localStorage.setItem("rootUser",Jdata);
}

export default ApiErrorHandler;
export {ArrayToString, rootUserData};