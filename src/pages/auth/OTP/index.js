import React, { useState } from "react";
import "../../../shared/styles/css/main.css";
import "../../../shared/styles/css/auth.css";
// import { otp } from "../../../features/otpSlice";
import { otp } from "../../../shared/Redux/Reducers/otpSlice";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import {
  sendOtpService,
  toastMessage,
  verifyOtpService,
} from "../../../shared";
import { login } from "../../../shared/Redux/Reducers/userSlice";

const Otp = () => {
  const history = useHistory();
  const [otpCode, setOtpCode] = useState({});

  const { user } = useSelector((state) => state.root);

  const { t, i18n } = useTranslation();

  console.log(user, "user");
  const dispatch = useDispatch();

  const handleFocus = (e, value) => {
    if (value[Object.keys(value)[0]]) {
      if (e.target.nextSibling) e.target.nextSibling.focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let code = "";
    let clone = { ...otpCode };
    Object.keys(clone).forEach((key) => {
      code += clone[key];
    });
    verifyOtpService({ email: user?.user?.email, code: code })
      .then(({ data: { data } }) => {
        console.log(data);
        history.push('/home');
        dispatch(login(data));
      })
      .catch((err) => {
        toastMessage(err?.response?.data?.message, "error");
      });

    // dispatch(
    //   otp({
    //     first: first,
    //     second: second,
    //     third: third,
    //     fourth: fourth,
    //   })
    // );

    // setFirst("");
    // setSecond("");
    // setthird("");
    // setFourth("");
  };
  const resendOtp = () => {
    sendOtpService({ email: user?.user?.email })
      .then(({ data }) => {
        console.log(data.message);
        toastMessage(data.message, "success");
      })
      .catch((err) => {
        toastMessage(err?.response?.data?.message, "error");
      });
  };

  const handleTarget = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    handleFocus(e, {
      [name]: value,
    });
    setOtpCode({
      ...otpCode,
      [name]: value,
    });
  };
  console.log(otpCode);
  return (
    <div className="mains">
      <div className="navigation">
        <div className="back" onClick={() => history.goBack()}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-chevron-left"
            viewBox="0 0 16 16"
            style={{ background: "transparent" }}
          >
            <path
              fill-rule="evenodd"
              d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
            />
          </svg>
        </div>
        <p className="navi-paragraph">{t("Navi-otp")}</p>
      </div>

      <p className="otp-paragraph">{t("otp-heading")}</p>
      <p className="otp-email">{user?.user?.email}</p>
      <div className="container auth-container">
        <p className="paragraph">{t("click-verify")}</p>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="otp-div">
            <input
              type="text"
              maxLength="1"
              size="1"
              min="0"
              max="9"
              name="first"
              pattern="[0-9]{1}"
              className="otp-input"
              onChange={handleTarget}
              autoFocus={true}
              required
            />
            <input
              type="text"
              maxLength="1"
              name="second"
              size="1"
              min="0"
              max="9"
              pattern="[0-9]{1}"
              className="otp-input"
              onChange={handleTarget}
              required
            />
            <input
              type="text"
              maxLength="1"
              size="1"
              min="0"
              max="9"
              name="third"
              pattern="[0-9]{1}"
              className="otp-input"
              onChange={handleTarget}
              required
            />
            <input
              type="text"
              maxLength="1"
              size="1"
              min="0"
              max="9"
              pattern="[0-9]{1}"
              className="otp-input"
              name="fourth"
              onChange={handleTarget}
              required
            />
          </div>
          <button type="submit" className="btn btn-auth btn-verify">
            {t("verify")}
          </button>
        </form>
        <button onClick={() => resendOtp()} className="paragraph resendBtn">
          {t("resend")}
        </button>
      </div>
    </div>
  );
};

export default Otp;
