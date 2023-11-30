import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./index.css";
import "./index.scss";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import { Box, styled } from "@mui/system";
import { Modal } from "@mui/base/Modal";
import Fade from "@mui/material/Fade";
import Grid from "@mui/material/Grid";
import momoLogo from "../../image/png/momo_icon_square_pinkbg@3x.png";
import { useQuery } from "react-query";
import { QueryClient } from "react-query";
import Swal from "sweetalert2";
import CircularProgress from "@mui/material/CircularProgress";
// function decodeBase64(base64String) {
//     const bytes = base64js.toByteArray(base64String);
//     const decodedString = new TextDecoder('utf-8').decode(new Uint8Array(bytes));
//     return decodedString;
// }
const PremiumPack = () => {
  //-------------------Authenticate-----------------------------
  const user = JSON.parse(localStorage.getItem("user"));
  const accessToken = user?.token;
  const [data, setData] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedPack, setSelectedPack] = useState("");
  const handleOpen = async (id) => {
    if (user) {
      setOpen(true);
      const paymentURL = `https://blw-api.azurewebsites.net/api/Payments/Get?id=${id}`;
      const response = await fetch(paymentURL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch payment data");
      }
      const data = await response.json();
      setData(data);
      console.log(data);
      return data;
    } else {
      Swal.fire({
        title:
          '<div> <strong style="font-family:Nunito">Bạn chưa đăng nhập !</strong></div>',
        icon: "info",
        html: '<a style="font-family:Nunito; text-decoration: underline; color:#00d1b2 " href="/login" >ĐĂNG NHẬP NGAY &nbsp;<i class="fa-solid fa-arrow-right"></i></a>',
        showCloseButton: true,
        showCancelButton: false,
        showConfirmButton: false,
      });
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handlePayment = async (packId, privateCode) => {
    Swal.fire({
      icon: "question",
      title: "Bạn đã nhập mã ",
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: "Đồng ý",
      cancelButtonText: "Không",
    }).then(async (result) => {
      if (result.isConfirmed) {
        console.log("select pack", packId);
        console.log("code", privateCode);
        const createPaymentURL = `https://blw-api.azurewebsites.net/api/Payments/CreatePayment?packageId=${packId}&privateCode=${privateCode}`;

        const response = await fetch(createPaymentURL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        });
        if (response.ok) {
          handleClose();
          Swal.fire({
            icon: "success",
            title: "Vui lòng đợi thanh toán của bạn được chấp nhận",
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Thanh toán không thành công",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }
    });
  };
  return (
    <>
      <div
        style={{
          width: "100%",
          backgroundColor: "#eeeeee",
          paddingLeft: "-200px",
          minHeight: "800px",
        }}
      >
        <div className="pack-container">
          <div className="pack-header">
            <h1 className="pack-heading">Tham gia hội viên ngay</h1>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              paddingBottom: "20px",
            }}
          >
            <div className="pack-table" style={{ width: "700px" }}>
              <table className="table is-striped ">
                <thead>
                  <tr>
                    <th style={{ textAlign: "center" }}>
                      Quyền lợi thành viên
                    </th>
                    <th style={{ textAlign: "center" }}>Miễn phí</th>
                    <th style={{ textAlign: "center" }}>Hội viên</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Bỏ Qua Quảng Cáo</td>
                    <td>-</td>
                    <td>
                      <FontAwesomeIcon
                        icon={faCheck}
                        style={{
                          fontSize: "1.3rem",
                          color: " #33c4b6",
                          marginRight: "3px",
                        }}
                      />
                    </td>
                  </tr>

                  <tr>
                    <td> 300+ thực đơn cho bé</td>
                    <td>-</td>
                    <td>
                      <FontAwesomeIcon
                        icon={faCheck}
                        style={{
                          fontSize: "1.3rem",
                          color: " #33c4b6",
                          marginRight: "3px",
                        }}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Lên thực đơn cho bữa ăn</td>
                    <td>-</td>
                    <td>
                      <FontAwesomeIcon
                        icon={faCheck}
                        style={{
                          fontSize: "1.3rem",
                          color: " #33c4b6",
                          marginRight: "3px",
                        }}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            {user?.data.isPremium ? (
              <div
                className="package-1"
                onClick={(newValue) => {
                  newValue = "175c31954b1c496b9ffc";
                  handleOpen(newValue);
                  setSelectedPack("175c31954b1c496b9ffc");
                }}
              >
                <div className="name">Gói tháng</div>
                <div className="price-for-month">49.000đ</div>
                <div className="trial">Sau tháng đầu tiên 120.000đ</div>
                <hr />
              </div>
            ) : (
              <div
                className="package-1"
                onClick={(newValue) => {
                  newValue = "175c31954b1c496b9ffc";
                  handleOpen(newValue);
                  setSelectedPack("175c31954b1c496b9ffc");
                }}
              >
                <div className="name">Gói tháng</div>
                <div className="price-for-month">49.000đ</div>
                <div className="trial">Sau tháng đầu tiên 120.000đ</div>
                <hr />
              </div>
            )}

            <div
              className="package-2"
              onClick={(newValue) => {
                newValue = "0badbceb37a54cba83e7";
                handleOpen(newValue);
                setSelectedPack("0badbceb37a54cba83e7");
              }}
            >
              <div className="name">Gói nửa năm</div>
              <div className="price-for-6-month">499.000đ</div>
              <div className="trial">7 ngày dùng thử miễn phí</div>
              <hr />
            </div>
          </div>
        </div>
      </div>

      <div>
        <StyledModal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
          slots={{ backdrop: StyledBackdrop }}
        >
          <Fade in={open}>
            <Box sx={style}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  paddingBottom: "10px",
                }}
              >
                <img
                  style={{ width: 32, height: 32 }}
                  src={momoLogo}
                  alt=""
                ></img>
                <div
                  style={{
                    width: "500px",
                    margin: "auto 0",
                    paddingLeft: "20px",
                  }}
                >
                  <h2 id="transition-modal-title">Thanh toán bằng ví MoMo</h2>
                </div>
                <hr />
              </div>

              <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                  <Grid item xs={6} md={5}>
                    <div
                      style={{
                        height: "auto",
                        maxWidth: 250,
                        width: "100%",
                        paddingTop: "50px",
                      }}
                    >
                      {data ? (
                        <>
                          <img
                            src={`data:image/jpeg;base64,${data.imageQR.fileContents}`}
                          />
                          <div
                            className="step-description"
                            style={{ alignItems: "center", paddingTop: "30px" }}
                          >
                            <p>
                              Mã của bạn là<b> {data?.privateCode}</b>{" "}
                            </p>
                          </div>
                        </>
                      ) : (
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignContent: "center",
                          }}
                        >
                          <CircularProgress />
                        </Box>
                      )}
                    </div>
                  </Grid>
                  <Grid item xs={6} md={7}>
                    <h4
                      style={{
                        margin: "0px 0px 20px",
                        fontSize: "20px",
                        fontWeight: 500,
                        color: "rgb(36, 36, 36)",
                      }}
                    >
                      Quét mã QR để thanh toán
                    </h4>
                    <div className="step-description">
                      <span className="step-number">1</span>
                      <p>
                        Mở <b>ứng dụng MoMo</b> trên điện thoại
                      </p>
                    </div>
                    <div className="step-description">
                      <span className="step-number">2</span>
                      <p>
                        Trên MoMo, chọn biểu tượng
                        <img
                          style={{ margin: "0 5px", width: 24, height: 24 }}
                          src="https://salt.tikicdn.com/ts/upload/03/74/d4/01670f7f9e6a3c86583939eb2494e9cf.png"
                          alt="icon"
                        ></img>
                        <b>Quét mã QR</b>
                      </p>
                    </div>

                    <div
                      className="step-description"
                      style={{ alignItems: "center" }}
                    >
                      <span className="step-number">3</span>
                      <p>
                        Quét mã QR và nhập nội dung chuyển tiền{" "}
                        <b> {data?.privateCode}</b>
                      </p>
                    </div>
                    <div
                      className="step-description"
                      style={{ alignItems: "center" }}
                    >
                      <span className="step-number">4</span>
                      <p>Hoàn tất thanh toán và chọn "tôi đã thanh toán"</p>
                    </div>
                  </Grid>

                  <button
                    className="button is-success"
                    style={{
                      position: "absolute",
                      bottom: "50px",
                      right: "50px",
                      color: "white",
                      border: "none",
                      padding: "10px 20px",
                      borderRadius: "15px",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      handlePayment(selectedPack, data.privateCode);
                    }}
                  >
                    Tôi đã thanh toán
                  </button>
                </Grid>
              </Box>
            </Box>
          </Fade>
        </StyledModal>
      </div>
    </>
  );
};

export default PremiumPack;
const Backdrop = React.forwardRef((props, ref) => {
  const { open, ...other } = props;
  return (
    <Fade in={open}>
      <div ref={ref} {...other} />
    </Fade>
  );
});

Backdrop.propTypes = {
  open: PropTypes.bool,
};

const StyledModal = styled(Modal)`
  position: fixed;
  z-index: 1300;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledBackdrop = styled(Backdrop)`
  z-index: -1;
  position: fixed;
  inset: 0;
  background-color: rgb(0 0 0 / 0.5);
  -webkit-tap-highlight-color: transparent;
`;

const style = (theme) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 900,
  height: 500,
  borderRadius: "12px",
  padding: "16px 32px 24px 32px",
  backgroundColor: theme.palette.mode === "dark" ? "#0A1929" : "white",
  boxShadow: `0px 2px 24px ${
    theme.palette.mode === "dark" ? "#000" : "#383838"
  }`,
});
