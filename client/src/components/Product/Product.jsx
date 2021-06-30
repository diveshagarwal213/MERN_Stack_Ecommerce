import './Product.scss';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import {CartContext} from '../../App';
import { cartPlusSvg } from '../../images/allSvg';

// product { pid image name price } 

const ProductCard = (props) => {
    const {product} = props;

    //const baseUrl = window.location.origin;

    const cartContext = useContext(CartContext);
    return (
        <div className='item product_card_div'  >
            <div className="productCard_img" style={{ backgroundImage: `url('http://${window.location.hostname}:5000/public/images/${product.image}')` }} >
                <button>model</button>
            </div>
            <div className="productCard_content">
                <h3>{product.name} <span>₹ {product.price}</span></h3>
                <button onClick={() => cartContext.cartDispatch({ type: 'onAdd', product: product})} >
                    {cartPlusSvg}
                </button>
                {/* <Link to={`product/${product.pid}`} >Share</Link> */}
            </div>
        </div>
    )
};

export { ProductCard };