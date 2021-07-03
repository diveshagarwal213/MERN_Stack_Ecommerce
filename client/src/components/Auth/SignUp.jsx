import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import ApiErrorHandler, {rootUserData} from "../../utils/ClientOther";

const SignUp =  () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cpassword, setcPassword] = useState("");
    const [username, setUsername] = useState("");
    const history = useHistory();

    const SignUpHandler = async (e) => {
        
        e.preventDefault();
        const Userdata = {email, password, username};
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };
        try {
            if(cpassword !== password) {
               return ApiErrorHandler("password not match",true);
            }else{
                const requestToken = await axios.post(`http://${window.location.hostname}:5000/auth/register`, Userdata, config);
                if(requestToken.data.accessToken){
                    localStorage.setItem("accessToken", requestToken.data.accessToken); 
                    localStorage.setItem("isLogin", true); 
                    rootUserData(requestToken.data.rootUser);
                    history.push('/userprofile');
                }
            }

        } catch (e) {
            ApiErrorHandler(e);
        }        
    }

    return(
        <div className="auth_form_div">
            <form onSubmit={SignUpHandler} spellCheck="off">
                <input onChange={(e) => setUsername(e.target.value)} value={username} type="text" placeholder="User Name" required />
                <input onChange={(e) => setEmail(e.target.value)} value={email} type="text" placeholder="Email" required />
                <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" placeholder="Password" required />
                <input onChange={(e) => setcPassword(e.target.value)} value={cpassword} type="password" placeholder="confirm Password" required />
                <button type="submit" >Sign Up</button>
            </form>
            <p>Terms & coditions </p>
        </div>
    )
};

export default SignUp;