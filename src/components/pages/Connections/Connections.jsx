import "./Connections.css";


import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../../utils/connectionSlice";
import { Link } from "react-router-dom";
import { axiosInstance } from "../../../api";

const Connections = () => {

    const dispatch = useDispatch();
    const connections = useSelector((store) => store.connections);

    const fetchConnections = async () => {

        try{
            const res = await axiosInstance.get(
               "/user/connections", 
                {withCredentials: true},
            )
            
            dispatch(addConnections(res.data.data));
        }
        catch(err){
            console.error(err);
        }
    }

    useEffect(() => {
        fetchConnections();
    }, [])

    if(!connections){
        return ;
    }

    if(connections.length === 0){
        return <h1 style={{ textAlign: "center", marginTop: "15px", color: "white"}}>No Connections Found!!</h1>;
         
    }

    return (
        <div className="connections-container">
            <h1>Connections</h1>
        
            <div className="conn-card">
                {connections.map((connection) => {
                    if (!connection) return null; 
                    const {firstName, lastName, about, _id, gender, age, photoUrl} = connection;
                    return (
                        <div className="user-info" key={_id}>
                            <div className="connection-card">
                                <img alt="photo" src={photoUrl} className="img" /> 
                                <h2 className="about">{firstName +" "+lastName}</h2>
                                <p className="about">{gender+" , "+age}</p>
                                <p className="about">{about || ""}</p>
                                <Link to={"/chat/" + _id}><button className="chat-btn">Chat</button></Link>
                            </div>
                             
                        </div>
                    );

                })}
            </div>
        </div>
    );
};

export default Connections;