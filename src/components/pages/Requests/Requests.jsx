import axios from "axios";
import "./Requests.css";
import { BASE_URL } from "../../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../../utils/requestSlice";
import { axiosInstance } from "../../../api";

const Requests = () => {

    const dispatch = useDispatch();
    const requests = useSelector((store) => store.requests);

    const reviewRequest = async (status, _id) => {
        try{
            await axiosInstance.post(
                "/request/review/"+status+"/"+_id,
                {},
                {withCredentials: true},
            );
            dispatch(removeRequest(_id));
        }
        catch(err) {
            console.error(err);
        }
    }

    const fetchRequests = async () => {

        try{
            const res = await axiosInstance.get(
                BASE_URL+"/user/requests/received",
                {withCredentials: true},
            )
            
            dispatch(addRequests(res.data.data));
        }
        catch(err){
            console.error(err);
        }
    }

    useEffect(()=> {
        fetchRequests();
    }, [])

    if(!requests){
        return ;
    }

    if(requests.length === 0){
        return <h1 
            style={{ textAlign: "center", marginTop: "15px", color: "white"}}>
                No Requests Found!!
            </h1>;
    }

    return (
        <div className="requests-container">
            <h1>Requests</h1>
        
            <div className="req-card">
                {requests.map((request) => {
                    const {_id, firstName, lastName, about, skills, gender, age, photoUrl} = request.fromUserId;
                    return (
                        <div className="request-card" key={_id}>
                            <img alt="photo" src={photoUrl} className="img" /> 
                            <h2 className="abt">{firstName+" "+lastName}</h2>
                            <p>{gender+" , "+age+" Years"}</p>
                            <p className="abt">{about || ""}</p>
                            <div className="card-action">
                                <button 
                                    onClick={() => reviewRequest("rejected", request._id)}
                                    className="buy-btn Primary">
                                    Reject
                                </button>

                                <button 
                                    onClick={() => reviewRequest("accepted", request._id)}
                                    className="buy-button">
                                    Accept
                                </button> 
                            </div>
                        </div> 
                    );

                })}
            </div>
        </div>
    );
};

export default Requests;