import { useContext } from "react";
import { CartContext } from '../../App'
import {trashSvg} from '../../images/allSvg'


const CartProductCard = (props) => {
    const cartContext = useContext(CartContext);
    const { product } = props
    //console.log(product);
    return (
        <div className='cartP_card'>
            <div className='cartP_card_img' style={{ backgroundImage: `url('${product.image}')` }} ></div>
            <div className='cartP_card_content'>
                <h2>
                    {product.name}
                    <p>Id : {product.pid}</p>
                </h2>

                <h4>
                    <button onClick={() => cartContext.cartDispatch({ type: 'onRemove', product: product })} >-</button>
                    <span>{product.qty}</span>
                    <button onClick={() => cartContext.cartDispatch({ type: 'onAdd', product: product })} >+</button>
                </h4>
                <h3> ₹ {product.price * product.qty}</h3>
                <button onClick={() => cartContext.cartDispatch({ type: 'onDelete', product: product })}>{trashSvg}</button>
            </div>
        </div>
    );
};

const CartProducts = () => {
    const cartContext = useContext(CartContext)
    const products = cartContext.cartState

    const itemsPrice = products.reduce((a, c) => a + c.price * c.qty, 0);
    //const taxPrice = itemsPrice * 0.03;
    const shippingprice = itemsPrice > 300 ? 0 : 30;
    const totalPrice = itemsPrice + shippingprice;

    return (
        <div id='cart_products'>
            {products.length === 0 && <div>Empty cart</div>}
            {products.map(product => (
                <CartProductCard key={product.pid} product={product} />
            ))}
            {products.length !== 0 && (
        <>
          
          <div>items price : ₹{ itemsPrice.toFixed(2)}</div>
          {/* <div>tax price : ₹{ taxPrice.toFixed(2)}</div> */}
          <div>shiping price : ₹{ shippingprice.toFixed(2)}</div>
          <div>total : ₹{ totalPrice.toFixed(2)}</div>
          <div>
            <button>next</button>
          </div>
        </>
      )}
        </div>
    )
};

export default CartProducts;