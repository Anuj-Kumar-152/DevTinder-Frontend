import { useEffect, useState } from 'react'
import "./EditProfile.css";
import Card from '../Card/Card';
import { useDispatch } from 'react-redux';
import { addUser } from '../../utils/userSlice';
import { axiosInstance } from '../../../api';

const EditProfile = ({user}) => {

    if(!user){
        return <></>;
    }

    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [age, setAge] = useState(user.age || 18);
    const [about, setAbout] = useState(user.about);
    const [skills, setSkills] = useState(user.skills); 
    const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
    const [showToast, setShowToast] = useState(false);
    const dispatch = useDispatch();
	 
	const saveProfile = async () => {
        try{
             

            const res = await axiosInstance.patch("/profile/edit",
                {firstName, lastName, age, about, skills, photoUrl},
                {withCredentials: true},
            );
            dispatch(addUser(res?.data?.data));

            setShowToast(true);
            setTimeout(() => setShowToast(false), 3000);
        }
        catch(err){
            console.error(err);
        }
    }

    



    return (
        <div className='profile'>
            <div className='card-toast'>
            
                {showToast && <div className="toast-container">
                    <div className="toast toast-top toast-end">
                        <div className="alert alert-success">
                            <span>Profile Updated Successfully.</span>
                        </div>
                    </div>
                </div>}
                <div>
                    {user && <Card user={user}/>}
                </div>
            </div>
            <div className='profile-form'>
                <div><h2>Edit Profile</h2></div>
                <form>
                    
                    <label htmlFor='firstName' >First Name: </label>
                    <input type='text' id="firstName" placeholder='Edit First Name..' 
                        value={firstName} 
                        onChange={(e) => setFirstName(e.target.value)}
                    />

                    <label htmlFor='lastName' >Last Name: </label>
                    <input type='text' id="lastName" placeholder='Edit Last Name..' 
                        value={lastName} 
                        onChange={(e) => setLastName(e.target.value)}
                    />

                    <label htmlFor='age' >Age: </label>
                    <input type='number' id="age" placeholder='Edit Age..' 
                        value={age} 
                        onChange={(e) => setAge(e.target.value)}
                    />

                    <label htmlFor='about' >About: </label>
                    <input type='text' id="about" placeholder='Edit About..' 
                        value={about} 
                        onChange={(e) => setAbout(e.target.value)}
                    />

                    <label htmlFor='skills' >Skills: </label>
                    <input type='text' id="skills" placeholder='Edit Skills..' 
                        value={skills} 
                        onChange={(e) => setSkills(e.target.value)}
                    />

                    <label htmlFor='photoUrl' >Photo Url: </label>
                    <input type='text' id="photoUrl" placeholder='Edit photoUrl..' 
                        value={photoUrl} 
                        onChange={(e) => setPhotoUrl(e.target.value)}
                    />

                    <button type="button" onClick={saveProfile}>Save Profile</button>

                </form>
            </div> 
            
        </div>
    );
};

export default EditProfile;