import { useContext } from "react";
import { CartContext } from '../../App'
import {trashSvg} from '../../images/allSvg'

const userData = {
    name:'abc',
    id:'exampleid',
    address: {
        city:'hanumangarh Town',
        pincode:'335513',
        state: 'rajasthan',
        mobileno:'1234567890',
        landmark:'op to BSNL OFFICE',
        type:'home'
    }
}

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

    const confirmOrder = () => {
        const order = {
            ...userData,
            items: products,
            itemsprice: itemsPrice,
            shippingprice: shippingprice,
            totalprice: totalPrice,
            payment:false
        }
        console.log(order);
    }

    return (
        <div id='cart_products'>
            {products.length === 0 && <div id='empty_cart'>Idiot add somthing first!!😤</div>}
            {products.map(product => (
                <CartProductCard key={product.pid} product={product} />
            ))}
            {products.length !== 0 && (
                <div id='price_details'>
                    <p>items price : ₹{ itemsPrice.toFixed(2)}</p>
                    {/* <div>tax price : ₹{ taxPrice.toFixed(2)}</div> */}
                    {shippingprice === 0 ? ( <p> Free Delivery 😇  </p> ) : (<p>shiping price : ₹{ shippingprice.toFixed(2)}</p>)}                    
                    <h3>total : ₹{ totalPrice.toFixed(2)}</h3>
                    <div>
                        <button onClick={confirmOrder} >Confirm Oder</button>
                    </div>
                </div>
            )}
        </div>
    )
};

export default CartProducts;