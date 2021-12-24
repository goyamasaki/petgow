import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { auth } from "../firebase";
import {
  onAuthStateChanged,
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useNavigate  } from 'react-router-dom';


const Login = (props) => {
  // 各状態を管理
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate  = useNavigate();

  useEffect(() => {
    //Firebase ver9 compliant (modular)
    const unSub = onAuthStateChanged(auth, (user) => {
      console.log(user, "user情報");
      if(user){
        setIsLogin(true)
        user && navigate("/");
      }
      
    });
    return () => unSub();
  }, [props.history]);


  //ボタンを押したときの動作
  const hundleSubmit = (event)=>{
    // const {email,password} = event.target.element
    console.log(event,email,password)
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password).then((user)=>{
      console.log(user)
  });

  }

  return (
    <div>
      <h1>{isLogin ? "ログイン" : "登録"}</h1>
      <hr />
      

     
        メール
        <input
          type="text"
          value={email}
          name="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        パスワード
        <input
          type="text"
          value={password}
          name="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={hundleSubmit}
        >
          {isLogin ? "ログイン" : "登録"}
        </button>
     
      <hr />
      <span onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? "新規登録" : "ログインに戻る"}
      </span>　
      
      <Link to="/home">Home</Link>
    </div>

    
  );
};

export default Login;