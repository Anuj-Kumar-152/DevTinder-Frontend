import { useEffect } from 'react'
import "./Home.css"
import Navbar from '../Navbar/Navbar';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Footer from '../Footer/Footer';
import axios from 'axios';
import { BASE_URL } from '../../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../../utils/userSlice';
import { axiosInstance } from '../../../api';

const Home = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user);
  const location = useLocation();

    // Define routes where you DON'T want the footer
    const noFooterRoutes = ["/chat", "/login", "/signup", "/aboutUs", "/contactUs"];

    const hideFooter = noFooterRoutes.some((path) =>
      location.pathname.startsWith(path)
    );


  const fetchUser = async () => {

    if (userData) {
      return;
    }
 

    try {
      const res = await axiosInstance.get( "/profile/view", {
        withCredentials: true,
      })

      dispatch(addUser(res.data));
    }
    catch (err) {
      if (err.status === 401) {
        navigate("/login");
      }
      console.error(err);
    }
  }

  useEffect(() => {
    fetchUser();
  }, [])


  return (

    <div className='home-container'>
      <Navbar />
      <div className='fix-bug'>
        <Outlet />
      </div>
      {!hideFooter && <Footer />}
    </div>


  )
};

export default Home;
