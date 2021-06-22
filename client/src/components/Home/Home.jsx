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
import FetchProducts from '../../utils/FetchProducts';

//images
import cupcakePng from '../../images/cupcake.png';
import {classesOpenSvg} from '../../images/allSvg';

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
  const [newproducts, setNewProducts ] = useState([]);

  const mostPopularProducts = async () => {
    const result = await FetchMostPopular(10);
    if (result) {
      let products = result.data.products;
      products = products.map(x => {return{pid : x._id, ...x}});
      setMostPopular(products);
    } 
  }

  const newProducts = async () => {
    const result = await FetchProducts(false,10);
    if (result) {
      let products = result.data.products;
      products = products.map(x => {return{pid : x._id, ...x}});
      setNewProducts(products);
    } 
  };

  useEffect(() => {
    mostPopularProducts();
    newProducts();
  },[])

  return (
    <div id="home">
      <HeadCarousel />
      <CenterHeading heading="most popular" />
      {mostpoplar.length > 0 ? (<HomeProductCaro data={mostpoplar}/>) : (<LoadingComponent/>) }
      {/* <div id="class_open"  >
        <div id="class_openContent">
          <h1>Class Opening</h1>
          <h2>Snack Cake</h2>
          <div>
            <p>01:00 PM Monday</p>
            <p>02:00 PM Monday</p>
          </div>
        </div>
        <div id="class_openSvg" > {classesOpenSvg} </div>
      </div> */}
      {/* <CenterHeading heading="new products" />
      {newproducts.length > 0 ? (<HomeProductCaro data={newproducts}/>) : (<LoadingComponent/>) } */}
      
      <div id="empty"></div>
    </div>
  );
}

export default Home;