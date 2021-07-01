import { useState } from "react";

const SignUp =  () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    return(
        <div className="auth_form_div">
            <input onChange={(e) => setUsername(e.target.value)} value={username} type="text" placeholder="User Name" required />
            <input onChange={(e) => setEmail(e.target.value)} value={email} type="text" placeholder="Email" required />
            <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" placeholder="Password" required />
            <button>Sign Up</button>
            <p>Terms & coditions </p>
        </div>
    )
};

export default SignUp;