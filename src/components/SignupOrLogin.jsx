import React from "react";
import { useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { TbLockPassword } from "react-icons/tb";
import { MdEmail } from "react-icons/md";
import axios from "axios";

const SignupOrLogin = () => {
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

        const url = isLogin? "http://localhost:5000/login" : "http://localhost:5000/signup";

        try{
            const response = await axios.post(url,data);
            if(response.data.success){
                console.log("success:", response.data.message);
            }
            else{
                console.error("error:", response.data.message);
            }
        }
            catch(error){
                console.error("error", error);
            }
        };

    return(
        <div className="wrapper">
            {isLogin ? (
                <form onSubmit={handleSubmit}>
                    <h1>Login</h1>
                    <div className="input-box">
                    <input type= "text" placeholder="Username or Phone Number or Email" required />
                    <FaRegUserCircle className="icon" />
                </div>
                <div className="input-box">
                    <input type="password" placeholder="Password" required/>
                    <TbLockPassword className="icon" />
                </div>
                <div className="remember-forgot">
                    <label><input type="checkbox"/>Remember me</label>
                    <a href="#">Forgot Password?</a>
                </div>
                <button type="submit">Login</button>
                </form>
            ) : (
                <form action="">
                <h1>Create an Account</h1>
                <div className="input-box">
                    <input type= "text" placeholder="Username" required />
                    <FaRegUserCircle className="icon"/>
                </div>
                <div className="input-box">
                    <input type="text" placeholder="Email" required />
                    <MdEmail className="icon"/>
                </div>
                <div className="input-box">
                    <input type="password" placeholder="Password" required/>
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