import React, { useState, useEffect } from "react";
import "../../shared/styles/css/home.css";
import {
  OpenBorder,
  btnico,
  btnico1,
  btnico2,
  CloseSign,
  Menu,
} from "../../assets/index";
import { useTranslation } from "react-i18next";
import { Link, NavLink, useHistory } from "react-router-dom";
import { Side } from "../sidebar/index";
import "../../shared/styles/css/sidebar.css";
import { IconContext } from "react-icons";
// import Data from "../../data/data.json";
import PackageDetail from "./../package_detail/packagedetail";

import {
  getConsultationService,
  serviceHisotryService,
  getPackageServices,
} from "../../shared";
import Loader from "../../shared/loader/loader";

// import Loader from "../../shared/loader/loader";
// import { BASE_URL_Backend } from "../../shared/util/constant";

const Home = () => {
  const [sidebar, setSidebar] = useState(false);
  const [loader,setLoader] = useState(true);
  const showSidebar = () => setSidebar(!sidebar);
  const [packageList, setPackageList] = useState([]);
  const { t, i18n } = useTranslation();
  const history = useHistory();
  console.log("i");
  // const getConsultationPackages = () => {
  //   serviceHisotryService()
  //     .then(({ data }) => {
  //       console.log(data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  const PackagePlan = () => {
    getPackageServices()
      .then(({ data: { data } }) => {
        console.log(data);
        setLoader(false)
        setPackageList(data);
      })
      .catch((err) => {
        setLoader(false)
        console.log(err);
      });
  };

  useEffect(() => {
    // getConsultationPackages();
    PackagePlan();
  }, []);

  return (
    <>
      <div className="main">
        <div className="header">
          <IconContext.Provider value={{ color: "black" }}>
            <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
              <ul className="nav-menu-items" onClick={showSidebar}>
                <li className="navbar-toggle">
                  <Link to="#" className="menu-bars">
                    <img src={CloseSign} />
                  </Link>
                </li>
                {Side().map((item, index) => {
                  return (
                    <li key={index} className={item.cName}>
                      <Link to={item.path}>
                        {item.icon}
                        <span className="items">{item.title}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </IconContext.Provider>
          <img className="logo" src={OpenBorder} />
          <div className="navbars">
            <Link to="#" className="menu-bars">
              <img src={Menu} className="side-menu" onClick={showSidebar} />
            </Link>
          </div>
        </div>
        <div className="container cont_home">
          <NavLink to="/question">
            <button className="btn btn-home text-center">
              <img
                className="btn-img "
                src={btnico}
                alt="Explore Your Options"
              />
              <span className="btn-para d-block">{t("explore")}</span>
            </button>
          </NavLink>
          <NavLink to="/schedule">
            <button className="btn btn-home">
              <img
                className="btn-img"
                src={btnico1}
                alt="Schedule a Consultation Now"
              />
              <span className="btn-para d-block">
                {t("schedule-consultant")}
              </span>
            </button>
          </NavLink>
          <NavLink to="/services">
            <button className="btn btn-home">
              <img className="btn-img" src={btnico2} alt="Flat Fee Services" />

              <span className="btn-para d-block">{t("flat")}</span>
            </button>
          </NavLink>
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
                          onClick={() =>{
                            if(post.plan_type =='recurring'){
                              history.push({
                                pathname: "/package-detail",
                                state: post,
                              })
                            }else{
                              history.push({
                                pathname: "/package",
                                state: post,
                              })
                            }
                            
                          }
                            
                          }
                        >
                          {t("view-detail")}&gt;&gt;
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
      {
        loader &&  <Loader />
      }
      
    </>
  );
};

export default Home;
