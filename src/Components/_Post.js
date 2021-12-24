import React, { useState, useEffect } from 'react'
import {collection,query, onSnapshot, addDoc} from 'firebase/firestore'
import { db, auth } from "../firebase";
import Item from './Item';
import "../index.css";


export const Post = () => {
    const [data, setData] = useState([
        { id: "", title: "", naiyou: "", point: "", email: "", keiro:"", place:""},]);
    
    const [titleValue, setTitleValue] = useState(); 
         
    console.log(titleValue, "useStateの箱の方をみましょう！");
         
    useEffect(() => {
        
        const q = query(collection(db, "group"));
        const unsub = onSnapshot(q, (querySnapshot) => {
          setData(
            querySnapshot.docs.map((doc) => ({
              id: doc.id,
              title: doc.data().title,
              naiyou: doc.data().naiyou,
              point: doc.data().point,
              email: doc.data().email,
              keiro: doc.data().keiro,
              place: doc.data().place,
            }))
        );
        });
    
        return () => unsub();
      }, []);
         
     const newData = (e) => {
        setTitleValue(e.target.value);
      };
    
     const addData = async () => {
   
       await addDoc(collection(db, "group"), { title: titleValue });
         
        setTitleValue("");
      };
        
        return (
        <div>
        <h1>データ表示 <span>Fire</span>Base</h1>
        <p>テーブルの配色は特に意味はありません</p>
        <hr />

{data.map((item, index) => (
  <Item 
         key={index} id={item.id} 
         title={item.title} 
         naiyou={item.naiyou} 
         point={item.point} 
         email={item.email}
         keiro={item.keiro}
         place={item.place}
        />
))}



<hr />
<hr />

<h2>登録の処理</h2>

<p>{titleValue}</p>


<input type="text" value={titleValue} onChange={newData} />

<button onClick={addData}>登録</button>

<p>タイトルだけ登録できます（残りはfirebaseに直接入力）</p>

        </div>
    )
}
export default Post;


 
 