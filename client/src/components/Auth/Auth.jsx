import './auth.scss';
import { useState } from "react";
import Login from './Login';
import SignUp from './SignUp';
import {LoginSvg, RegisterSvg} from '../../images/allSvg';


const Auth =  () => {
    const [authNav, setauthNav] = useState("LOGIN");

    return(
        <div id='auth'>
            <div id="auth_inner_div" >
                <div id="auth_content_div">
                    {authNav === "LOGIN" ? (<Login />) : ("")}
                    {authNav === "REGISTER" ? (<SignUp />) : ("")}
                </div>
                <div id="auth_img_div" >
                    {authNav === "LOGIN" ? (
                        <button className="btn" onClick={() => setauthNav("REGISTER")}> {RegisterSvg} </button>
                    ) : (
                        <button className="btn" onClick={() => setauthNav("LOGIN")}>  {LoginSvg} </button>
                    )}
                </div>
            </div>
        </div>
    )
};

export default Auth;