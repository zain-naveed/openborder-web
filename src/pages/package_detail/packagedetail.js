import React, { useState, useEffect } from "react";
import Navigation from "../navigation";
import { Facebook, Twitter } from "../../assets";
import "../../shared/styles/css/package.css";
import PackDetail from "../../data/packagedetail.json";
import { useTranslation } from "react-i18next";
import { useHistory, useLocation } from "react-router-dom";
import { getPackageServices } from "../../shared";
import Loader from "../../shared/loader/loader";

const PackageDetail = () => {
  const { t, i18n } = useTranslation();
  const [packageList, setPackageList] = useState([]);
  const [loader,setLoader] = useState(true)
  const history = useHistory();
  const location = useLocation();
  console.log("Location of reccuring", location);

  const PackagePlan = () => {
    getPackageServices()
      .then(({ data: { data } }) => {
        // console.log(data);
        setLoader(false)
        let tempID = data.filter((item) => item.id == location.state.id);
        // console.log("This is Temp", tempID);
        if (tempID[0].plan_type == "recurring") {
          setPackageList(tempID);
        } else {
          history.push({
            pathname: "/package",
            state: tempID[0],
          });
        }
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

                  <p className="date-price">
                    ${post.amount} every month for {post.duration} months
                  </p>
                  <div
                    className="news-p"
                    dangerouslySetInnerHTML={{
                      __html: post.description,
                    }}
                  ></div>
                </>
              );
            })}
            <div className="pack-2"></div>
            <a target="_blank" href="https://facebook.com/OpenBorder">
              <img src={Facebook} />
            </a>
            <a target="_blank" href="https://twitter.com/OpenBorder">
              <img className="m-2" src={Twitter} />
            </a>

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

export default PackageDetail;
