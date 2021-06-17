import { useEffect, useState } from 'react';
import FetchSingleProduct from '../../utils/FetchSingleProduct';
import LoadingComponent from '../../utils/LoadingComponent'
import { useContext } from 'react';
import {CartContext} from '../../App'

const ProductD = (props) => {
    const {categories, _id, about, name, image, price, createdAt} = props.data
    
    let newdata = props.data;
    newdata = {...newdata, pid: _id};

    //!loading state,   categories.join(" "); gives an error 
    let cat = categories.join(" ");  
    let date = new Date(createdAt);

    const cartContext = useContext(CartContext);

    return (
        <div id='product_D'>
            <div id="productD_imgDiv" style={{backgroundImage: `url("http://localhost:5000/public/images/${image}")`}} >
            </div>
            <div id='productD_aboutDiv'>
                <h1>{name}</h1>
                <h3>₹ {price}</h3>
                <p> Details - <br /> {about} </p>
                <button onClick={() => cartContext.cartDispatch({ type: 'onAdd', product: newdata})} >Add to Cart</button>
                <p>Categories : {cat}</p>
                <p>Created on : {date.toDateString()}</p>

            </div>
        </div>
    );
};

const ProductDetails = ({ match }) => {

    const [productData, setProductData] = useState({});
    const [loading, setloading] = useState(true);

    const pId = match.params.pid;

    const fetchproduct = async () => {
        const result = await FetchSingleProduct(pId);
        if(result) {
            setProductData(result);
            setloading(false);
        }
    };
    
    useEffect(()=>{
        fetchproduct();
    },[])

    return (
        <div id="product_details" >
            {loading === true ? (<LoadingComponent/>) : (<ProductD data={productData}/>)}
            <div id="empty" ></div>
        </div>

    )
};

export default ProductDetails;