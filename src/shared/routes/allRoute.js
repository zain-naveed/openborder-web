import SignIn from "../../pages/auth/signin";
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
import Signup from "../../pages/auth/signup";
const publicRoute = [
    {
        component:LanguageComp,
        path:"/",
        title:"Language"
    },
    {
        component:SignIn,
        path:"/signIn",
        title:"SignIn"
    },
    {
        component:Signup,
        path:"/signup",
        title:"Sign Up"
    },
    {
        component:Forget,
        path:"/reset-password",
        title:"Reset Password"
    },
    {
        component:Otp,
        path:"/otp",
        title:"Verify Email"
    },

]
const PrivateRoute = [
    {
        component:LanguageComp,
        path:"/",
        title:"Language"
    },
    {
        component:Home,
        path:"/home",
        title:"Home"
    },
    {
        component:Account,
        path:"/account",
        title:"Account"
    },
    {
        component:Question,
        path:"/question",
        title:"Questopm"
    },
    {
        component:History,
        path:"/history",
        title:"History"
    },
    {
        component:News,
        path:"/news",
        title:"News"
    },
    {
        component:Schedule,
        path:"/schedule",
        title:"Schedule"
    },
    {
        component:Package,
        path:"/package",
        title:"Packages"
    },
    {
        component:Fee,
        path:"/services",
        title:"Fee"
    },
    {
        component:PackageDetail,
        path:"/package-detail",
        title:"Package Detail"
    },
]

export {publicRoute,PrivateRoute}