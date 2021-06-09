import { useState } from "react";
import axios from "axios";


const AddProducts = () => {

    const [fileData, setFileData] = useState();
    const [productData, setProductData] = useState({
        name: "",
        price: "",
        about: "",
        categories: ""
    });

    const fileChangeHandler = (e) => {
        setFileData(e.target.files[0]);
    }

    const inputHandler = (e) => {
        const {name , value} = e.target;
        setProductData((preValue)=>{
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
        Data.append('name', productData.name);
        Data.append('price', productData.price);
        Data.append('categories', productData.categories);
        Data.append('about', productData.about);
        
        //console.log(Array.from(Data));
        //send Formdata
       try {
        
        const result = await axios.post("http://localhost:5000/admin/addproduct", Data);
        console.log("file sent");
        console.log(result.data);

       } catch (error) {
           console.log(error.response.data.error);
       }
    }

    return(
        <div id='add_products'>
            <h1>Add Products</h1>
            <form onSubmit={onSubmitHandler} >

                <input type="text" onChange={inputHandler} placeholder='name' value={productData.name} name ='name' />
                <input type="number" onChange={inputHandler} placeholder='price' value={productData.price} name ='price' />
                <input type="text" onChange={inputHandler} placeholder='categories' value={productData.categories} name ='categories' />
                <input type="text" onChange={inputHandler} placeholder='about' value={productData.about} name ='about' />
                <br />
                <input type="file" onChange={fileChangeHandler} />
                <br />
                <button type='submit' >submit</button>
            </form>
        </div>
    )
};

const Admin =  () => {
    return(
        <div id='admin'>
            <h1>this is admin</h1>
            <AddProducts/>
        </div>
    )
};

export default Admin;