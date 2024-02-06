import React from "react";
import {
  HomeIcon,
  Guide,
  History,
  Consultant,
  News,
  Service,
  Logout,
  Switch,
  AccIco,
} from "../../assets/index";
import {useDispatch} from 'react-redux'
import { useTranslation } from "react-i18next";
import { logout } from "../../shared/Redux/Reducers/userSlice";
export const Side = ()=>{
  const {t,i18n} =useTranslation();
  const dispatch = useDispatch();
  const LogoutUser = ()=>{
    dispatch(logout())
  }
 return [
    {
      title: <span className="side">{t('home')}</span>,
      path: "/home",
      icon: <img src={HomeIcon} />,
      cName: "nav-text",
    },
    {
      title: <span className="side">{t('guide')}</span>,
      path: "/question",
      icon: <img src={Guide} />,
      cName: "nav-text",
    },
    {
      title: <span className="side">{t('history')}</span>,
      path: "/history",
      icon: <img src={History} />,
      cName: "nav-text",
    },
    {
      title: <span className="side">{t('consultant')}</span>,
      path: "/schedule",
      icon: <img src={Consultant} />,
      cName: "nav-text",
    },
    {
      title: <span className="side">{t('news')}</span>,
      path: "/news",
      icon: <img src={News} />,
      cName: "nav-text",
    },
    {
      title: <span className="side">{t('flat')}</span>,
      path: "/services",
      icon: <img src={Service} />,
      cName: "nav-text",
    },
    {
      title: <span onClick={LogoutUser} className="side">{t('logout')}</span>,
      path: "/signin",
      icon: <img src={Logout} />,
      cName: "nav-text",
    },
    {
      title: <span className="side">{t('account')}</span>,
      path: "/account",
      icon: <img src={AccIco} />,
      cName: "nav-text",
    },
    {
      title: <span className="side">{t('switch')}</span>,
      path: "/",
      icon: <img src={Switch} />,
      cName: "nav-text",
    },
  ];
}