import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { toastMessage } from "..";
import { forgotPasswordService } from "../..";
const ModalForgot = () => {
  const { t, i18n } = useTranslation();
  const [email, setEmail] = useState("");
  const [errorfor, setError] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loader, setLoader] = useState(false);
  const history = useHistory();
  const validate = () => {
    if (email === "") {
      setError("email");
      setErrorMsg("Email is requied!!");
      return false;
    } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      setError("email");
      setErrorMsg("You have entered an invalid email address!");
      return false;
    } else {
      return true;
    }
  };
  const getEmail = (e) => {
    e.preventDefault();
    let valid = validate();
    
    if (valid) {
      setLoader(true);
      let obj = {
        email: email,
      };
      forgotPasswordService(obj)
        .then(({ data }) => {
          setLoader(false);
          history.push({
            pathname: "/reset-password",
            mail: email,
          });
          window.jQuery(function () {
            window.jQuery("#exampleModal").modal().toggle("hide");
            window
              .jQuery(".modal-backdrop")
              .removeClass("show modal-backdrop")
              .addClass("hide");
          });
        })
        .catch((err) => {
          setLoader(false);
          toastMessage(err?.response?.data?.message, "error");
        });
    }
  };
  const resetError = () => {
    setError("");
    setErrorMsg("");
  };
  return (
    <div>
      <label
        type="button"
        className="forget-pwd"
        data-toggle="modal"
        data-target="#exampleModal"
      >
        {t("forget-password")}
      </label>

      <div
        className="modal fade"
        id="exampleModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <form>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-body d-flex justify-content-center">
                <div>
                  <div className="mr-body">{t("modal-forgot")}</div>
                  <div className="mail-input">
                    <input
                      type="email"
                      className="enter-mail"
                      onChange={(e) => {
                        resetError();
                        setEmail(e.target.value);
                      }}
                    />
                  </div>
                  <div>
                    {errorfor == "email" && errorMsg !== "" && (
                      <div style={{ color: "red" }}>{errorMsg}</div>
                    )}
                  </div>
                </div>
              </div>
              <div className="modal-footer mr-foot">
                <button
                  disabled={loader}
                  onClick={getEmail}
                  id="btns"
                  className="btn btn-yes"
                >
                  {loader ? (
                    <div class="spinner-border" role="status">
                      <span class="sr-only"></span>
                    </div>
                  ) : (
                    t("submit")
                  )}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalForgot;
