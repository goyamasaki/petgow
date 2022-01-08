import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { auth } from "../firebase";
import {
  onAuthStateChanged,
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { useNavigate  } from 'react-router-dom';


const Register = (props) => {
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

   //Google認証
   const googleLogin  = () =>{
    const provider = new GoogleAuthProvider();

  const auth = getAuth();
  signInWithPopup(auth,provider)
  .then((result) =>{
    console.log(result,"vv");
    console.log("Googleアカウントでログインしました。");
  })
  .catch((error) =>{
    console.error(error);
    }); 
  };


 //ボタンを押したときの動作
 const hundleSubmit = (event)=>{
    // const {email,password} = event.target.element
    console.log(event,email,password)
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password).then((user)=>{
     console.log(user)
   });
  };
  return (
    <div>
         新規登録ページ<br></br>
        mail　
        <input
          type="text"
          value={email}
          name="email"
          onChange={(e) => setEmail(e.target.value)}
        /><br></br>
        password　
        <input
          type="text"
          value={password}
          name="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={hundleSubmit}
        >
          {isLogin ? "登録" : "登録"}
        </button><br></br>
     
        Googleログイン<br></br>
     <button onClick={googleLogin}>Googleアカウントで登録</button>
      <br></br>

      {/* <hr /> */}
      {/* <span onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? "新規登録" : "ログインに戻る"}
      </span>　 */}
      <br></br>
      <Link to="/home">Home</Link>　
      <Link to="/login">ログインページ</Link>
    </div>
    
  );
};


export default Register;