import axios from "axios";
import "./Premium.css";
import { BASE_URL } from '../../utils/constants';
import { useNavigate } from "react-router-dom";


const Premium = () => {

    const navigate = useNavigate();

    const handleBuyClick = async (type) => {
        

        try {
            const order = await axios.post(BASE_URL + "/payment/create",
                {
                    membershipType: type,
                },
                {
                    withCredentials: true
                }
            );

            // it should razorpay dailog box
            const { amount, keyId, currency, notes, orderId, firstName, lastName } = order.data;

            const options = {
                key: keyId,
                amount,
                currency,
                name: "Dev Tinder",
                description: "Connect to other developers",
                order_id: orderId,
                prefill: {
                    name: notes.firstName + " " + notes.lastName,
                    email: notes.emailId,
                    contact: "7707069554",
                },
                theme: {
                    color: "#F37254"
                },
            };

            const rzp = new window.Razorpay(options);
             
            rzp.open();
            navigate("/payment-success", { state: { membership: type } });
        }
        catch (err) {
            console.error(err);
        }
    }


    return (
        <div className="parent-div">

            <div className="card">
                <div className="card-body">
                    <span className="badge"> Popular</span>

                    <div className="card-header">
                        <h2 className="card-title">Silver Premium</h2>
                        <span className="card-price">₹49.00/mo</span>
                    </div>

                    <ul className="features-list">

                        <li>
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                            <span>Unlimited Profile Swipes</span>
                        </li>
                        <li>
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                            <span>Profile Boost Once per Week</span>
                        </li>
                        <li>
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                            <span>Limited Chat History</span>
                        </li>
                        <li>
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                            <span>50 Connection Requets per Day</span>
                        </li>
                        <li>
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                            <span>Voice Call</span>
                        </li>

                        <li className="disabled">
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="line-through">Video call</span>
                        </li>
                        <li className="disabled">
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="line-through">See Who Viewed Your Profile</span>
                        </li>
                    </ul>

                    <div className="card-footer">
                        <button className="btn" onClick={() => handleBuyClick("silver")}>Buy Silver Membership</button>
                    </div>
                </div>
            </div>


            <div className="card">
                <div className="card-body">
                    <span className="badge">Most Popular</span>

                    <div className="card-header">
                        <h2 className="card-title1">Gold Premium</h2>
                        <span className="card-price">₹99.00/mo</span>
                    </div>

                    <ul className="features-list">
                        <li>
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                            <span>Unlimited Profile swipes</span>
                        </li>
                        <li>
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                            <span>Profile Boost Every Day</span>
                        </li>
                        <li>
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                            <span>Unlimited Chat History</span>
                        </li>
                        <li>
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                            <span>500 Connection Requets per Day</span>
                        </li>

                        <li>
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                            <span>Voice Call</span>
                        </li>
                        <li>
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                            <span>Video Call</span>
                        </li>
                        <li>
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                            <span>See Who Viewed Your Profile</span>
                        </li>

                    </ul>

                    <div className="card-footer">
                        <button className="btn" onClick={() => handleBuyClick("gold")}>Buy Gold Membership</button>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Premium;