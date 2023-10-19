import React from "react";
import ads from "../../image/ads.png";
import "./index.css";

const Advertisement = () => {
  return (
    <a
      href="https://www.facebook.com/profile.php?id=100095496554189"
      target="_blank"
      rel="noreferrer"
    >
      <img
        src={ads}
        alt=""
        style={{
          height: 650,
          objectFit: "cover",
        }}
      />
    </a>
  );
};

export default Advertisement;
