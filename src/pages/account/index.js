import { t } from "i18next";
import React, { useState } from "react";
import { Info, Dollar, Location } from "../../assets";
import "../../shared/styles/css/account.css";
import Navigation from "../navigation";
import { updateProfileService } from "../../shared";
import { toastMessage } from "../../shared/component/toast";

const Account = () => {
  const [sidebar, setSidebar] = useState(false);
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [street, setStreet] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    let obj = {
      first_name : fname,
      last_name : lname,
      email: email,
      phone_no: phone,
      street: street,
      country: country,
      state: state,
      city: city,
      zip_code: zip
    };

    updateProfileService(obj)
      .then(({ data: { data } }) => {
        console.log(data);
      })
      .catch((err) => {
        toastMessage(err?.response?.data?.message, "error");
      });
  };

  // const showSidebar = () => setSidebar(!sidebar);
  return (
    <>
      <Navigation label="Account" />

      <form className="signin-form" onSubmit={(e) => handleSubmit(e)}>
        <div className="container cont-acc">
          <div className="row">
            <div className="col-6 col-acc">
              <ul className="acc">
                <li>
                  <img src={Info} />
                </li>
                <li>
                  <p className="p-acc">{t("information")}</p>
                </li>
              </ul>
              <div className="row">
                <div className="col">
                  <label for="fname">{t("fname")}</label>
                </div>
                <div className="col">
                  <label for="lname">{t("lname")}</label>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <input
                    onChange={(e) => setFname(e.target.value)}
                    type="text"
                    className="acc-inpu"
                    placeholder="Jake"
                    id="fname"
                    required
                  />
                </div>
                <div className="col">
                  <input
                    onChange={(e) => setLname(e.target.value)}
                    type="text"
                    className="acc-inpu"
                    placeholder="Muss"
                    id="lname"
                    required
                  />
                </div>
              </div>
              <label for="PhoneNum">{t("phoneNo")}</label>
              <input
                onChange={(e) => setPhone(e.target.value)}
                type="number"
                className="acc-input"
                pattern="[0-9\s]{13,19}"
                autocomplete="cc-number"
                maxlength="16"
                id="PhoneNum"
                placeholder="0009872132"
                required
              />
              <label for="email">Email</label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                className="acc-input"
                id="email"
                placeholder="jakemuss0@gmail.com"
                required
              />
              <ul className="acc">
                <li>
                  <img src={Location} />
                </li>
                <li>
                  <p className="p-acc">{t("address")}</p>
                </li>
              </ul>
              <label for="Street">{t("street")}</label>
              <input
                onChange={(e) => setStreet(e.target.value)}
                type="text"
                className="acc-input"
                id="Street"
                placeholder="St# 23"
                required
              />
              <label for="city">{t("city")}</label>
              <input
                onChange={(e) => setCity(e.target.value)}
                type="text"
                className="acc-input"
                id="city"
                placeholder="Inglewood"
                required
              />
              <label for="state">{t("state")}</label>
              <input
                onChange={(e) => setState(e.target.value)}
                type="text"
                className="acc-input"
                id="state"
                placeholder="317 Myers"
                required
              />
              <label for="postal">{t("zip")}</label>
              <input
                onChange={(e) => setZip(e.target.value)}
                type="number"
                className="acc-input"
                id="postal"
                placeholder="CA 90301"
                required
              />
              <label for="country">{t("country")}</label>
              <input
                onChange={(e) => setCountry(e.target.value)}
                type="text"
                className="acc-input"
                id="country"
                placeholder="United States"
                required
              />
            </div>
            <div className="col-6 col-acc">
              <ul className="acc">
                <li>
                  <img src={Dollar} />
                </li>
                <li>
                  <p className="p-acc"> {t("payment")}</p>
                </li>
              </ul>
              <label for="fname">{t("fname")}</label>
              <input
                type="text"
                className="acc-input"
                id="fname"
                placeholder="Jake"
                required
              />
              <label for="lname">{t("lname")}</label>
              <input
                type="text"
                className="acc-input"
                id="lname"
                placeholder="Inglewood"
                required
              />
              <label for="card">{t("credit")}</label>
              <input
                id="card"
                type="tel"
                inputmode="numeric"
                className="acc-input"
                pattern="[0-9\s]{13,19}"
                autocomplete="cc-number"
                maxlength="16"
                placeholder="2054850145289631"
                // type="text"
                // className="acc-input"
                // id="card"
                // placeholder="1234-5643-2342-3223"
                required
              />
              <label for="exp">{t("expiry")}</label>
              <input
                type="date"
                format="mm/yyyy"
                className="acc-input"
                id="exp"
                required
              />
              <label for="cvc">{t("cvc")}</label>
              <input
                type="number"
                className="acc-input"
                id="cvc"
                pattern="[0-9\s]{13,19}"
                autocomplete="cc-number"
                maxlength="3"
                placeholder="252"
                required
              />
              <label for="postal">{t("zip")}</label>
              <input
                type="number"
                className="acc-input"
                id="postal"
                placeholder="CA 90301"
                required
              />
            </div>
          </div>
        </div>
        <div className="footer">
          <button type="submit" className="btn btn-main">
            {t("done")}
          </button>
        </div>
      </form>
    </>
  );
};

export default Account;
