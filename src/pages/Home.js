import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      公式SNS　Instagram　Twitter　
      <Link to="/policy">プライバシーポリシー</Link>　
     <Link to="/about">会社概要</Link>
    </div>
  );
};

export default Home;