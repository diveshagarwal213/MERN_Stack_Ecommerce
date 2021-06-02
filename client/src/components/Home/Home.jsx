import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import './HomePage.scss'
import {HeadCarousel, HomeProductCaro} from './Carousels';

//custom hooks
import useDocTitle from '../../hooks/useDocTitle';
//images
import cupcakePng from '../../images/cupcake.png'

import {Productdata} from '../../data';

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
      <HomeProductCaro data={Productdata}/>
      <div id="empty"></div>
    </div>
  );
}

export default Home;