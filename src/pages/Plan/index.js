import React from "react";
import { Link } from "react-router-dom";
import "./index.css";
import chibi from "../../image/chibi2.gif";
import chibi2 from "../../image/chibi1.gif";
import chibi1 from "../../image/chibi.gif";
import chibi3 from "../../image/chibi3.gif";
import chibi4 from "../../image/chibi4.gif";

const Plan = () => {
  return (
    <>
      <div className="plan-image">
        <img src={chibi} alt="#" style={{ width: 200 }} />
        <img src={chibi2} alt="#" style={{ width: 150 }} />
        <img src={chibi2} alt="#" style={{ width: 150 }} />
        <img src={chibi2} alt="#" style={{ width: 150 }} />
        <img src={chibi2} alt="#" style={{ width: 150 }} />
        <img src={chibi2} alt="#" style={{ width: 150 }} />
      </div>
      <h3
        className="title is-3 has-text-dark"
        style={{ textAlign: "center", marginTop: 50 }}
      >
        Kế hoạch hướng dẫn ăn uống chi tiết cho con của bạn
      </h3>
      <div className="plan-container mb-5">
        <div className="container is-fluid">
          <div className="notification is-primary is-fullheight">
            <div className="box">
              <Link to="/plan-detail" style={{ textDecoration: "none" }}>
                <h5
                  className="title is-5 has-text-dark mb-0"
                  style={{ textAlign: "center" }}
                >
                  6 tháng - 30 ngày đầu tiên
                </h5>
              </Link>
            </div>
            <div className="columns">
              <div className="column is-half">
                <div className="box mb-0">
                  <a href="/" style={{ textDecoration: "none" }}>
                    <h5
                      className="title is-5 has-text-dark mb-0"
                      style={{ textAlign: "center" }}
                    >
                      7 tháng tuổi
                    </h5>
                  </a>
                </div>
              </div>
              <div className="column is-half">
                <div className="box mb-0">
                  <a href="/" style={{ textDecoration: "none" }}>
                    <h5
                      className="title is-5 has-text-dark mb-0"
                      style={{ textAlign: "center" }}
                    >
                      8 tháng tuổi
                    </h5>
                  </a>
                </div>
              </div>
            </div>
            <div className="columns">
              <div className="column is-one-third">
                <div className="box mb-0">
                  <a href="/" style={{ textDecoration: "none" }}>
                    <h5
                      className="title is-5 has-text-dark mb-0"
                      style={{ textAlign: "center" }}
                    >
                      9 tháng tuổi
                    </h5>
                  </a>
                </div>
              </div>
              <div className="column is-one-third">
                <div className="box mb-0">
                  <a href="/" style={{ textDecoration: "none" }}>
                    <h5
                      className="title is-5 has-text-dark mb-0"
                      style={{ textAlign: "center" }}
                    >
                      10 tháng tuổi
                    </h5>
                  </a>
                </div>
              </div>
              <div className="column is-one-third">
                <div className="box mb-0">
                  <a href="/" style={{ textDecoration: "none" }}>
                    <h5
                      className="title is-5 has-text-dark mb-0"
                      style={{ textAlign: "center" }}
                    >
                      11 tháng tuổi
                    </h5>
                  </a>
                </div>
              </div>
            </div>
            <div className="box">
              <a href="/" style={{ textDecoration: "none" }}>
                <h5
                  className="title is-5 has-text-dark mb-0"
                  style={{ textAlign: "center" }}
                >
                  12 tháng trở lên và bắt đầu ăn cùng gia đình
                </h5>
              </a>
            </div>
          </div>
        </div>
        <div className="plan-image">
          <img src={chibi1} alt="#" style={{ width: 300 }} />
          <img src={chibi3} alt="#" style={{ width: 300 }} />
          <img src={chibi4} alt="#" style={{ width: 300 }} />
        </div>
      </div>
    </>
  );
};

export default Plan;
