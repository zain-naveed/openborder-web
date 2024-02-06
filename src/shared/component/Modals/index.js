import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import classNames from "classnames";
import Cons from "../../../data/consultants.json";
import { useDispatch, useSelector } from "react-redux";
import { getConsultationService } from "../../services";
import moment from "moment";
import { toastMessage } from "..";
const Modals = ({ label, title, datetoConsult, timetoConsult }) => {
  const [isActive, setActive] = useState(-1);
  const [userID, setUserid] = useState(null);
  const [date, setDate] = useState(null);
  const {
    user: { user },
  } = useSelector((state) => state.root);
  // const [time, setTime] = useState(null);
  const [consultants, setConsultant] = useState("");
  const [consultingID, setCosultingID] = useState(1);
  const { t, i18n } = useTranslation();
  console.log("user", user);
  const getConsultationPackages = () => {
    let obj = {
      user_id: user.id,
      date: datetoConsult,
      consultation_time: timetoConsult,
      consultation_id: consultingID,
      consultation_with: consultants,
    };
    getConsultationService(obj)
      .then(({ data: { data } }) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const dispatch = useDispatch();

  const handleChange = (event) => {
    setCosultingID(event.target.value);
    setDate(datetoConsult);
    // setConsultingTime(timetoConsult);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(moment(timetoConsult).format("HH:MM"));
    let obj = {
      user_id: user.id,
      date: moment(datetoConsult).format("YYYY-MM-D"),
      consultation_time: moment(timetoConsult).format("HH:MM"),
      consultation_id: consultingID,
      consultation_with: consultants,
    };

    getConsultationService(obj)
      .then(({ data: { data } }) => {
        console.log(data);
      })
      .catch((err) => {
        toastMessage(err?.response?.data?.message, "error");
      });
  };

  const toggle = (ind) => {
    // to set active
    setActive(ind);

    // to get value
    const tempp = Cons.find((e, id) => id == ind);
    console.log(tempp.consultant_name);
    setConsultant(tempp.consultant_name);
  };

  // useEffect(() => {
  //   getConsultationPackages();
  // }, []);

  return (
    <div>
      <button
        type="button"
        className="btn btn-modal"
        data-toggle="modal"
        data-target="#exampleModal"
      >
        {label}
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                {title}
              </h5>
            </div>
            <form onSubmit={(e) => handleSubmit(e)}>
              <div className="modal-body">
              {/* <div><p>Consultation Fee $300</p></div> */}

                <div className="modal-b">
                  
                  <div className="form-check check-m">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="flexRadioDefault"
                      id="flexRadioDefault1"
                      value="1"
                      checked={consultingID === "1"}
                      onChange={(e) => handleChange(e)}
                    />
                    <label
                      className="form-check-label check-w"
                      for="flexRadioDefault1"
                    >
                      {t("phone")}
                    </label>
                  </div>
                  <div className="form-check check-m">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="flexRadioDefault"
                      id="flexRadioDefault2"
                      value="2"
                      checked={consultingID === "2"}
                      onChange={(e) => handleChange(e)}
                    />
                    <label
                      className="form-check-label check-w"
                      for="flexRadioDefault2"
                    >
                      {t("video")}
                    </label>
                  </div>
                </div>
                {Cons.map((post, index) => (
                  <>
                    <div key={index} className="name-div">
                      <input
                        type="button"
                        value={post.consultant_name}
                        className={isActive === index ? "ipt-active" : "ipt-s"}
                        onClick={() => toggle(index)}
                      />
                    </div>
                  </>
                ))}
              </div>
              <div className="modal-footer">
                <button type="submit" className="btn btn-modal">
                  {t("saves")}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modals;
