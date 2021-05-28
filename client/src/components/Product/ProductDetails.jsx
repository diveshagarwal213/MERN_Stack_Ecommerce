import { useState } from "react";

const data = {
    pid: 0,
    name: "example ",
    image: "https://source.unsplash.com/NyQwVPacW00",
    price: "200",
    about: "Lorem ipsum dolor sit amet, consectetuer adipisc in elit, sed diam non ummy nibh in euismod tincidunt ut liber tempor laoreet. Nullam viverra orci id lectus aliquam luctus. Aliquam elementum gravida lacus non accumsan. Nullam ultrices purus ac porta tincidunt. Nullam vel scelerisque dui, posuere pulvinar arcu.",
    categories:["Celebration", "Chocolate", "Cupcake", "Desserts"]
}
const ProductD = (props) => {
    const cat = props.categories
    const categories = cat.join(" ");
    
    const [qty, setqty] = useState(1);
    
    const inputhandler = (e) => {
        setqty(e.target.value);
    };

    return (
        <div id='product_D'>
            <div id="productD_imgDiv" style={{backgroundImage: `url("${props.img}")`}} >
            </div>
            <div id='productD_aboutDiv'>
                <h1>{props.name}</h1>
                <h3>₹ {props.price}</h3>
                <p> {props.about} </p>
                <label htmlFor="qty">Qty: </label>
                 <input type="number"  id="qty" value={qty} onChange={inputhandler} min="1" />
                <button>Add to Cart</button>
                <p>ID: {props.id}</p>
                <p>Categories : {categories}</p>

            </div>
        </div>
    );
};

const ProductDetails = ({ match }) => {

    const pId = match.params.pid;

    return (
        <div id="product_details" >
            <ProductD id={pId} img={data.image} name={data.name} price={data.price}  about={data.about}
                categories={data.categories}
            />
            <div id="empty" ></div>
        </div>

    )
};

export default ProductDetails;