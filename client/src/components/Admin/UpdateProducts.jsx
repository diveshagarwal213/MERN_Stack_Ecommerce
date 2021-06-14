import { useEffect, useState } from "react";
import axios from "axios";
import placeholder from '../../images/placeholder.png'
import { toast } from "react-toastify";

const U_products = (props) => {
    const { image, name, price, id } = props;

    return (
        <div className="u_products">
            <div className="u_products_img" style={{ backgroundImage: `url("http://localhost:5000/public/images/${image}")` }} ></div>
            <div className="u_products_content">
                <p>{name}</p>
                <p>₹{price}</p>
                <button >Update</button>
            </div>
        </div>
    );
};

const UpdateProducts = () => {
    const [updateID, setUpdateId] = useState("");

    const [newProducts, setnewProducts] = useState([]);

    const fetchNewRecords = async () => {
        try {
            const res = await axios.get('http://localhost:5000/public/products?limit=15');
            const products = res.data.products;
            console.log(products);
            setnewProducts(products);
        } catch (error) {
            //toast.error(error.message);
            console.log(error);
        }
    }

    useEffect(() => {
        fetchNewRecords();
    }, [])

    return (
        <div id='update_productsDiv'>
            hello
            <div id="select_update">
                <input type="text" placeholder="search" />
                <button>Search</button>
                {newProducts.map(x => (
                    <U_products key={x._id} name={x.name} price={x.price} image={x.image} id={x._id} />
                ))}
            </div>
        </div>
    );
}

export default UpdateProducts;