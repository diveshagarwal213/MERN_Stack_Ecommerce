import { Link, useHistory } from "react-router-dom";
import useDocTitle from "../../hooks/useDocTitle";
import { withRouter } from "react-router";
import LogOut from "../../utils/LogOut";
import AddressCard from './AddressCard';
import UsersOrders from './UsersOrders';
import { rootUserData } from "../../utils/ClientOther";

const UserProfile = () => {
    useDocTitle('User |');
    const history = useHistory();
    const logoutHandler =  () => {
        LogOut();
        history.push('/');
    };
    const user = rootUserData(true);
    if(!user){
        LogOut();
    }

    return(
        <div id="user_profile">
            <h1>{user.email}</h1>
            <Link to='admin1'>admin</Link>
            <button onClick={logoutHandler} >Logout</button>
            <AddressCard/>
            <UsersOrders/>
        </div>
    );
};

export default withRouter(UserProfile);