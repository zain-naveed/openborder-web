import { Tick } from "../../../../assets";
import React from "react";
import "../../../styles/css/questionaire.css";
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
                  <p className="sum-h">
                    {item.category}
                  </p>
                  {
                    item.description.includes("<") ? <p className="sum-p"   dangerouslySetInnerHTML={{ __html: item.description }}>

                    </p>:<p className="sum-p">{item.summaryDescription }</p>
                  }
                  {/* <p className="sum-p">{item.description}</p> */}
                </div>
              );
            } else {
              return item.description.split("\n").length > 0 ? (
                item.description.split("\n").map((summry, sInx) => {
                  return (
                    <div key={sInx}>
                      {
                    summry.includes("<") ? <p  className="sum-p"  dangerouslySetInnerHTML={{ __html: summry }}>

                    </p>:<p className="sum-p">{summry}</p>
                  }
                      {/* <p className="sum-p">{summry}</p> */}
                    </div>
                  );
                })
              ) : (
                <div key={index}>
                  {console.log(item.description.split("\n"))}
                  {
                    item.description.includes("<") ? <p  className="sum-p"  dangerouslySetInnerHTML={{ __html: item.description }}>

                    </p>:<p className="sum-p">{item.description }</p>
                  }
                  {/* <p className="sum-p">{item.description}</p> */}
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
