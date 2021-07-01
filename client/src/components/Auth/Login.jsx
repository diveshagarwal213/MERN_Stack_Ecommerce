import { useState } from "react";

const Login =  () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    return(
        <div className="auth_form_div">
            <input onChange={(e) => setEmail(e.target.value)} value={email} type="text" placeholder="Email" />
            <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" placeholder="Password" />
            <button>Login</button>
            <button>Forgot password</button>
        </div>
    )
};

export default Login;