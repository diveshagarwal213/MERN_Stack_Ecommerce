import './home.css'
import {HeadCarousel, HomeProductCaro} from './Carousels';

const CenterHeading =  props => {
    return(
        <div id="center_heading" >
            <h2>{props.heading}</h2>
        </div>
    )
};

function Home() {

  return (
    <>
      <HeadCarousel />
      <CenterHeading heading="NEW PRODUCTS" />
      <HomeProductCaro/>
      <div id="empty" ></div>
    </>
  );
}

export default Home;