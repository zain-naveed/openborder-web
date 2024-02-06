import { Modal } from "bootstrap";
import React from "react";

const Footers = ({ label, onPress, img, title }) => {
  return (
    <div>
      {title ? (
        <>
          <button type="button" className="btn btn-foot" onClick={onPress}>
            <img src={img} />
            {label}
          </button>
          <button type="button" className="btn btn-foot"></button>
        </>
      ) : (
        <button type="button" className="btn btn-foot" onClick={onPress}>
          <img src={img} />
          {label}
        </button>
      )}
    </div>
  );
};
export default Footers;
