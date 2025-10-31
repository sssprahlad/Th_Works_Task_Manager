
import "./Login.css";
import { LOGIN_API } from "../../../constants/Constant";
import { useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {

    const [userDetais, setUserDetails] = useState({
        emai:"",
        password:""
    });
    const navigator = useNavigate();

    const handleInputChange =(e) => {
        const {name,value} = e.target;

        setUserDetails({...userDetais, [name] : value});

    }


    const handleSubmit = async(e) => {
        e.preventDefault();

        try{
            const response =  await fetch(LOGIN_API,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                },
                body:JSON.stringify(userDetais)
            });
            if(response.status === 200){
                //console.log(await response.json());
                const data = response.json();
                localStorage.setItem("token",data.token);
                navigator("/");

            }
        }catch(error){
            console.log(error)
        }


    }






    return(
        <div className="login-container">
            <form className="form" onSubmit={handleSubmit}>
                <div className="message-cont">
                    <h1 className="">Welcome back</h1>
                    <p className="message-sub-title">Sign in to your accout</p>
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input id="email" name = "email" placeholder="Enter your email" onChange={handleInputChange}/>
                </div>
                 <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input id="password" name = "password" placeholder="Enter your password" onChange={handleInputChange}/>
                </div>
                <button className="login-btn" type="submit">Login</button>
                <p className="sing-up-text">Don't have an account? <span className="span">Sign up</span></p>

            </form>

        </div>
    )


    
}

export default Login;
