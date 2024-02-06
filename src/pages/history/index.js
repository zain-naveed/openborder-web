import React from "react";
import "../../shared/styles/css/account.css";
import Data from "../../data/data.json";
import Navigation from "../navigation";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";

const History = () => {
  const history =  useHistory();
  const { t, i18n } = useTranslation();

  return (
    <>
      <Navigation label={t("history")} onPress={() => history.goBack()} />

      <div className="main">
        <p className="paragraph-home">{t('recently')}</p>

        <div className="container cont-news">
          <div className="row">
            <div className="row">
              {Data.map((post) => {
                return (
                  <>
                    <div className="col-6 col-news">
                      <img className="img-news" src={post.image} />
                      <div className="descrptn_cont">
                        <p className="head-news"> {post.heading}</p>
                        <p className="desc-news">{post.description}</p>
                        <p className="view-news">View Details&gt;&gt;</p>
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default History;
