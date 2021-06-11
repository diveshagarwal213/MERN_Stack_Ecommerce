import  "./admin.scss";
import AddProducts from "./AddProducts";

const Admin =  () => {
    return(
        <div id='admin'>
            <h1>this is admin</h1>
            <AddProducts/>
            <div id="empty"></div>
        </div>
    )
};

export default Admin;