import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { db, auth } from "../firebase";

import Feed from "../Components/Feed";
import { collection, query, onSnapshot, orderBy } from "firebase/firestore";
import SearchBar from "../Components/SearchBar";

// import { BrowserRouter, Routes, Route } from "react-router-dom";

const Search = () => {
  const [posts, setPosts] = useState([
    {
      id: "",
      image: "",
      text: "",
      timestamp: null,
    },
  ]);

  const getFeedByCondition = (e) => {
    // const q = query("text");
    const q = query(collection(db, "posts"), orderBy("timestamp", "desc"));

    const unSub = onSnapshot(q, (snapshot) => {
      setPosts(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          image: doc.data().image,
          text: doc.data().text,
          basyo:doc.data().basyo,
          keiro:doc.data().keiro,
          timestamp: doc.data().timestamp,
        }))
      );
    });
  };

  const onSerchSubmit = (event)=> {

    console.log(event.target.dataset.value,"検索条件として入力されたやつ");
  
    const q = query(collection(db, "posts"), orderBy("timestamp", "desc"));
    const unSub = onSnapshot(q, (snapshot) => {
      setPosts(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          image: doc.data().image,
          text: doc.data().text,
          basyo: doc.data().basyo,//追加
          keiro: doc.data().keiro,//追加
          timestamp: doc.data().timestamp,
        }))
      );
    });
  
  }

  return (
    <div>

      <Link to="/home">Home</Link>　
      <Link to="/addinput2">投稿ページ</Link>            
      <div><SearchBar onSerchSubmit={onSerchSubmit} /></div>
      {/* <button onClick={getFeedByCondition}>検索</button> */}

      <Feed posts={posts} />
    </div>
  );
};

export default Search

