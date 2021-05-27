import './home.css'
import {HeadCarousel, HomeProductCaro} from './Carousels';

const data =[
  {
    pid:0,
    name:"abc0",
    image:"https://source.unsplash.com/NyQwVPacW00",
    price:"200"
  },
  {
    pid:1,
    name:"abc1",
    image:"https://source.unsplash.com/qJ0zGkrE1Zg",
    price:"350"
  },
  {
    pid:2,
    name:"abc2",
    image:"https://source.unsplash.com/hUNfnnurygs",
    price:"250"
  },
  {
    pid:3,
    name:"abc3",
    image:"https://source.unsplash.com/diUixdrqh0Q",
    price:"400"
  },
]

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
      <HomeProductCaro data={data}/>
      <div id="empty"></div>
    </>
  );
}

export default Home;