import { useState } from "react";
import axios from "axios";
import placeholder from '../../images/placeholder.png'
import { toast } from "react-toastify";

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
        if(e.target.files[0]){ //remember => app will crash 'if' not present!
            setFileData(e.target.files[0]); 
            setImg(URL.createObjectURL(e.target.files[0]));   
        }  
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
        
       try {
        const result = await axios.post(`http://${window.location.hostname}:5000/admin/addproduct`, Data);
        //console.log(result.data);
        toast.success("Product Saved!")

        //reset form
        setImg(placeholder);
        setFileData(null);
        setProductData({
            name: "",
            price: "",
            about: "",
            categories: ""
        })

       } catch (error) {
           if (error.response) {
                toast.error(error.response.data.error.message)
           }else{
               toast.error(error.message)
           }
       }
    }

    return (
        <div id='add_products_div' >
            <div id='add_products'>
                <div id='addP_form' >
                    <h1>Add Product</h1>
                    <form onSubmit={onSubmitHandler} autoComplete='off' >
                        <input type="text" onChange={inputHandler} placeholder='name' value={productData.name} name='name' />
                        <input type="number" onChange={inputHandler} placeholder='price' value={productData.price} name='price' />
                        <input list="categories" type="text" onChange={inputHandler} placeholder='categories' value={productData.categories} name='categories' />
                        <textarea  onChange={inputHandler} placeholder='about' value={productData.about} name='about' />
                        <label htmlFor="fileData"> Browser image </label>
                        <input type="file" id="fileData" onChange={fileChangeHandler} />
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