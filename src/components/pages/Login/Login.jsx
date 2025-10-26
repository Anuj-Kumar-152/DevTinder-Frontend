import { useState } from 'react';
import "./Login.css";
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from '../../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../utils/constants';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { axiosInstance } from '../../../api';

const Login = () => {

    const [emailId, setEmailId] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const res = await axiosInstance.post("/login", {
                emailId,
                password,
            }, { withCredentials: true });
            window.localStorage.setItem("token",res.data?.token)
            dispatch(addUser(res.data));

            toast.success("Welcome to DevTinder 👋", {
                position: "top-center",
                autoClose: 2000,
            });

            // thoda delay taki toast dikh jaye
            setTimeout(() => navigate("/"), 2000);
        } catch (err) {
            console.error(err);
            toast.error("Login failed. Please check your credentials.", {
                position: "top-center",
                autoClose: 2000,
            });
        }
    }

    return (
        <div className='login'>
            <div className='login-form'>
                <div><h2>Login</h2></div>
                <form onSubmit={handleLogin}>
                    <label htmlFor='email'>Email: </label>
                    <input
                        type='text'
                        id="email"
                        placeholder='Enter your Email..'
                        required
                        value={emailId}
                        onChange={(e) => setEmailId(e.target.value)}
                    />

                    <label htmlFor='password'>Password: </label>
                    <input
                        type='password'
                        id="password"
                        placeholder='Enter your Password..'
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button type="submit">Login</button>
                </form>

                <p className="signup-link">
                    Don't have an account?{" "}
                    <span onClick={() => navigate('/signup')}>
                        Signup
                    </span>
                </p>
            </div>

            {/* Toast Container */}
            <ToastContainer />
        </div>
    )
}

export default Login;







 