import React, { useState, useEffect } from "react";
import Navigation from "../navigation";
import { Facebook, Twitter } from "../../assets";
import "../../shared/styles/css/package.css";
import News from "../../data/dataforNews.json";
import { useTranslation } from "react-i18next";
import { useHistory, useLocation } from "react-router-dom";
import { getPackageServices } from "../../shared";
import Loader from "../../shared/loader/loader";

const Package = () => {
  const [packageList, setPackageList] = useState([]);
  const [loader,setLoader] = useState(true)
  const [change, setChange] = useState(1)
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const history = useHistory();

  const itemsEvent = (e) => {
    setChange(e.target.value)
  }


  console.log("Location of Single", location);

  const PackagePlan = () => {
    getPackageServices()
      .then(({ data: { data } }) => {
        setLoader(false)
        console.log("Data", data);
        let temp = data.filter((item) => item.id == location.state.id);
        console.log("This is Temp", temp);
        setPackageList(temp);
      })
      .catch((err) => {
        setLoader(false)
        console.log(err);
      });
  };

  useEffect(() => {
    PackagePlan();
  }, []);

  return (
    <>
      <Navigation
        label={t("package-detail")}
        onPress={() => history.goBack()}
      />

      <form>
        <div className="mains">
          <div className="cont-n">
            {packageList.map((post) => {
              return (
                <>
                  <h1 className="news-h"> {post.plan_name}</h1>

                  <p className="date-price"> From ${post.amount}</p>
                  <div
                    className="news-p"
                    dangerouslySetInnerHTML={{
                      __html: post.description,
                    }}
                  ></div>

                  <a target="_blank" href="https://facebook.com/OpenBorder">
                    <img src={Facebook} />
                  </a>
                  <a target="_blank" href="https://twitter.com/OpenBorder">
                    <img className="m-2" src={Twitter} />
                  </a>
                  <div className="pack"></div>
                  <div className="am-div">
                    <ul className="ul-pack">
                      <li className="li-pack">
                        <p>{t("amount")}</p>
                        <div>
                          <input className="ipt-pack" value={"$  " +  post.amount*change}/>
                        </div>
                        {/* <div className="dropdown">
                          <button
                            className="btn dropdown-toggle"
                            type="button"
                            id="dropdownMenuButton1"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            $ {change}
                          </button>
                          <ul
                            className="dropdown-menu"
                            aria-labelledby="dropdownMenuButton1"
                          >
                            <li>
                              <a
                                className="dropdown-item"
                                onClick={() => setChange(16000)}
                              >
                                $ 16000
                              </a>
                            </li>
                            <li>
                              <a
                                className="dropdown-item"
                                onClick={() => setChange(16000)}
                              >
                                $ 16000
                              </a>
                            </li>
                            <li>
                              <a
                                className="dropdown-item"
                                onClick={() => setChange(16000)}
                              >
                                $ 16000
                              </a>
                            </li>
                          </ul>
                        </div> */}
                      </li>
                      <li className="li-pack mx-4">
                        <p>{t("quantity")} </p>
                        <input
                          className="ipt-pack"
                          placeholder="1"
                          maxLength={9}
                          onChange={itemsEvent}
                          type="number"
                          min="1"
                          max="10"
                          required
                        />
                      </li>
                    </ul>
                  </div>
                </>
              );
            })}
          </div>
        </div>
        <div className="footer">
          <button type="submit" className="btn btn-main btn-pack">
            ADD ALL INCREMENTS NEEDED TO THE CART, THEN CHECKOUT.
          </button>
        </div>
      </form>
      {
        loader && <Loader />
      }
      
    </>
  );
};

export default Package;
