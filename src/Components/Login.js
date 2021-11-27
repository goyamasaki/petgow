import React, { useState, useEffect } from "react";

import { auth } from "../firebase";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

const Login = (props) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    //Firebase ver9 compliant (modular)
    const unSub = onAuthStateChanged(auth, (user) => {
      console.log(user, "user情報");
      user && props.history.push("/");
    });
    return () => unSub();
  }, [props.history]);

  return (
    <div>
      <h1>{isLogin ? "ログイン" : "登録"}</h1>
      <hr />
      <input
        type="text"
        value={email}
        name="email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="text"
        value={password}
        name="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        onClick={
          isLogin
            ? async () => {
                try {
                  //Firebase ver9 compliant (modular)
                  await signInWithEmailAndPassword(auth, email, password);
                  props.history.push("/");
                } catch (error) {
                  alert(error.message);
                }
              }
            : async () => {
                try {
                  //Firebase ver9 compliant (modular)
                  await createUserWithEmailAndPassword(auth, email, password);
                  props.history.push("/");
                } catch (error) {
                  alert(error.message);
                }
              }
        }
      >
        {isLogin ? "ログイン" : "登録"}
      </button>
      <hr />
      <span onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? "新規登録" : "ログインに戻る"}
      </span>
    </div>
  );
};

export default Login;