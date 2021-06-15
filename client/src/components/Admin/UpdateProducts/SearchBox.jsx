import { useState, useEffect } from "react";
import FetchProducts from "../../../utils/FetchProducts";

const UProducts = (props) => {
    const { image, name, price, id } = props;

    return (
        <div className="u_products">
            <div className="u_products_img" style={{ backgroundImage: `url("http://localhost:5000/public/images/${image}")` }} ></div>
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

     const fetchNewRecords = async () => {
        const result = await FetchProducts(null,15);
        if(result){
            setnewProducts(result.data.products);
        }
    } 

    useEffect(() => {
        console.log("fetching new records");
         fetchNewRecords(); 
    }, [])

    return (
        <div id="select_update">
            <input type="text" placeholder="search" />
            <button>Search</button>
            {newProducts.map(x => (
                <UProducts key={x._id} name={x.name} price={x.price} image={x.image} id={x._id} funsetid={props.funsetid} />
            ))}
        </div>
    );
}

export default SearchBox;