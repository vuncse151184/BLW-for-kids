import React from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";

const LayoutWithoutAds = ({ children }) => {
  return (
    <div>
      <Navbar />
      <div style={{ paddingTop: 70, paddingBottom: 50, minHeight: 500 }}>
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default LayoutWithoutAds;
