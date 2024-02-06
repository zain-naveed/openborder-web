import React from "react";
import { DefaulLoader } from "../../assets";
import Animation from "./Animation";
import "./loader.css";
function Loader() {
  return (
    <div className="loader">
      <div style={{ height: "369px", marginTop: "25vh", position: "fixed" }}>
        <Animation Pic={DefaulLoader} />
      </div>
    </div>
  );
}

export default Loader;
