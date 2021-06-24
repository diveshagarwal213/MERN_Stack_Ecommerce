import OwlCarousel from 'react-owl-carousel';
import { Link } from 'react-router-dom';

import {ProductCard} from '../Product/Product'

const HeadCarousel =  () => {
    const HeadCarItem = props => {
        return(
            <div className='item' style={{ backgroundImage: `url('${props.img_url}')`}} >
                <div className='HeadCarItemContent'>
                  <h1>{props.h4}</h1>
                  <p>{props.text}</p>
                  <Link to={`/${props.link}`}>any button</Link>
                </div>
                <div className='shadow'></div>
            </div>
        );
    }

  return (
    <>
      <div id="head_carousel" >
        <OwlCarousel className='owl-theme' items={1} margin={0} autoplay ={true} loop nav autoplayTimeout={7000}  >
          <HeadCarItem h4="We implement your Delicious Dreams!" text="Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium" img_url="https://source.unsplash.com/r1jXVa8wPFs" />
            <HeadCarItem link="shop" h4="2" text="example" img_url="https://source.unsplash.com/d15KvLtJnyU" />
            <HeadCarItem h4="3" text="example" img_url="https://source.unsplash.com/cKJ8ZxQ2bC8" />
        </OwlCarousel>
      </div>
      
    </>
  );
};


const HomeProductCaro =  (props) => {

  const data = props.data;
  //data must contain => Key, name, image, price

  return (
    <>
      <div className="home_product_Caro" >
        {data.map( product => (
          <ProductCard key={product.pid} product={product} />
        ))}
      </div>
      
    </>
  );
};


export {HeadCarousel, HomeProductCaro};