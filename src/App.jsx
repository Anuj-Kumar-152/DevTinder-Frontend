 
import { BrowserRouter, Route, Routes } from "react-router-dom" 
import Home from "./components/pages/Home/Home";
import Login from "./components/pages/Login/Login";
import { Provider } from "react-redux";
import appStore from "./components/utils/appStore";
import Feed from "./components/pages/Feed/Feed";
import Profile from "./components/pages/Profile/Profile";
import Connections from "./components/pages/Connections/Connections";
import Requests from "./components/pages/Requests/Requests";
import Signup from "./components/pages/Signup/Signup";
import Chat from "./components/pages/Chat/Chat";
import Premium from "./components/pages/Premium/Premium";
import AboutUs from "./components/pages/AboutUs/AboutUs";
import ContactUs from "./components/pages/ContactUs/ContactUs";
import PaymentSuccess from "./components/pages/PaymentSuccess/PaymentSuccess";

  
function App() { 
	return (
    	<>  
			<Provider store={appStore}>
				<BrowserRouter basename="/">
					<Routes>
						<Route path="/login" element={<Login />}/> 
						<Route path="/signup" element={<Signup />}/> 
						<Route path="/" element={<Home />}>
							<Route path="/" element={<Feed />}/> 
							<Route path="/profile" element={<Profile />}/>
							<Route path="/connections" element={<Connections />}/>
							<Route path="/requests" element={<Requests />}/> 
							<Route path="/chat/:targetUserId" element={<Chat />}/> 
							<Route path="/premium" element={<Premium />}/> 
							<Route path="/aboutUs" element={<AboutUs />}/> 
							<Route path="/contactUs" element={<ContactUs />}/> 
							<Route path="/payment-success" element={<PaymentSuccess />}/> 
						</Route>
						
					</Routes>
				</BrowserRouter> 
			</Provider>
    	</>
	)
}

export default App;
