import React,{useEffect} from "react";
import { Placeholder } from "../../assets/index";
import "../../shared/styles/css/account.css";
import "../../shared/styles/css/news.css";
import Data from "../../data/data.json";
import Navigation from "../navigation";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { getNewsService } from "../../shared";

const News = () => {
  const history = useHistory();
  const { t, i18n } = useTranslation();
  const getNews = ()=>{
    getNewsService().then(({data})=>{
      console.log(data);
    }).catch(err=>{
      console.log('news err',err);
    })
  }
useEffect(()=>{
  getNews()
},[])
  return (
    <>
      <Navigation label={t("news")} onPress={() => history.goBack()} />

      <div className="news-m">
        <div>
          <img className="img-n" src={Placeholder} />
          <div className="cont-n">
            <p className="date-price">March 30, 2020</p>
            <h1 className="news-h">
              Know Your Rights When Dealing with Law Enforcement
            </h1>
            <p className="news-p">
              It is important for all of us, regardless of immigration status,
              to know how to exercise our rights if we are stopped by local
              police or immigration authorities. We all know that in many parts
              of our country, there is not a lot of racial or ethnic diversity.
            </p>
          </div>
        </div>

        <p className="paragraph-home">{t("previous-news")}</p>

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
                        <p className="view-news">{t("view-detail")}&gt;&gt;</p>
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

export default News;
