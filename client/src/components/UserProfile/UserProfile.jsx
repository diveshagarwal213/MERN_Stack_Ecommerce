import './user.scss';
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
            <div id="user_heading">
                <h2>{user.username}</h2>
                <p>{user.email}</p>
                <button onClick={logoutHandler} >Logout</button>
            </div>
            <AddressCard/>
            <UsersOrders/>
        </div>
    );
};

export default withRouter(UserProfile);