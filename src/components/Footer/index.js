import React from "react";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="columns pl-5">
        <div className="column pl-5">
          <h4
            className="bd-footer-title 
                 has-text-weight-medium
                 has-text-left has-text-primary mb-4"
          >
            Ăn dặm cho bé
          </h4>
          <p
            className="bd-footer-link 
                has-text-left"
          >
            BLW tạo điều kiện cho sự phát triển vận động miệng và tập trung mạnh
            mẽ vào bữa ăn gia đình,đồng thời duy trì việc ăn uống như một trải
            nghiệm tích cực, tương tác.
          </p>
        </div>
        <div className="column">
          <h4
            className="bd-footer-title 
                 has-text-weight-medium 
                 has-text-justify has-text-primary mb-4"
          >
            Khám phá
          </h4>
          <p className="bd-footer-link">
            <a href="https://">
              <span className="icon-text has-text-black">
                <span>Trang chủ</span>
              </span>
            </a>
            <br />
            <a href="https://">
              <span className="icon-text has-text-black">
                <span>Thức ăn</span>
              </span>
            </a>
            <br />
            <a href="https://">
              <span className="icon-text has-text-black">
                <span>Thực đơn</span>
              </span>
            </a>
            <br />
            <a href="https://">
              <span className="icon-text has-text-black">
                <span>Kế hoạch</span>
              </span>
            </a>
          </p>
        </div>
        <div className="column">
          <h4
            className="bd-footer-title
                 has-text-weight-medium
                 has-text-justify has-text-primary mb-4"
          >
            Contact us
          </h4>
          <p className="bd-footer-link">
            <a href="https://">
              <span className="icon-text has-text-black">
                <span>Email: tudase151149@fpt.edu.vn</span>
              </span>
            </a>
            <br />
            <a href="https://">
              <span className="icon-text has-text-black">
                <span>Call Us: 0937550256</span>
              </span>
            </a>
            <br />
            <a href="https://">
              <span className="icon-text has-text-black">
                <span>Liên hệ với chúng tôi!</span>
              </span>
            </a>
            <br />
            <a href="https://">
              <span className="icon-text has-text-black">
                <span>Kết nối chuyên gia</span>
              </span>
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
