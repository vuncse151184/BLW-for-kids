import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./index.css";
import { useEffect } from "react";
import jwt_decode from "jwt-decode";
const Register = () => {
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const baseUrl = `https://blw-api.azurewebsites.net/api/Customers/RegisPhone`;
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
    });
    google.accounts.id.prompt();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(baseUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, phone, password }),
      });
      console.log("api tra ra kieu gi: ", response.headers.get("content-type"));
      if (response.status === 400) {
        const errorData = await response.json();
        await Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${errorData.errorMessage}`,
        });
      } else if (response.ok) {
        await Swal.fire({
          icon: "success",
          title: "Đăng nhập thành công",
        });
        navigate("/login");
      }
    } catch (error) {
      console.error("Lỗi khi gửi yêu cầu đăng ký:", error);
    }
  };
  return (
    <>
      <div className="register-grid">
        <div className="bg-image"></div>
        <div className="register-content">
          <form style={{ marginTop: 50 }} onSubmit={handleSubmit}>
            <div>
              <h1 className="title" style={{ marginTop: 50 }}>
                Đăng kí
              </h1>
            </div>
            <div className="field" style={{ marginTop: 50 }}>
              <div className="control">
                <p style={{ marginBottom: 10 }}>Tên người dùng</p>
                <input
                  className="input is-primary"
                  type="text"
                  placeholder="Nhập tên"
                  required
                  style={{ width: "400px", height: "50px" }}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>
            <div className="field">
              <div className="control">
                <p style={{ marginBottom: 10 }}>Số điện thoại</p>
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <div className="field" style={{ marginTop: 20 }}>
              <div className="control">
                <button className="button is-success">Đăng kí</button>
              </div>
            </div>
            <div className="field" style={{ marginTop: 20 }}>
              <p>
                Bạn đã có tài khoản? &nbsp;
                <Link to="/login">
                  <span className="has-text-primary">Đăng nhập</span>
                </Link>
              </p>
            </div>
            <div
              className="field"
              style={{
                textAlign: "center",
                marginTop: 20,
              }}
            >
              <p className="line-text-center">Hoặc</p>
            </div>

            <div style={{ display: "flex", justifyContent: "center" }}>
              <div id="buttonDiv"></div>
            </div>

            {/* <div className="field">
              <div className="button-container">
                <button className="google-button">Đăng nhập với Google</button>
              </div>
            </div> */}
            <div className="field">
              <div className="button-container">
                <button className="facebook-button">
                  Đăng nhập với Facebook
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
