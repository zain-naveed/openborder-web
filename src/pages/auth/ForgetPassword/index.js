import { NavLink } from "react-router-dom";
import React,{useState} from "react";
import "../../../shared/styles/css/auth.css";
import { useTranslation } from "react-i18next";
import {useLocation,useHistory} from 'react-router-dom'
import Loader from "../../../shared/loader/loader";
import { recoverPasswordService, toastMessage } from "../../../shared";
const Forget = () => {
  const { t, i18n } = useTranslation();
  const [password,setPassword] = useState("");
  const [cpassword,setCpassword] = useState("");
  const [loader,setLoader] = useState(false);
  const history = useHistory();
const location = useLocation();
const changePassword  = (e)=>{
    e.preventDefault()
  
  if(password && cpassword ){
    let obj = {
      email:location?.mail,
      password:password,
      password_confirmation:cpassword
    };
    setLoader(true)
    recoverPasswordService(obj).then(({data})=>{
      setLoader(false)
      history.push("/signin")
      console.log(data);
    }).catch((err)=>{
      setLoader(false)
    })
  }else{
    
    toastMessage(`${!password && cpassword ? 'Password': password &&  !cpassword ? "Confirm Password":"Password & Confirm Password"} is required Field`,'error')
  }
  
}
  return (
    <div className="mains">
      <h1 className="heading">{t('reset')}</h1>
      <p className="otp-email">{location?.mail ? location?.mail:""}</p>

      <div className="container auth-container">
        <form className="signin-form" onSubmit={changePassword}>
          <label>{t('new-password')}</label>
          <input className="signin-input" value={password} type="password" onChange={(e)=>setPassword(e.target.value)}  />

          <label>{t('confirm-new-password')}</label>
          <input className="signin-input" value={cpassword} type="password" onChange={(e)=>setCpassword(e.target.value)}  />

          <button className="btn btn-auth">{t('proceed')}</button>
        </form>
      </div>
      {
        loader && <Loader />
      }
      
    </div>
  );
};

export default Forget;
