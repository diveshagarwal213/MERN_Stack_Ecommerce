import {  useState } from "react";
import placeholder from '../../../images/placeholder.png'
import FetchSingleProduct from "../../../utils/FetchSingleProduct";
import SearchBox from "./SearchBox";
import axios from 'axios';
import { toast } from "react-toastify";



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

    const resetform = () => {
        //reset form
        console.log(singleProduct);
        setImg(placeholder);
        setFileData(null);
        setsingleProduct({
            name: "",
            price: "",
            about: "",
            categories: ""
        })
    };

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
        Data.append('oldimgname',singleProduct.image);

        //console.log(Array.from(Data));

        try {
            const result = await axios.post("http://localhost:5000/admin/updateproduct", Data);
            //console.log(result);
            toast.success("Product Updated!")

            resetform();

        } catch (error) {
            if (error.response) {
                toast.error(error.response.data.error.message)
           }else{
               toast.error(error.message)
           }
        }
    }

    return (
        <div id='update_productsDiv'>

            <div id='add_products'>
                {singleProduct._id ? (
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
                    <button id="cancel_btn" onClick={() => resetform()} >Cancel</button>
                </div>
                ) : (<h4>Please select a Product for Update</h4>)}

                <div id='addP_img' style={{ backgroundImage: `url("${src}")` }} ></div>
            </div>
        
            <SearchBox funsetid={setIdforUpdate} />

        </div>
    );
}

export default UpdateProducts;