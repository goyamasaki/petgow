import React, { useState } from "react";
import { storage, db } from "../firebase";
//Firebase ver9 compliant
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { Link } from "react-router-dom";

{/* <div><Route></Route></div> */}
// アドインプット２は投稿ページ用
  
const AddInput2 = () => { 
  // useStateを準備　画像を保持する、入力された文字を保持する
  const [textValue, setTextValue] = useState();
  const [basyoValue, setBasyoValue] = useState();
  const [keiroValue, setKeiroValue] = useState();
  const [image, setImage] = useState(null);

  const onChangeImageHandler = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
      e.target.value = "";
    }
  };
//後で中身を記述
const sendClick = (e) => {
    e.preventDefault();
   
   
   
    if (image) {
 // 画像 + テキストの処理
      // firebaseの仕様で同じファイル名の画像を複数回アップしてしまうと元のファイルが削除される
      // そのためにファイル名をランダムに作成する必要があるので「jsのテクニック」でランダムな文字列を作成
      const S =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"; //ランダムな文字列を作るための候補62文字
      const N = 16;
      const randomChar = Array.from(crypto.getRandomValues(new Uint32Array(N))) //乱数を生成してくれるもので0からランダムな数字が16個選ばれる
        .map((n) => S[n % S.length])
        .join("");
      const fileName = randomChar + "_" + image.name;
      //Firebase ver9 compliant (firebase strageに登録している箇所↓)
      const uploadImage = uploadBytesResumable(
        ref(storage, `images/${fileName}`),
        image
      );
 //Firebase ver9 compliant
 uploadImage.on(
    "state_changed",

    () => {},
    (err) => {
      alert(err.message);
    },
    async () => {
      //Firebase ver9 compliant
      await getDownloadURL(ref(storage, `images/${fileName}`)).then(
        async (url) => {
          addDoc(collection(db, "posts"), {
            image: url,
            text: textValue,
            basyo: basyoValue,
            keiro: keiroValue,
            timestamp: serverTimestamp(),
          });
        }
      );
    }
  );

      //後で記述
    } else {
      //Firebase ver9 compliant
      addDoc(collection(db, "posts"), {
        image: "",
        text: textValue,
        basyo: basyoValue,
        keiro: keiroValue,
        timestamp: serverTimestamp(),
      });
    }
    // useStateを空にする=入力欄を空白にする処理
    setImage(null);
    setTextValue("");
    setBasyoValue("");
    setKeiroValue("");           
  };



    return (
        <div>
        
      {/* 登録の処理 */}
      {/* 記述1. formタグを記述 */}
      投稿ページ　　
      <Link to="/home">Home</Link>
      
      <form onSubmit={sendClick}>
      
        {/* 記述2.文字登録のinputを用意する */}
        
        <input
          placeholder="テキストを入力"
          type="text"
          value={textValue}
          onChange={(e) => setTextValue(e.target.value)}
        />
        <br></br>
        <br></br>
        
        <input
          placeholder="場所を入力"
          type="basyo"
          value={basyoValue}
          onChange={(e) => setBasyoValue(e.target.value)}
        />
        <br></br>
        <br></br>

        
        <input
          placeholder="毛色を入力"
          type="keiro"
          value={keiroValue}
          onChange={(e) => setKeiroValue(e.target.value)}
        />
       

        {/* 記述3.画像登録のinputを用意する */}
        <br></br>
        <br></br>
        <input type="file" onChange={onChangeImageHandler} />

        

        <button
          type="submit"
          disabled={!textValue} //textValueが空の時は送信できない
        >
          送信する
        </button>
        {/* <hr /> */}
      </form>
      
      
    </div>
    

    
    )
}
 

export default AddInput2