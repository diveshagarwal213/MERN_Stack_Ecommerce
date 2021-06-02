import './Product.scss';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import {CartContext} from '../../App'

// product { pid image name price } 

const ProductCard = (props) => {
    const {product} = props;

    const cartContext = useContext(CartContext);
    return (
        <div className='item product_card_div'  >
            <Link to={`product/${product.pid}`}>
                <div className="productCard_img" style={{ backgroundImage: `url('${product.image}')` }} ></div>
                <div>
                    <h3>{product.name}</h3>
                    <p>₹ {product.price}</p>
                </div>
            </Link>
            <button onClick={() => cartContext.cartDispatch({ type: 'onAdd', product: product})} >Add to Cart</button>
        </div>
    )
};

export { ProductCard };