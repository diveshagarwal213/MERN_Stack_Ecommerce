import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import './HomePage.scss'
import { useEffect, useState } from 'react';
import {HeadCarousel, HomeProductCaro} from './Carousels';

//custom hooks
import useDocTitle from '../../hooks/useDocTitle';

//uitls
import FetchMostPopular from '../../utils/FetchMostPopular';
import LoadingComponent from "../../utils/LoadingComponent";

//images
import cupcakePng from '../../images/cupcake.png'


const CenterHeading =  props => {
    return(
        <div id="center_heading" >
            <h2>{props.heading}</h2>
            <div id="center_heading_icons">
              <div></div>
              <img src={cupcakePng} alt="sweet" />
              <div></div>
            </div>
        </div>
    )
};

const  Home = () => {

  useDocTitle('');

  const [mostpoplar, setMostPopular ] = useState([]);

  const mostPopularProducts = async () => {
    const result = await FetchMostPopular(10);
    if (result) {
      let products = result.data.products;
      products = products.map(x => {return{pid : x._id, ...x}});
      setMostPopular(products);
    } 
  }

  useEffect(() => {
    mostPopularProducts();
  },[])

  return (
    <div id="home">
      <HeadCarousel />
      <CenterHeading heading="most popular" />
      {mostpoplar.length > 0 ? (<HomeProductCaro data={mostpoplar}/>) : (<LoadingComponent/>) }
      
      <div id="empty"></div>
    </div>
  );
}

export default Home;