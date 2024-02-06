import { Switch, Route, Redirect } from "react-router-dom";
import React,{useEffect} from "react";
// import Language from "../../pages/language";
import SignIn from "../../pages/auth/signin";
import SignUp from "../../pages/auth/signup";
import Otp from "../../pages/auth/OTP";
import Home from "../../pages/home";
import Account from "../../pages/account";
import Question from "../component/Question";
import Fee from "../../pages/flat-services";
import History from "../../pages/history";
import News from "../../pages/news";
import Schedule from "../../pages/schedule";
import Package from "../../pages/package_detail";
import Forget from "../../pages/auth/ForgetPassword";
import PackageDetail from "../../pages/package_detail/packagedetail";
import LanguageComp from "../../pages/language";
import ModalForgotPassword from "../component/Modals/ModalForgotPassword";
import AuthRoute from "./authRoute";

const Routes = () => {
  
  return (
    <>
      <Switch>
        <AuthRoute />
        {/* <Route exact path="/signin" component={SignIn} /> */}
        {/* <Route exact path="/" component={LanguageComp} /> */}
        {/* <Route exact path="/signup" component={SignUp} /> */}
        {/* <Route exact path="/reset-password" component={Forget} /> */}
        {/* <Route exact path="/otp" component={Otp} /> */}
         {/* <Route exact path="/home" component={Home} />
        <Route exact path="/account" component={Account} />
        <Route exact path="/question" component={Question} />
        <Route exact path="/history" component={History} />
        <Route exact path="/news" component={News} />
        <Route exact path="/schedule" component={Schedule} />
        <Route exact path="/package" component={Package} />
        <Route exact path="/services" component={Fee} />
        <Route exact path="/package-detail" component={PackageDetail} />
        <Redirect to="/" /> */}
      </Switch>
    </>
  );
};

export default Routes;
