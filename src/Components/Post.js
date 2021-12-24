import React, { useState } from "react";
import "../App.css";
import { db } from "../firebase";
import {
  doc,
  collection,
  setDoc,
  deleteDoc,
  serverTimestamp,
} from "firebase/firestore";

const Post = ({ id, text, image, basyo, keiro, timestamp }) => {
  // 更新用のstate
  const [title, setTitle] = useState(text);

  //ポイント！(db, 'posts') ここがコレクション（箱）のことなので間違えないように！
  const textRef = collection(db, "posts");

  const editTask = async () => {
    await setDoc(
      doc(textRef, id),
      {
        text: title,
        timestamp: serverTimestamp(),
      },
      { merge: true }
    );
  };

  const deleteTask = async () => {
    await deleteDoc(doc(textRef, id));
  };
  //↓これを使ってfirebaseに登録されているデータを確認している
  console.log(id, "props の id");

  return (
    <div className="post">
      {/* 記述1. テキスト(text)情報を受け取る */}
      <div className="text">{text}</div>
      <div className="keiro">{keiro}</div>
      <div className="basyo">{basyo}</div>

      {image && (
        <div className="image">
          <img src={image} alt={text} />
        </div>
      )}
      {/* 記述3. 日付(timestamp)情報を受け取る */}
      {/* 注意！firebaseのtimestampはjsの形式に変換する必要があるのでnew Dateを使用している */}
      <div className="date">
        {new Date(timestamp?.toDate()).toLocaleString()}
      </div>

      
      {/* 更新用のinput */}
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      {/* 編集、削除のボタンを設置 */}
      <button onClick={editTask}>編集</button>
      <button onClick={deleteTask}>削除</button>
      <hr />
    </div>
  );
};

export default Post;