 
import './Card.css';

import { useDispatch } from 'react-redux';
import { removeUserFromFeed } from '../../utils/feedSlice';
import { axiosInstance } from '../../../api';



const Card = ({user}) => {

  if(!user){
    return <h1>Loading.....</h1>;
  }
  console.log(user);

  const {_id, firstName, lastName, age, about, photoUrl, gender, skills} = user;

  const dispatch = useDispatch();

  const handleSendRequest = async (status, userId) => {
    
    try{
      await axiosInstance.post("/request/send/"+status+"/"+userId, 
        {},
        {withCredentials: true},
      ) 
      dispatch(removeUserFromFeed(userId));
    }
    catch(err){
      console.error(err);
    }
  };

  

  return (
    <div className="card-container">
      <figure>
        <img
          src={photoUrl || "/default-avatar.png"}
          alt="photo"
        />
      </figure>
      <div className="card-body">
        <h1 className="card-title fix">{firstName+" "+lastName}</h1>
        {(age || gender) && (<p>{age ? `${age} Years` : ""}{age && gender ? ", " : ""}{gender || ""}</p>)}
 
        <p className='fix'>{about || ""}</p>
        <p className='skills'>{Array.isArray(skills) ? skills.join(", ") : skills || ""}</p>

        <div className="card-actions">
          <button 
            onClick={() => handleSendRequest("ignored", _id)}
            className="buy-btn">
            Ignore
          </button>

          <button 
            onClick={() => handleSendRequest("interested", _id)}
            className="buy-btn primary">
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
