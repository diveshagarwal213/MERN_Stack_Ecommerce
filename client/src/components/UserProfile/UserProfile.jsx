import { Link } from "react-router-dom";
import useDocTitle from "../../hooks/useDocTitle";
import { withRouter } from "react-router";

const UserProfile = () => {
    useDocTitle('User |');
    return(
        <>
            <h1>this is UserProfile</h1>
            <Link to='admin1'>admin</Link>
        </>
    );
};

export default withRouter(UserProfile);