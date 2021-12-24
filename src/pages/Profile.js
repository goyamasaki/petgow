import React from 'react';
import { Link } from "react-router-dom";
// import Feed from "./Components/Feed";
import {  auth } from "../firebase";
// import AddInput2 from './AddInput2';
import AddInput3 from './AddInput3';



console.log(auth.currentUser);

const Profile = () => {
    return (
        <div>
            <Link to="/home">Home</Link>　
            <Link to="/AddInput2">投稿</Link>
            
<AddInput3/>


        {/* <BrowserRouter>
        <Feed />
       </BrowserRouter> */}
       
        </div>

       
    )
}



export default Profile
