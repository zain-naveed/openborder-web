import React, { useState, useEffect } from "react";
import "../../shared/styles/css/account.css";
import Navigation from "../navigation";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { getPackageServices } from "../../shared";
import Loader from "../../shared/loader/loader";

const Services = () => {
  const { t, i18n } = useTranslation();
  const [loader, setLoader] = useState(true);
  const history = useHistory();
  const [packageList, setPackageList] = useState([]);

  const PackagePlan = () => {
    getPackageServices()
      .then(({ data: { data } }) => {
        console.log(data);
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

  return (
    <>
      <Navigation label={t("flat")} onPress={() => history.goBack()} />

      <div className="main">
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

                        {/* <p className="desc-news">{post.description}</p> */}
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
      {loader && <Loader />}
    </>
  );
};

export default Services;
