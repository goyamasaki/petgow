import React, { useState, useEffect } from "react";
import { db, auth } from "../firebase";
import { BrowserRouter, useNavigate } from "react-router-dom";
//Firebase ver9 compliant
import { collection, query, onSnapshot, orderBy } from "firebase/firestore";
import Post from "./Post";
import AddInput from "./AddInput";
//Firebase ver9 compliant (modular)
import { onAuthStateChanged, signOut } from "firebase/auth";
import { Link } from "react-router-dom";

const Feed = (props) => {
  // firebaseに作成した項目を受け取るための変数 = useState
  // 記述1. useStateを準備する
  const navigate = useNavigate();


  const [posts, setPosts] = useState([
    {
      id: "",
      image: "",
      text: "",
      basyo:"",//追加
      keiro:"",
      timestamp: null,
    },
  ]);

  // useEffect(() => {
    //Firebase ver9 compliant (modular)
  //   const unSub = onAuthStateChanged(auth, (user) => {
  //     console.log(user, "user情報", navigate);
  //     !user && navigate("login");
  //   });
  //   return () => unSub();
  // });

  // 記述2.useEffectを使ってデータを取得する
  useEffect(() => {
    //Firebase ver9 compliant (modular)
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
    return () => {
      unSub();
    };
  }, []);

  console.log(posts, "useStateの中身"); //データの流れを確認しましょう！

  return (
    <div>
      <button
        onClick={async () => {
          try {
            await signOut(auth);
            props.history.push("login");
          } catch (error) {
            alert(error.message);
          }
        }}
      >
        ログアウト
      </button>
      
     

      <hr />
      {/* 記述4. AddInputを読み込む */}
      {/* <AddInput /> */}

      {/* 記述3.Postコンポーネントにデータを流し込む */}
      {/* && は存在するときのみ実行されるという書き方 */}
      {posts &&
        posts.map((item) => (
          <Post
            id={item.id} //このIDがポイント
            key={item.id}
            image={item.image}
            text={item.text}
            basyo={item.basyo}//追加
            keiro={item.keiro}//追加
            timestamp={item.timestamp}
          />
        ))}
    </div>
  );
};

export default Feed;