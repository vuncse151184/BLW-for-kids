import React, { useState } from "react";
import "./index.css";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useEffect } from "react";
import jwt_decode from "jwt-decode";
import chibi from "../../image/login-chibi.png";
import chibi1 from "../../image/login-chibi1.png";

const Login = () => {
  // const [phone, setPhone] = useState("");
  // const [pass, setPass] = useState("");
  // const baseUrl = `https://blw-api.azurewebsites.net/api/Customers/LoginPhone`;
  const navigate = useNavigate();
  const ggLogin = `https://blw-api.azurewebsites.net/api/Customers/LoginEmail`;

  const handleCredentialResponse = async (response) => {
    const decoded = jwt_decode(response.credential);
    console.log("decode :", decoded);
    const email = decoded.email;
    const googleSub = decoded.sub;
    const fullname = decoded.name;
    const avatar = decoded.picture;

    document.getElementById("buttonDiv").hidden = true;
    console.log({ email, googleSub, fullname, avatar });
    try {
      const response = await fetch(ggLogin, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, googleSub, fullname, avatar }),
      });

      if (response.ok) {
        const responseData = await response.json();
        localStorage.setItem("user", JSON.stringify(responseData));
        navigate("/");
        console.log("login data", responseData);
        console.log("response", response);
      } else {
        console.log("Đăng nhập thất bại!!!");
      }
    } catch (error) {
      console.error("Error calling API:", error);
    }
  };
  useEffect(() => {
    /* global google*/
    google.accounts.id.initialize({
      client_id:
        "1060634016056-mvcmc2tsnq3pd0giaviq410finp62pso.apps.googleusercontent.com",
      callback: handleCredentialResponse,
    });
    google.accounts.id.renderButton(document.getElementById("buttonDiv"), {
      theme: "outline",
      size: "large",
      width: "300px",
    });
    google.accounts.id.prompt();
  }, []);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await fetch(baseUrl, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ phone, password: pass }),
  //     });
  //     const dataLogin = await response.json();
  //     if (response.status === 400) {
  //       await Swal.fire({
  //         icon: "error",
  //         title: "Oops...",
  //         text: `${dataLogin.errorMessage}`,
  //       });
  //     } else if (response.ok) {
  //       localStorage.setItem("user", JSON.stringify(dataLogin));
  //       await Swal.fire({
  //         icon: "success",
  //         title: "Đăng nhập thành công",
  //       });
  //       navigate("/");
  //     }
  //   } catch (error) {
  //     console.error("Lỗi khi gửi yêu cầu đăng ký:", error);
  //   }
  // };

  return (
    <>
      <div className="login-grid">
        <div className="bg-image"></div>
        <div className="login-content">
          {/* <form style={{ marginTop: 50 }} onSubmit={handleSubmit}>
            <div>
              <h1 className="title" style={{ marginTop: 50 }}>
                Đăng Nhập
              </h1>
            </div>
            <div className="field" style={{ marginTop: 50 }}>
              <div className="control">
                <p style={{ marginBottom: 10 }}>Số diện thoại</p>
                <input
                  className="input is-primary"
                  type="tel"
                  pattern="[0-9]{10}"
                  placeholder="Ví dụ: 0937550256"
                  required
                  style={{ width: "400px", height: "50px" }}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>
            <div className="field">
              <div className="control">
                <p style={{ marginBottom: 10 }}>Mật khẩu</p>
                <input
                  className="input is-primary"
                  type="password"
                  placeholder="Nhập mật khẩu"
                  required
                  style={{ width: "400px", height: "50px" }}
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}
                />
              </div>
            </div>
            <div className="field" style={{ marginTop: 20 }}>
              <p className="control">
                <button className="button is-success">Đăng nhập</button>
              </p>
            </div>
            <div className="field" style={{ marginTop: 20 }}>
              <p>
                Bạn chưa có tài khoản? &nbsp;
                <Link to="/register">
                  <span className="has-text-primary">Đăng kí</span>
                </Link>
              </p>
            </div>
          </form> */}
          <div style={{ width: 400, position: "relative", marginTop: 20 }}>
            <div className="login-user">
              <h1 className="title is-1 has-text-primary">Đăng Nhập</h1>
              <p className="subtitle is-4" style={{ marginTop: 30 }}>
                Tự tin bắt đầu với{" "}
                <strong className="has-text-primary">BLW</strong> , nơi bé yêu
                <strong className="has-text-primary">
                  {" "}
                  tự do khám phá
                </strong>{" "}
                thế giới ẩm thực!
              </p>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: 30,
              }}
            >
              <div id="buttonDiv" style={{ width: 300 }}></div>
            </div>
            <p className="line-text-center">Hoặc</p>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: 30,
              }}
            >
              <button className="facebook-button" style={{ width: 300 }}>
                Đăng nhập với Facebook
              </button>
            </div>
            <img
              src={chibi}
              style={{ position: "absolute", top: 235, left: 90 }}
            />
            <img
              src={chibi1}
              style={{ position: "absolute", top: 235, right: 50 }}
            />
          </div>
          <div
            style={{
              zIndex: 1001,
              textAlign: "center",
              position: "absolute",
              bottom: 20,
            }}
          >
           <Link to='/blw-manager/login'>
              <button
                className="facebook-button"
                style={{ fontSize: "15px", width: 110 }}
              >
                Admin login
              </button>
            </Link>
          </div>

          {/* <div className="field">
              <div className="button-container">
                <button className="google-button">Đăng nhập với Google</button>
              </div>
            </div> */}
        </div>
      </div>
    </>
  );
};

export default Login;
