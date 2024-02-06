import React, { useEffect } from "react";
import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./i18n";
import Routes from "./shared/routes/Routes";
import { useSelector, useDispatch } from "react-redux";
import { setLang } from "./shared/Redux/Reducers/langSlice";
import { ToastContainer } from "react-toastify";
import { useTranslation } from "react-i18next";
import { login } from "./shared/Redux/Reducers/userSlice";
import { initialConfig } from "./shared/util/config";
const App = () => {
  const dispatch = useDispatch();
  const {
    lang: { lang },
    user
  } = useSelector((state) => state.root);
  const { i18n } = useTranslation();
  useEffect(() => {
    console.log("navigator",user);
    // if(navigator.language == 'es'){
    //   dispatch(setLang('sp'));
    // }else{
    //   dispatch(setLang(lang));
    // }
    // dispatch(login(user))
    dispatch(setLang(lang));
    i18n.changeLanguage(lang);
    // initialConfig()
  }, [lang]);
  return (
    <div className="section">
      <Routes />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default App;
