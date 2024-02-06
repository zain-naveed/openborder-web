import React, { useState } from "react";
import { Menu, CloseSign } from "../../assets";
import { Link } from "react-router-dom";
import { IconContext } from "react-icons";
import { Side } from "../sidebar/index";
import "../../shared/styles/css/account.css";
import { useHistory } from "react-router-dom";

const Navigation = ({ label }) => {
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);

  const history = useHistory();
  // console.log('sides data',onPress);
  return (
    <>
      
        <div className="navigation">
          <IconContext.Provider>
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

          <div className="back" onClick={()=>history.goBack()}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-chevron-left"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
              />
            </svg>
          </div>

          <p className="navi-paragraph">{label}</p>
          <div className="menu navbars">
            <Link to="#" className="menu-bars">
              <img src={Menu} className="side-menu" onClick={showSidebar} />
            </Link>
          </div>
        </div>
      
    </>
  );
};

export default Navigation;
