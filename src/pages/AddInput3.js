import React, { useState } from "react";
import { storage, db } from "../firebase";
//Firebase ver9 compliant
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { Link } from "react-router-dom";

{/* アドインプット３はプロフィール用としてデータはgroupに入れる*/}
  
const AddInput3 = () => { 
  // useStateを準備　画像を保持する、入力された文字を保持する
  const [nameValue, setNameValue] = useState();
  const [basyoValue, setBasyoValue] = useState();
  const [sexValue, setSexValue] = useState();
  const [typeValue, setTypeValue] = useState();
  const [ageValue, setAgeValue] = useState();
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
          addDoc(collection(db, "group"), {
            image: url,
            name: nameValue,
            basyo: basyoValue,
            sex: sexValue,
            age: ageValue,
            type: typeValue,
            timestamp: serverTimestamp(),
          });
        }
      );
    }
  );

      //後で記述
    } else {
      //Firebase ver9 compliant
      addDoc(collection(db, "group"), {
        image: "",
        name: nameValue,
        basyo: basyoValue,
        sex: sexValue,
        age: ageValue,
        type: typeValue,
        timestamp: serverTimestamp(),
      });
    }
    // useStateを空にする=入力欄を空白にする処理
    setImage(null);
    setNameValue("");
    setBasyoValue("");
    setSexValue("");
    setAgeValue("");
    setTypeValue("");
    
  };



    return (
        <div>
        
      {/* 登録の処理 */}
      {/* 記述1. formタグを記述 */}
      プロフィールの登録
      
      
      <form onSubmit={sendClick}>
      
        {/* 記述2.文字登録のinputを用意する */}
        
        <input
        // 名前に変更（データは？？
          placeholder="ペットの名前"
          type="name"
          value={nameValue}
          onChange={(e) => setNameValue(e.target.value)}
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
          placeholder="性別"
          type="sex"
          value={sexValue}
          onChange={(e) => setSexValue(e.target.value)}
        />
        <br></br>
        <br></br>
        <input
          placeholder="年齢"
          type="age"
          value={ageValue}
          onChange={(e) => setAgeValue(e.target.value)}
        />
        <br></br>
        <br></br>
        <input
          placeholder="種類"
          type="type"
          value={typeValue}
          onChange={(e) => setTypeValue(e.target.value)}
        />
       

        {/* 記述3.画像登録のinputを用意する */}
        <br></br>
        <br></br>
        ペットの写真<br></br>
        <input type="file" onChange={onChangeImageHandler} />

        

        <button
          type="submit"
          disabled={!nameValue} //textValueが空の時は送信できない
        >
          送信する
        </button>
        {/* <hr /> */}
      </form>
      
      
    </div>
    

    
    )
}
 

export default AddInput3