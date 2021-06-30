import axios from "axios";
import ApiErrorHandler  from "./ClientOther";

const SearchProductByName = async (keyword) => {
    try {
        const result = await axios.get(`http://${window.location.hostname}:5000/public/productname/${keyword}`);
        return result; //array of products

    } catch (error) {
        ApiErrorHandler(error);
    }
}

const SearchByCatAndFlav = async (cat, fav) => {
    try {
        let result;
        if(cat){
            if(fav){
                result = await axios.get(`http://${window.location.hostname}:5000/public/catandflav?categories=${cat}&flavors=${fav}`);
            }else{
                result = await axios.get(`http://${window.location.hostname}:5000/public/catandflav?categories=${cat}`);
            }
        }else if(fav){
            result = await axios.get(`http://${window.location.hostname}:5000/public/catandflav?flavors=${fav}`);
        }

        return result;
    } catch (error) {
        ApiErrorHandler(error);
    }
} 

export default SearchProductByName;
export  { SearchByCatAndFlav};
