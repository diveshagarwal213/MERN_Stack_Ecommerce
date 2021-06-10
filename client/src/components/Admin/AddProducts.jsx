import { useState } from "react";
import axios from "axios";
import placeholder from '../../images/placeholder.png'

const AddProducts = () => {
    
    const [ src, setImg] = useState(placeholder)
    const [fileData, setFileData] = useState();
    const [productData, setProductData] = useState({
        name: "",
        price: "",
        about: "",
        categories: ""
    });

    const fileChangeHandler = (e) => {
        setFileData(e.target.files[0]);
        if(e.target.files[0]) setImg(URL.createObjectURL(e.target.files[0])); //preview image, if imp 
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
           if (error.response) {
                console.log(error.response.data.error.message);
           }else{
               console.log(error.message);
           }
       }
    }

    return (
        <div id='add_products_div' >
            <div id='add_products'>
                <div id='addP_form' >
                <h1>Add Products</h1>
                    <form onSubmit={onSubmitHandler} autoComplete='off' >
                        <input type="text" onChange={inputHandler} placeholder='name' value={productData.name} name='name' />
                        <input type="number" min={1} onChange={inputHandler} placeholder='price' value={productData.price} name='price' />
                        <input list="categories" type="text" onChange={inputHandler} placeholder='categories' value={productData.categories} name='categories' />
                        <textarea  onChange={inputHandler} placeholder='about' value={productData.about} name='about' />
                        <label htmlFor="fileData"> Browser image </label>
                        <input type="file" id="fileData" accept=".png, .jpg, .jpeg" onChange={fileChangeHandler} />
                        <button type='submit' >submit</button>

                        <datalist id="categories">
                            <option value="cake" />
                            <option value="chocolate" />
                            <option value="Vanilla" />
                            <option value="coconut" />
                        </datalist>

                    </form>
                </div>
                
                <div id='addP_img' style={{ backgroundImage: `url("${src}")` }} ></div>
            </div>
        </div>
    )
};

export default AddProducts;