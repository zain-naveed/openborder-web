import React from "react";
import "../../shared/styles/css/language.css";
import { England, Spain } from "../../assets/index";
import { useTranslation } from "react-i18next";
import i18n from "../../i18n";
import { Link,useHistory } from "react-router-dom";
import {useDispatch,useSelector} from 'react-redux'
// import {Setlanguage} from '../../features/langSlice'
import {setLang} from "../../shared/Redux/Reducers/langSlice";



const LanguageComp = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const {
    user: { user },
  } = useSelector((state) => state.root);
  const changeLanguage = (ln) => {
    if(user){
      history.goBack()
    }else{
      history.push("/signin")
    }
    dispatch(setLang(ln))
    return () => {
      i18n.changeLanguage(ln); 
    };
  };
 
  const { t, i18n } = useTranslation();
  return (
    <div className="mains">
      <h1 className="heading">{t("greeting")}</h1>
      <p className="lang-para">
        {t('bio')}
      </p>
      <p className="lang-heading-2">{t('language')}</p>

      <div className="btn-div">
        {/* <Link to="/signin"> */}
          <button className="btn btn-lang" onClick={()=>changeLanguage("en")}>
            <img src={England} alt="English" />
            <br />
            {t('english')}
          </button>
        {/* </Link> */}

        {/* <Link to="/signin"> */}
          <button className="btn btn-lang" onClick={()=>changeLanguage("sp")}>
            <img src={Spain} alt="Espanish" />
            <br />
            {t('spanish')}
          </button>
        {/* </Link> */}
      </div>
    </div>
  );
};

export default LanguageComp;
