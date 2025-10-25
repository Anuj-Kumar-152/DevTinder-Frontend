import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { BASE_URL } from '../../utils/constants';
import { addFeed } from '../../utils/feedSlice';
import Card from '../Card/Card';

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const getFeed = async () => {
    if(feed && feed.length > 0) return; // already loaded
    try {
      const res = await axios.get(BASE_URL + "/feed", {withCredentials: true});
      dispatch(addFeed(res.data)); // make sure res.data is array
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    getFeed();
  }, []); // mount only

  if(!feed) {
    return <p>Loading...</p>; // better than return;
  }

  if(feed.length === 0){
    return <h1 style={{textAlign: 'center', marginTop: "15px", color: "white"}}>No New Users Found!!</h1>
  }

  return (
    <div>
      {feed && 
      <Card user={feed[0]}/>}
     </div>
    )
};

export default Feed;












// import axios from 'axios';
// import React, { useEffect } from 'react'
// import { useDispatch, useSelector } from 'react-redux';
// import { BASE_URL } from '../../utils/constants';
// import { addFeed } from '../../utils/feedSlice';
// import Card from '../Card/Card';

// const Feed = () => {

//   const feed = useSelector((store) => store.feed);

//   const dispatch = useDispatch();

//   const getFeed = async () => {
//     if(feed && feed.length > 0){
//       return ;
//     }
//     try{
//       const res = await axios.get(BASE_URL+"/feed", {withCredentials: true});
      
//       dispatch(addFeed(res.data));
//     }
//     catch (err){
//       console.error(err);
//     }
//   }

//   useEffect(() => {
//     getFeed();
//   }, [])

//   if(!feed){
//     return ;
//   }

//   if(feed.length === 0){
//     return <h1 style={{textAlign: 'center'}}>No New Users Found!!</h1>
//   }

//   return (
//     <div>
//       {feed && 
//       <Card user={feed[2]}/>}
//     </div>
    

//   )
// }

// export default Feed;