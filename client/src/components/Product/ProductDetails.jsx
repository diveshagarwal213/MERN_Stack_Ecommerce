import { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import FetchSingleProduct from '../../utils/FetchSingleProduct';
import LoadingComponent from '../../utils/LoadingComponent'
import {CartContext} from '../../App'
import { ArrayToString } from '../../utils/ClientOther';

const ProductD = (props) => {
    const {categories, _id, about, name, image, price, createdAt, flavors} = props.data
    
    let newdata = props.data;
    newdata = {...newdata, pid: _id};
 
    let date = new Date(createdAt);

    const cartContext = useContext(CartContext);
    const history = useHistory();
    const goBack = () => {
        history.goBack();
    };

    return (
        <div id='product_D'>
            <div id="productD_imgDiv" style={{backgroundImage: `url("http://${window.location.hostname}:5000/public/images/${image}")`}} >
            </div>
            <div id='productD_aboutDiv'>
                <h1>{name}</h1>
                <h3>₹ {price}</h3>
                <p> {about} </p>
                <button onClick={() => cartContext.cartDispatch({ type: 'onAdd', product: newdata})} >Add to Cart</button>
                <p>Categories : {ArrayToString(categories)}</p>
                <p>Flavors : {ArrayToString(flavors)}</p>
                <p>Created on : {date.toDateString()}</p>
                <button className="go_back" onClick={goBack} > &larr; </button>

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
        </div>

    )
};

export default ProductDetails;