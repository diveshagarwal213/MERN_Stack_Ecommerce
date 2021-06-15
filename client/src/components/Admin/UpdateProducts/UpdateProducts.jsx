import {  useState } from "react";
import placeholder from '../../../images/placeholder.png'
import FetchSingleProduct from "../../../utils/FetchSingleProduct";
import SearchBox from "./SearchBox";



const UpdateProducts = () => {
    
    //const [search, setSearch] = useState(""); 
    const [singleProduct, setsingleProduct] = useState({
        name: "",
        price: "",
        about: "",
        categories: ""
    });
    const [fileData, setFileData] = useState(); 
    const [ src, setImg] = useState(placeholder);


    //set selected data for update
    const setIdforUpdate = async (id) => {
        let data = await FetchSingleProduct(id);
        if(data){
            let s = data.categories.join(" ");
            data = {...data, categories: s}
            setsingleProduct(data);
            setImg(`http://localhost:5000/public/images/${data.image}`);
        }
    }

    const fileChangeHandler = (e) => {
        setFileData(e.target.files[0]);
        if(e.target.files[0]) setImg(URL.createObjectURL(e.target.files[0])); //preview image, if imp 
    }

    const inputHandler = (e) => {
        const {name , value} = e.target;
        setsingleProduct((preValue)=>{
            //console.log(preValue);
            return{
                ...preValue,
                [name]: value,
            }
        });
    }

    //submit
    const  onSubmitHandler = async (e) => {
        e.preventDefault();

        const Data = new FormData()
        
        //handel keys & values
        Data.append('images', fileData);
        Data.append('name', singleProduct.name);
        Data.append('price', singleProduct.price);
        Data.append('categories', singleProduct.categories);
        Data.append('about', singleProduct.about);
        Data.append('id', singleProduct._id);

        //console.log(Array.from(Data));
    }

    return (
        <div id='update_productsDiv'>

            <div id='add_products'>
                <div id='addP_form' >
                    <h1>update Product</h1>
                    <form autoComplete='off' onSubmit={onSubmitHandler} >
                        <h4>Product ID : {singleProduct._id} </h4>
                        <input type="text" onChange={inputHandler} value={singleProduct.name} placeholder="name" name='name' />
                        <input type="number" onChange={inputHandler} value={singleProduct.price} placeholder='price'  name='price' />
                        <input type="text" onChange={inputHandler} placeholder='categories' value={singleProduct.categories} name='categories' />
                        <textarea placeholder='about' onChange={inputHandler} name='about' value={singleProduct.about} />
                        <label htmlFor="fileData"> Browser image </label>
                        <input type="file" id="fileData" onChange={fileChangeHandler} />
                        <button type='submit' >submit</button>
                    </form>
                </div>

                <div id='addP_img' style={{ backgroundImage: `url("${src}")` }} ></div>
            </div>
        
            <SearchBox funsetid={setIdforUpdate} />

        </div>
    );
}

export default UpdateProducts;