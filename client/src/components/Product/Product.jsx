import './Product.scss';
import { Link } from 'react-router-dom';

function addToCartHandler(e) {
    let pId = e.target.getAttribute("data-id");
    console.log(pId);
}

const ProductCard = props => {
    return (
        <div className='item product_card_div'  >
            <Link to={`product/${props.pId}`}>
                <div className="productCard_img" style={{ backgroundImage: `url('${props.img_url}')` }} ></div>
                <div>
                    <h3>{props.pName}</h3>
                    <p>₹ {props.price}</p>
                </div>
            </Link>
            <button onClick={addToCartHandler} data-id={props.pId} >Add to Cart</button>
        </div>
    )
};

export { ProductCard };