import { NavLink } from "react-router-dom";
import React, { useState } from "react";
import "../../../shared/styles/css/main.css";
import "../../../shared/styles/css/auth.css";
// import { login } from "../../../features/userSlice";
import { login } from "../../../shared/Redux/Reducers/userSlice";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { LoginService, toastMessage } from "../../../shared";
import { useHistory } from "react-router-dom";
import ModalForgotPassword from "../../../shared/component/Modals/ModalForgotPassword";
import "../../../shared/styles/css/modal.css";
import Loader from "../../../shared/loader/loader";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [loader, setLoader] = useState(false);
  const history = useHistory();
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoader(true);
    LoginService({
      email: email,
      password: password,
    })
      .then(({ data: { data } }) => {
        setEmail("");
        setPassword("");
        setLoader(false);
        let verifyEmail = data?.user?.email_verified_at;
        dispatch(login(data));
        if (!verifyEmail) {
          history.push("/otp");
        } else {
          history.push("/home");
        }
        console.log(data);
      })
      .catch((err) => {
        setLoader(false);
        toastMessage(err?.response?.data?.message, "error");
      });
  };

  const { t, i18n } = useTranslation();
  return (
    <div className="mains">
      <h1 className="heading">{t("greeting")}</h1>
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
          <ModalForgotPassword />
          <button className="btn btn-auth">{t("login")}</button>
          <p className="paragraph">
            {t("not-have-a-account")} &nbsp;
            <NavLink className="links" to="/signup">
              {t("signup")}
            </NavLink>
          </p>
        </form>
      </div>
      {loader && <Loader />}
    </div>
  );
};

export default SignIn;
