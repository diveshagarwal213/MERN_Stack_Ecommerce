import { Link, useHistory } from "react-router-dom";
import useDocTitle from "../../hooks/useDocTitle";
import { withRouter } from "react-router";
import LogOut from "../../utils/LogOut";

const UserProfile = () => {
    useDocTitle('User |');
    const history = useHistory();
    const logoutHandler =  () => {
        LogOut();
        history.push('/');
    };

    return(
        <>
            <h1>this is UserProfile</h1>
            <Link to='admin1'>admin</Link>
            <button onClick={logoutHandler} >Logout</button>
        </>
    );
};

export default withRouter(UserProfile);