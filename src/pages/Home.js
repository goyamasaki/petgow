import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
     <Link to="/Login">ログイン</Link>　
     <Link to="/Register">新規登録</Link>　
     <Link to="/AddInput2">投稿</Link>　
     <Link to="/Profile">プロフィール</Link>　
     <Link to="/Search">検索</Link>
    </div>
  );
};

export default Home;