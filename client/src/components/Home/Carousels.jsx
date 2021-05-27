import OwlCarousel from 'react-owl-carousel';


import {ProductCard} from '../Product/Product'

const HeadCarousel =  () => {
    const HeadCarItem = props => {
        return(
            <div className='item' style={{ backgroundImage: `url('${props.img_url}')`}} >
                <div className='HeadCarItemContent'>
                  <h1>{props.h4}</h1>
                  <p>{props.text}</p>
                  <button>any button</button>
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
            <HeadCarItem h4="2" text="example" img_url="https://source.unsplash.com/d15KvLtJnyU" />
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
      <div id="home_product_Caro" >
        <OwlCarousel className='owl-theme'  margin={10} autoplay ={true} loop autoplayTimeout={5000} 
          responsive={{
            0:{
              items:1,
              nav:true
          },
          500:{
            items:2,
            nav:false
          },
          700:{
              items:3,
              nav:false
          },
          1000:{
              items:4,
              nav:false
          }
          }} 
        >
            {data.map( c => (
              <ProductCard key={c.pid} pName={c.name} img_url={c.image} pId={c.pid} price={c.price} />
            ))}

        </OwlCarousel>
      </div>
      
    </>
  );
};


export {HeadCarousel, HomeProductCaro};