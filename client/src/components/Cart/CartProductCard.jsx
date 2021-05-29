import { useEffect, useState } from "react";

const CartProductCard =  (props) => {
    //props  img name price id
    const id = props.id;
    let defaultprice  = props.price;
    const [ProductData ,setProductData] = useState({
        qty: 1,
        size: 1.0
    });
    const [price, setprice] = useState(defaultprice)

    const inputEvent = (e) => {
        const {name , value} = e.target;
        setProductData((preValue)=>{
            //console.log(preValue);
            return{
                ...preValue,
                [name]: value,
            }
        });
    };

    useEffect(() => {
        console.log(ProductData);
        let newprice = ProductData.qty * price
        console.log(newprice);
        setprice(newprice)

    },[ProductData])


    const priceHandler = {}
    return(
        <div className='cartP_card'>
            <div className='cartP_card_img' style={{backgroundImage: `url('${props.img}')`}} ></div>
            <div className='cartP_card_content'>
                <h2>{props.name}</h2>
                qty:<input type="number" name="qty" onChange={inputEvent} value={ProductData.qty}  />
                size:<input type="number" name="size" onChange={inputEvent} value={ProductData.size}  />
                <h3>{price}</h3>

            </div>
        </div>
    );
};

const CartProducts =  props => {
    const data = props.data
    return(
        <div>
            {data.map( c => (
              <CartProductCard key={c.pid} name={c.name} img={c.image} id={c.pid} price={c.price} />
            ))}
        </div>
    )
};

export default CartProducts;