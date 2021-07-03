import { useState } from "react";
import axios from "axios";
import ApiErrorHandler, {rootUserData} from '../../utils/ClientOther';
import { useHistory } from "react-router-dom";

const Login =  () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();

    const LoginHandler = async (e) => {
        e.preventDefault();
        const loginDetails ={email, password};
        try {
            const requestToken = await axios.post(`http://${window.location.hostname}:5000/auth/login`,loginDetails);
            if(requestToken.data.accessToken){
                localStorage.setItem("accessToken", requestToken.data.accessToken); 
                localStorage.setItem("isLogin", true);
                rootUserData(requestToken.data.rootUser);
                
                history.push('/userprofile');
            }else{
                ApiErrorHandler("somthing wrong",true);
            }
        } catch (error) {
            ApiErrorHandler(error);
        }
    };

    return(
        <div className="auth_form_div">
            <form onSubmit={LoginHandler} spellCheck="off" >
                <input onChange={(e) => setEmail(e.target.value)} value={email} type="text" placeholder="Email" required />
                <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" placeholder="Password" required />
                <button type="submit" >Login</button>
            </form>
            <button>Forgot password</button>
        </div>
    )
};

export default Login;