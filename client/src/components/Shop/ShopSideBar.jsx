import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import SearchProduct from "../../utils/FetchSearchProduct";
import axios from "axios";

const ShopSideBar =  (props) => {

    const {productDataDispatch, fetchData} = props;
    const [search , setsearch] = useState('');
    const [catarr, setcatarr] = useState([]);
    const [defaultCategories, setDefaultCategories] = useState(["shake"]);

    const fetchCategories = async () => {
        const result = await axios.get(`http://${window.location.hostname}:5000/public/alldistinctcategories`);
        if(result){
            let Categories  = result.data.categories
            setDefaultCategories(Categories);
        }
    }

    const searchHandler = async (searchKey ,mostPupular = false, cat=false) => {
        if(searchKey.length >= 3 ) {
            const result = await SearchProduct(searchKey,mostPupular,cat);
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
            if (cat){
                fetchData();
            }else{
                toast.warning("type at least 3 words");
            }
        } 
    }

    const SearchByCat = (keyword) => {
        let n = catarr.includes(keyword);
        if(n){
            n = [...catarr];
            let  index = n.indexOf(keyword);
            n.splice(index, 1);
            setcatarr(n);
        }else{
            n = [...catarr, keyword]
            setcatarr(n);
        }
        n = n.join(" "); 
        searchHandler(n,true,true);
    };  

    const resetShop = () =>{
        setcatarr([]);
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
                { defaultCategories.map(n => (<button key={n} onClick ={() => SearchByCat(n)}>{n}</button>)) }
            </div>
            <div id="user_selected_Categories">
                {catarr.map(n => (<button key ={n} onClick={() => SearchByCat(n)} > {n} X </button> ) )}
            </div>
        </div>
    );
};

export default ShopSideBar;