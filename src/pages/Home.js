import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
     {/* <Link to="/policy">プライバシーポリシー</Link>　 */}
     <Link to="/login">ログイン</Link>　
     <Link to="/AddInput2">投稿</Link>　
     <Link to="/Profile">プロフィール</Link>　
     <Link to="/Search">検索</Link>
    </div>
  );
};

export default Home;