import { NavLink } from "react-router-dom";
import React, { useState } from "react";
import "../../../shared/styles/css/auth.css";
// import { signup } from "../../../features/userSlice";
import { signup } from "../../../shared/Redux/Reducers/userSlice";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { SignupService, toastMessage } from "../../../shared";
import {useHistory} from 'react-router-dom'
import Loader from "../../../shared/loader/loader";
const Signup = () => {
  const { t, i18n } = useTranslation();
  const history =  useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setcPassword] = useState("");
  const [check,setCheck] = useState(false);
  const [loader,setLoader] = useState(false)
  const dispatch = useDispatch();


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      email:email,
      password:password,
      password_confirmation:cpassword
    });
    setLoader(true)
    SignupService({
      email:email,
      password:password,
      password_confirmation:cpassword
    }).then(({data:{data}})=>{
      setLoader(false)
      setEmail("");
    setPassword("");
    setcPassword("")
      console.log(data);
      dispatch(signup(data));
      history.push("/otp")
    }).catch((err)=>{
      setLoader(false)
      toastMessage(err?.response?.data?.message)
    })
   

   
  };

  return (
    <div className="mains">
      <h1 className="heading">{t("create-account")}</h1>
      <p className="paragraph">{t("info")}</p>

      <div className="container auth-container">
        <form className="signin-form" onSubmit={(e) => handleSubmit(e)}>
          <label>Email</label>
          <input
          value={email}
            className="signin-input"
            type="email"
            placeholder="catherine.shaw@gmail.com"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>{t("password")}</label>
          <input
          value={password}
            className="signin-input"
            type="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />

          <label>{t("confirm-password")}</label>
          <input className="signin-input" value={cpassword} type="password" onChange={(e)=> setcPassword(e.target.value)} required />

          <label className="forget-pwd">
            <input
              type="checkbox"
              required
              value={check}
              onChange={(e) => setCheck(!check)}
            />{" "}
            {t("terms")}
          </label>
          <button className="btn btn-auth">{t("signup")}</button>

          <p className="paragraph">
            {t("already-account")} &nbsp;
            <NavLink className="links" to="/signin">
              {t("login")}
            </NavLink>
          </p>
        </form>
      </div>
      {
        loader &&    <Loader />
      }
   
    </div>
  );
};

export default Signup;
