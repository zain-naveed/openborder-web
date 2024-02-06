import React, { useEffect, useState } from "react";
import "../../shared/styles/css/account.css";
// import Data from "../../data/data.json";
import Navigation from "../navigation";
import "../../shared/styles/css/schedule.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../shared/styles/css/datepicker.css";
import Modals from "../../shared/component/Modals/index";
import "../../shared/styles/css/modal.css";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { getPackageServices } from "../../shared";
import Loader from "../../shared/loader/loader";


const Schedule = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [loader, setLoader] = useState(true);
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const [packageList, setPackageList] = useState([]);
  const { t, i18n } = useTranslation();
  const history = useHistory();

  const PackagePlan = () => {
    getPackageServices()
      .then(({ data: { data } }) => {
        setPackageList(data);
        setLoader(false);

      })
      .catch((err) => {
        console.log(err);
        setLoader(false);
      });
  };

  useEffect(() => {
    PackagePlan();
  }, []);

  // const ExampleCustomInput = React.forwardRef(({ value, onClick }, ref) => (
  //   <button className="example-custom-input" onClick={onClick} ref={ref}>
  //     {value}
  //   </button>
  // ));
  return (
    <>
      <Navigation
        label={t("schedule-consultant")}
        onPress={() => history.goBack()}
      />

      <div className="main">
        <div className="sch-c">
          <div className="sch container">
            <p className="sch-p">{t("schedule")}</p>
            <div className="btn-group">
              <button type="button" className="btn btn-sch">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-calendar"
                  viewBox="0 0 16 16"
                  style={{ background: "transparent" }}
                >
                  <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z" />
                </svg>
                <DatePicker
                  placeholderText={t("date")}
                  selected={selectedDate}
                  onChange={(date) => setSelectedDate(date)}
                  minDate={new Date()}
                  filterDate={(date) =>
                    date.getDay() !== 6 && date.getDay() !== 0
                  }
                  dateFormat="MMMM d, yyyy"
                  className="ipt-sch"
                />
              </button>
              <button type="button" className="btn btn-sch">
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-clock"
                    viewBox="0 0 16 16"
                    style={{ background: "transparent" }}
                  >
                    <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z" />
                    <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z" />
                  </svg>
                </div>

                <div>
                  <DatePicker
                    placeholderText={t("time")}
                    className="ipt-sch"
                    showTimeSelectOnly
                    selected={selectedTime}
                    onChange={(time) => setSelectedTime(time)}
                    timeInputLabel="Select Time"
                    dateFormat="h:mm aa"
                    showTimeInput
                  />
                </div>
              </button>
            </div>
            <button className="btn btn-schu btn-modal">
              <Modals
                label={t("continue")}
                title={t("consultant")}
                datetoConsult={selectedDate}
                timetoConsult={selectedTime}
              />
            </button>
          </div>
        </div>

        <p className="paragraph-home">{t("select-package")}</p>

        <div className="container cont-news">
          <div className="row">
            <div className="row">
              {packageList.map((post) => {
                return (
                  <>
                    <div className="col-6 col-news">
                      <img
                        className="img-news"
                        src={
                          "http://178.128.29.7/open-border-web/public/" +
                          post.image
                        }
                      />
                      <div className="descrptn_cont">
                        <p className="head-news"> {post.plan_name}</p>
                        <div
                          className="desc-news"
                          dangerouslySetInnerHTML={{
                            __html: post.description,
                          }}
                        ></div>
                        <p
                          className="view-news"
                          onClick={() => {
                            if (post.plan_type == "recurring") {
                              history.push({
                                pathname: "/package-detail",
                                state: post,
                              });
                            } else {
                              history.push({
                                pathname: "/package",
                                state: post,
                              });
                            }
                          }}
                        >
                          View Details&gt;&gt;
                        </p>
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      {loader && <Loader />}
    </>
  );
};

export default Schedule;
