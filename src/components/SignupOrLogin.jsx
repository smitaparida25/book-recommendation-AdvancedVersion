import React from "react";
import { useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { TbLockPassword } from "react-icons/tb";
import { MdEmail } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignupOrLogin = () => {
    const navigate = useNavigate();

    const [isLogin, setIsLogin] = useState(false);
    const toggleForm = () => setIsLogin(prev => !prev);

    const handleSubmit = async(e) =>{
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const data = {
            username: formData.get("username"),
            email: formData.get("email"),
            password: formData.get("password")
        };

        const url = isLogin ? "http://localhost:5000/api/auth/login" : "http://localhost:5000/api/auth/signup";

        try{
            const response = await axios.post(url,data);
            console.log("Full response:", response.data);
            console.log(response.status);

            if(response.status === 201 && response.data.success === true){
                console.log("success:", response.data.message);
                navigate("/dashboard");
            }
            else{
                console.error("error:", response.data.message);
            }
        }
            catch(error){
                console.error("error", error.response);
            }
        };

    return(
        <div className="wrapper">
            {isLogin ? (
                <form onSubmit={handleSubmit}>
                    <h1>Login</h1>
                    <div className="input-box">
                    <input type= "text" name="username" placeholder="Username or Phone Number or Email" required />
                    <FaRegUserCircle className="icon" />
                    </div>
                <div className="input-box">
                    <input type="password" name="password" placeholder="Password" required/>
                    <TbLockPassword className="icon" />
                </div>
                <div className="remember-forgot">
                    <label><input type="checkbox"/>Remember me</label>
                    <a href="#">Forgot Password?</a>
                </div>
                <button type="submit">Login</button>
                </form>
            ) : (
                <form onSubmit={handleSubmit}>
                <h1>Create an Account</h1>
                <div className="input-box">
                    <input type= "text" name="username" placeholder="Username" required />
                    <FaRegUserCircle className="icon"/>
                </div>
                <div className="input-box">
                    <input type="text" name="email" placeholder="Email" required />
                    <MdEmail className="icon"/>
                </div>
                <div className="input-box">
                    <input type="password" name="password" placeholder="Password" required/>
                    <TbLockPassword className="icon"/>
                </div>
                <button type="submit">Signup</button>
            </form>
            )}
            <button className="toggle-link"onClick={toggleForm}>
                {isLogin ? "Don't have an account SignUp!" : "Already have an account? Login"}
            </button>
        </div>
    );
}
export default SignupOrLogin;