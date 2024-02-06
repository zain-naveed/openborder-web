import React from "react";
import { Logo } from "../../assets";
import styles from "./appHeader.module.scss";
const AppHeader = () => {
  return (
      <div className={styles.flex}>


        <div className={styles.flexImg}>
          <div className={styles.container}>
          <img src={Logo} />
          </div>
        </div>
        
        
        <div className={styles.flexNavItems}>
        <div>Home</div>
        <div>Services and Payment</div>
        <div>About the Firm</div>
        <div>Contact Us</div>
        </div>
      
      </div>
  );
};
export default AppHeader;
