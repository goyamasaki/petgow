import React from 'react';
import { Link } from "react-router-dom";
import {  auth } from "../firebase";
import AddInput3 from './AddInput3';

console.log(auth.currentUser);

const Profile = () => {
    return (
        <div>
            <Link to="/home">Home</Link>　
            <Link to="/AddInput2">投稿</Link>
            
             <AddInput3/>
        </div>

    )
}

export default Profile
