import CartProducts from "./CartProductCard";

const data = [
    {
        pid: 0,
        name: "example ",
        image: "https://source.unsplash.com/NyQwVPacW00",
        price: "200"
    },
    {
        pid: 1,
        name: "example 1",
        image: "https://source.unsplash.com/qJ0zGkrE1Zg",
        price: "350"
    }
]

const UserCart = () => {
    return (
        <div>
            <h1>this is user cart</h1>
            <CartProducts data={data} />
        </div>
    )
};

export default UserCart;