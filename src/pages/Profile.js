import React from 'react';
import { Link } from "react-router-dom";
// import Feed from "./Components/Feed";
import {  auth } from "../firebase";

console.log(auth.currentUser);

const Profile = () => {
    return (
        <div>
            <Link to="/home">Home</Link>　
            <Link to="/AddInput2">投稿</Link>
            <p>ここにプロフィールの入力画面を作る</p>
            ペットの名前
            犬種
            年齢
            性別

        {/* <BrowserRouter>
        <Feed />
       </BrowserRouter> */}
       
        </div>

       
    )
}

export default Profile
