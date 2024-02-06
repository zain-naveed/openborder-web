import React from "react";
import "../../styles/css/questionaire.css";

const ViewSummary = ({
  immigrationHistory,
  factorsOptions,
  inadmissibility,
}) => {
  return (
    <div className="sum-s">
      <ShowSummary summary={immigrationHistory} />
      <ShowSummary summary={factorsOptions} />
      <ShowSummary summary={inadmissibility} />
    </div>
  );
};
const ShowSummary = ({ summary }) => {
  return (
    <>
      {summary?.length > 0 ? (
        <div className="sum">
          {summary?.map((item, index) => {
            if (index === 0) {
              return (
                <div key={index}>
                  <p className="sum-h">{item.summaryCatagory}</p>
                  <p className="sum-p">{item.summaryDescription}</p>
                </div>
              );
            } else {
              return (
                <div key={index}>
                  <p className="sum-p">{item.summaryDescription}</p>
                </div>
              );
            }
          })}
        </div>
      ) : null}
    </>
  );
};
export default ViewSummary;
