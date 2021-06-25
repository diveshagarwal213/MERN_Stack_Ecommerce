import { useState, useEffect } from "react";
import FetchProducts from "../../../utils/FetchProducts";
import SearchProduct from '../../../utils/FetchSearchProduct';
import { toast } from "react-toastify";

const UProducts = (props) => {
    const { image, name, price, id } = props;

    return (
        <div className="u_products">
            <div className="u_products_img" style={{ backgroundImage: `url("http://${window.location.hostname}:5000/public/images/${image}")` }} ></div>
            <div className="u_products_content">
                <p>{name}</p>
                <p>₹{price}</p>
                <button onClick={() => {props.funsetid(id)}} >Update</button>
            </div>
        </div>
    );
};

const SearchBox = (props) => {
    const [newProducts, setnewProducts] = useState([]);
    const [searchkey, setSearchKey] = useState("");

    const fetchNewRecords = async () => {
        const result = await FetchProducts(null,15);
        if(result){
            setnewProducts(result.data.products);
        }
    }

    const SearchHandler = async (mostpopular = false , categories = false) => {
        if(searchkey.length >= 3 ){
            const result = await SearchProduct(searchkey, mostpopular, categories);
            if(result) setnewProducts(result.data.products);
        }else{
            toast.warning("Type at least 3 character");
        }
    }

    useEffect(() => {
         fetchNewRecords(); 
    }, [])

    return (
        <div id="select_update">
            <input type="text" value={searchkey}  onChange={(e) => setSearchKey(e.target.value)} placeholder="search" />
            <button onClick={() => SearchHandler()} >Search</button>
            <button onClick={() => fetchNewRecords()} >Refresh</button>
            {newProducts.map(x => (
                <UProducts key={x._id} name={x.name} price={x.price} image={x.image} id={x._id} funsetid={props.funsetid} />
            ))}
        </div>
    );
}

export default SearchBox;