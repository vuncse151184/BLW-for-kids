import React from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import Advertisement from "../Advertisement";
import "./index.css";

const LayoutWithoutSearch = ({ children }) => {
  return (
    <>
      <Navbar />
      <div style={{ paddingTop: 70, paddingBottom: 50, minHeight: 500 }}>
        <div className="layout-without-search-container">
          <div className="layout-without-search-sidebar">
            <div className="layout-without-search-ads">
              <Advertisement />
            </div>
          </div>
          <div className="layout-without-search-main-content">{children}</div>
          <div className="layout-without-search-sidebar">
            <div className="layout-without-search-ads">
              <Advertisement />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default LayoutWithoutSearch;
