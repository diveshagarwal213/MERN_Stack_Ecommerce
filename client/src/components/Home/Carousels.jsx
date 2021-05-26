import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

const HeadCarousel =  () => {
    const HeadCarItem = props => {
        return(
            <div class='item' style={{ backgroundImage: `url('${props.img_url}')`}} >
                <h4>{props.h4}</h4>
                <p>{props.text}</p>
            </div>
        );
    }

  return (
    <>
      <div id="head_carousel" >
        <OwlCarousel className='owl-theme' items={1} margin={0} autoplay ={true} loop nav autoplayTimeout={7000}  >
            <HeadCarItem h4="1" text="example" img_url="https://source.unsplash.com/r1jXVa8wPFs" />
            <HeadCarItem h4="2" text="example" img_url="https://source.unsplash.com/d15KvLtJnyU" />
            <HeadCarItem h4="3" text="example" img_url="https://source.unsplash.com/cKJ8ZxQ2bC8" />
        </OwlCarousel>
      </div>
      
    </>
  );
};

const ProductCard =  props => {
  return(
    <div class='item'  >
      <div className="productCard_img" style={{ backgroundImage: `url('${props.img_url}')` }} ></div>
      <div>
        <h3>{props.pName}</h3>
      </div>
    </div>
  )
};

const HomeProductCaro =  () => {
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
            <ProductCard pName="abc" img_url="https://source.unsplash.com/qJ0zGkrE1Zg" />
            <ProductCard pName="abc2" img_url="https://source.unsplash.com/NyQwVPacW00" />
            <ProductCard pName="abc3" img_url="https://source.unsplash.com/hUNfnnurygs" />
            <ProductCard pName="abc4" img_url="https://source.unsplash.com/diUixdrqh0Q" />
            <ProductCard pName="abc5" img_url="https://source.unsplash.com/BrlulMlg82c" />
            <ProductCard pName="abc3" img_url="https://source.unsplash.com/4rfVL3NNGrA" />
        </OwlCarousel>
      </div>
      
    </>
  );
};

export {HeadCarousel, HomeProductCaro};