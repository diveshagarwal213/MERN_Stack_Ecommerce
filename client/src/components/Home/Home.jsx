import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import './HomePage.scss'
import {HeadCarousel, HomeProductCaro} from './Carousels';

//custom hooks
import useDocTitle from '../../hooks/useDocTitle';
//images
import cupcakePng from '../../images/cupcake.png'
import { useContext } from 'react';
import { CountContext } from '../../App';

const data =[
  {
    pid:0,
    name:"example ",
    image:"https://source.unsplash.com/NyQwVPacW00",
    price:"200"
  },
  {
    pid:1,
    name:"example 1",
    image:"https://source.unsplash.com/qJ0zGkrE1Zg",
    price:"350"
  },
  {
    pid:2,
    name:"example 2",
    image:"https://source.unsplash.com/hUNfnnurygs",
    price:"250"
  },
  {
    pid:3,
    name:"example 3",
    image:"https://source.unsplash.com/diUixdrqh0Q",
    price:"400"
  },
]

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

function Home() {

  useDocTitle('');

  return (
    <div id="home">
      <HeadCarousel />
      <CenterHeading heading="most popular" />
      <HomeProductCaro data={data}/>
      <div id="empty"></div>
    </div>
  );
}

export default Home;