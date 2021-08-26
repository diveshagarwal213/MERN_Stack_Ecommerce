import { useContext, useState } from "react";
import { CartContext } from '../../App'
import {trashSvg} from '../../images/allSvg'
import DatePicker from 'react-datepicker';
import PlaceOrdserApi from "../../utils/PlaceOrder";
/* import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes"; */

const CartProductCard = (props) => {
    const cartContext = useContext(CartContext);
    const { product } = props
    //console.log(product);
    return (
        <div className='cartP_card'>
            <div className='cartP_card_img' style={{ backgroundImage: `url('/public/images/${product.image}')` }} ></div>
            <div className='cartP_card_content'>
                <h2>
                    {product.name}
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
    const cartContext = useContext(CartContext);
    const products = cartContext.cartState;
    const {cartDispatch} = cartContext;

    //time
    let nextDay = new Date();
    nextDay.setDate(nextDay.getDate() + 1);
    const [selectedDate, setSelectedDate] = useState(nextDay);
          
    //price
    const subtotal = products.reduce((a, c) => a + c.price * c.qty, 0);
    //const taxPrice = subtotal * 0.03;
    const shippingprice = subtotal > 300 ? 0 : 30;
    const totalPrice = subtotal + shippingprice;

    const confirmOrder = async () => {
         const order = {
            items : products.map(x => {return{_id: x._id, qty: x.qty}}),
            selectedDate : selectedDate
        } 
        const result = await PlaceOrdserApi(order);
        if(result){
            //empty cart
            cartDispatch({type: 'EMPTY'});
        }
    }

    return (
        <div id='cart_products'>
            {products.length === 0 && <div id='empty_cart'>Idiot add somthing first!!😤</div>}
            {products.map(product => (
                <CartProductCard key={product.pid} product={product} />
            ))}
            {products.length !== 0 && (
                <div id='orders_details'>
                    <DatePicker 
                        selected={selectedDate}
                        onChange={date => setSelectedDate(date)}
                        dateFormat="MMMM d"
                        minDate={new Date()}
                    />      
                </div>
            )}
            {products.length !== 0 && (
                <div id='price_details'>
                    <p>items price : ₹{ subtotal.toFixed(2)}</p>
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