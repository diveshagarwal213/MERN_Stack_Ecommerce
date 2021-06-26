import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import SearchProductByName, {SearchByCatAndFlav} from "../../utils/FetchSearchProduct";
import axios from "axios";

const ShopSideBar =  (props) => {

    const {productDataDispatch, fetchData} = props;
    const [search , setsearch] = useState('');
    //const [catarr, setcatarr] = useState([]);
    //const [favarr, setfavarr] = useState([]);
    const [Categories, setCategories] = useState({
        defaultarr:[],
        userSelect:[]
    });
    const [Flavors, setFlavors] = useState({
        defaultarr:[],
        userSelect:[]
    });

    const fetchCategories = async () => {
        const result = await axios.get(`http://${window.location.hostname}:5000/public/alldistinctcategories?&fav=true`);
        if(result){
            let Categories  = result.data.categories
            let flavors  = result.data.flavors
            setCategories((pre) => {
                return {
                    ...pre,
                    defaultarr: Categories
                }
            });
            setFlavors(pre => {
                return {
                    ...pre,
                    defaultarr: flavors
                }
            });
        }
    }

    const searchHandler = async ( search) => {

        if(search.length >= 3 ){
            const result = await SearchProductByName(search);
            if(result){
                const products = result.data.products
                const shopProducts = products.map(row => {return { pid : row._id ,...row}});
                productDataDispatch({
                    type: 'FETCH_UP',
                    data: shopProducts
                });
                productDataDispatch({
                    type: 'HASNEXT',
                    data: false
                });
            }
        }else{
            toast.warning("type at least 3 words");
        }
    }

    const CatOrFlaHandler = () => {
        SearchByCatAndFlav()
    }

    const CatOrflav = (keyword) => {
        let n = Categories.userSelect.includes(keyword);
        if(n){//remove
            console.log("remove");
            n = Categories.userSelect;
            
            let  index = n.indexOf(keyword);

            n.splice(index, 1);//return deleted value

            setCategories((pre) => {
                return{
                    ...pre,
                    userSelect: n
                }
            });

        }else{//add
            let y = Categories.userSelect;
            setCategories((pre) => {
                return{
                    ...pre,
                    userSelect: [...y, keyword]
                }
            });
        } 
        
    };  

    const resetShop = () =>{
        //setcatarr([]);
        setsearch("");
        fetchData();
    }
    
    useEffect(() => {
        fetchCategories()
    },[])

    return(
        <div id="shop_side_bar">
            <div id='shop_search_product'>
                <input type="text" value={search} name='keyword' placeholder='Search by Name' onChange={(e) => setsearch(e.target.value)} />
                <button onClick={() => searchHandler(search)}>Search</button>
            </div>
                <button onClick={()=> resetShop() } >Reset Shop</button>
            <div id="default_categories">
                <h3>Select Categories</h3>
                { Categories.defaultarr.map(n => (<button key={n} onClick ={() => CatOrflav(n)}>{n}</button>)) }
                <h3>Select Flavors</h3>
                { Flavors.defaultarr.map(n => (<button key={n} onClick ={() => CatOrflav(n)}>{n}</button>)) }
            </div>
            <div id="user_selected_Categories">
                {Categories.userSelect.map(n => (<button key ={n} onClick={() => CatOrflav(n)} > {n} X </button> ) )}
            </div>
        </div>
    );
};

export default ShopSideBar;