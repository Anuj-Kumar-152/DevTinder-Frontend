import { useState } from "react";
import "./Navbar.css";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { axiosInstance } from "../../../api";

function Navbar() {
    const user = useSelector((store) => store.user);
    const [toggle, setToggle] = useState(false);
    const navigate = useNavigate();

    const makeToggleFeatures = () => {
        setToggle(!toggle);
    };

    const handleLogout = async () => {
        try {
            await axiosInstance.post(
                "/logout",
                {},
                { withCredentials: true }
            );
            setToggle(false);
            navigate("/login");
        } catch (err) {
            console.error(err);
        }
    };
    setTimeout(() => {
      setToggle(false);  
    }, 6000);

    return (
        <div className="navbar">
            <div className="flex-1">
                <Link to="/" className="brand">
                    DevTinder
                </Link>
            </div>

            <div className="flex gap-2">
                <div className="dropdown">
                    {user && (
                        <div className="avatar-btn" onClick={makeToggleFeatures}>
                            <p className="welcome-text">Welcome, {user.firstName}</p>
                            <img
                                alt="Avatar"
                                src={user.photoUrl}
                                className="avatar-img"
                            />
                        </div>
                    )}

                    {toggle && (
                        <ul
                            className={`menu dropdown-content ${
                                toggle ? "show" : ""
                            }`}
                        >
                            <li>
                                <Link to="/profile">
                                    Edit Profile 
                                </Link>
                            </li>
                            <li>
                                <Link to="/connections">Friends</Link>
                            </li>
                            <li>
                                <Link to="/requests">Connection Requests</Link>
                            </li>
                           
                            <li> 
                                <Link to="/premium">Premium <span className="badge1">New</span></Link>
                            </li>
                            <li>
                                {/* <a onClick={handleLogout}>Logout</a> */}
                                <Link to ="/logout" onClick={handleLogout}>Logout</Link>
                            </li>
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Navbar;











// import { useState } from "react";
// import "./Navbar.css";
// import { useSelector } from "react-redux";
// import { Link, useNavigate } from "react-router-dom";   // ⬅️ added useNavigate
// import axios from "axios";
// import { BASE_URL } from "../../utils/constants";

// function Navbar() {

//     const user = useSelector(store => store.user);
//     const [toggle, setToggle] = useState(false);
//     const navigate = useNavigate();   // ⬅️ initialize navigate

//     const makeToggleFeatures = () => {
//         setToggle(!toggle);
//     }

//     const handleLogout = async () => {
//         try {
//             await axios.post(
//                 BASE_URL + "/logout",
//                 {},
//                 { withCredentials: true }
//             );
//             setToggle(false);  // close dropdown
//             navigate("/login");  // redirect to login page
//         } catch (err) {
//             console.error(err);
//         }
//     }

//     return (
//         <div className="navbar">
//             <div className="flex-1">
//                 <Link to="/" className="brand">DevTinder</Link>
//             </div>
//             <div className="flex gap-2">
//                 <div className="dropdown">
//                     {user && (
//                         <div className="avatar-btn" role="button">
//                          <p>Welcome, {user.firstName}</p>
                           
                            
//                             <img
//                                 onClick={makeToggleFeatures}
//                                 alt="Avatar"
//                                 src={user.photoUrl}
//                             />
//                         </div>
//                     )}

//                     {toggle && (
//                         <ul className={`menu dropdown-content ${toggle ? "show" : ""}`}>
//                             <li><Link to="/profile">Edit Profile <span className="badge">New</span></Link></li>
//                             <li><Link to="/connections">Connections</Link></li>
//                             <li><Link to="/requests">Connection Requests</Link></li>
//                             <li><a onClick={handleLogout}>Logout</a></li>
//                         </ul>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Navbar;
