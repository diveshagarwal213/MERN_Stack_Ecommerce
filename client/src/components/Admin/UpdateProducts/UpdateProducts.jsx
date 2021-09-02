import {  useState } from "react";
import placeholder from '../../../images/placeholder.png'
import FetchSingleProduct from "../../../utils/FetchSingleProduct";
import SearchBox from "./SearchBox";
import axios from 'axios';
import { toast } from "react-toastify";



const UpdateProducts = () => {
    const config ={
        headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
    }
     
    const [singleProduct, setsingleProduct] = useState({
        name: "",
        price: "",
        about: "",
        categories: "",
        flavors:""
    });
    const [fileData, setFileData] = useState(); 
    const [ src, setImg] = useState(placeholder);
    const [deletecfm , setdeletecfm] = useState(false);

    //set selected data for update
    const setIdforUpdate = async (id) => {
        let data = await FetchSingleProduct(id);
        if(data){
            let c = data.categories.join(" ");
            let f = data.flavors.join(" ");
            data = {...data, categories: c, flavors: f}
            setsingleProduct(data);
            setImg(`/public/images/${data.image}`);
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
        setImg(placeholder);
        setFileData(null);
        setsingleProduct({
            name: "",
            price: "",
            about: "",
            categories: "",
            flavors: ""
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
        Data.append('flavors', singleProduct.flavors);
        Data.append('about', singleProduct.about);
        Data.append('id', singleProduct._id);
        Data.append('oldimgname',singleProduct.image);

        //console.log(Array.from(Data));

        try {
            const result = await axios.post(`/admin/updateproduct`, Data, config);
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

    const deleteHandler = async() => {
       try {
        const deleteProduct = await axios.get(`/admin/deleteproduct/${singleProduct._id}`,config);
        console.log(deleteProduct);
        toast.success("Product Deleted")
        resetform();
       } catch (error) {
        if (error.response) {
            toast.error(error.response.data.error.message)
        }else {
            toast.error(error.message);
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
                        <input type="text" onChange={inputHandler} placeholder='flavors' value={singleProduct.flavors} name='flavors' />
                        <textarea placeholder='about' onChange={inputHandler} name='about' value={singleProduct.about} />
                        <label htmlFor="fileData"> Browser image </label>
                        <input type="file" id="fileData" onChange={fileChangeHandler} />
                        <button type='submit' >submit</button>
                    </form>
                    <div id="update_options" >
                        <button id="cancel_btn" onClick={() => resetform()} >Cancel</button>
                        {deletecfm === true ? (
                            <>
                            <button className="delete_btn" onClick={() => deleteHandler()} >confirm</button>
                            <button id="cancel_btn" onClick={() => setdeletecfm(false)} >cancel it</button>
                            </>
                        ) : (<button className="delete_btn" onClick={() => setdeletecfm(true)} >Delete</button>) }
                    </div>
                    </div>
                ) : (<h4>Please select a Product for Update!</h4>)}

                <div id='addP_img' style={{ backgroundImage: `url("${src}")` }} ></div>
            </div>
        
            <SearchBox funsetid={setIdforUpdate} />

        </div>
    );
}

export default UpdateProducts;