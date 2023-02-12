import React from "react";
import onlineIcon from "../icons/onlineIcon.png";
import closeIcon from "../icons/closeIcon.png";

// eslint-disable-next-line react/prop-types
function InfoBar({ room }) {
  return (
    <div className="infoBar rounded-top">
      <div className="leftInnerContainer">
        <img className="onlineIcon" src={onlineIcon} alt="online icon" />
        <h3>{room}</h3>
      </div>
      <div className="rightInnerContainer">
        <a href="/">
          <img src={closeIcon} alt="close icon" />
        </a>
      </div>
    </div>
  );
}

export default InfoBar;
