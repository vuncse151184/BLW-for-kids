import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faHeart,
  faMoneyCheck,
  faQuestionCircle,
} from "@fortawesome/free-solid-svg-icons";
import { Rating } from "@mui/material";
import img from "../../image/recipe2.jpg";
import "./index.css";
import CircularProgress from "@mui/material/CircularProgress";
import Swal from "sweetalert2";
import { format } from "date-fns";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import rabbit from "../../image/rabbit.gif";
import penguin from "../../image/penguin.gif";
import { useQuery } from "react-query";
import { useQueryClient } from "react-query";
import premium from "../../image/premium.png";
import { Link } from "react-router-dom";

const Profile = () => {
  const [active, setActive] = useState("account");
  const [dataAccount, setDataAccount] = useState([]);
  const [favorite, setFavorite] = useState([]);
  const [changeEmail, setChangeEmail] = useState(null);
  const [changePhone, setChangePhone] = useState(null);
  const [changeAvatar, setChangeAvatar] = useState(null);
  const [changeDateOfBirth, setChangeDateOfBirth] = useState(null);
  const [gender, setGender] = useState(1);
  const [fullname, setFullname] = useState("");
  const accountApi = `https://blw-api.azurewebsites.net/api/Customers/GetInfo`;
  const updateInfo = `https://blw-api.azurewebsites.net/api/Customers/UpdateInfo`;
  const favoriteUrl = `https://blw-api.azurewebsites.net/api/Favorite/GetAllRecipeFavorite`;
  const deleteFavoriteUrl = `https://blw-api.azurewebsites.net/api/Favorite/DeleteFavorite`;
  const user = JSON.parse(localStorage.getItem("user"));
  const queryClient = useQueryClient();

  const { data: dataFavorite, isLoading } = useQuery("favorite", () =>
    fetch(favoriteUrl, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user?.token}`,
      },
    }).then((response) => response.json())
  );

  console.log(user);

  const handleActive = (item) => {
    setActive(item);
  };

  const getAccountApi = () => {
    fetch(accountApi, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setDataAccount(data);
        setFullname(data?.data?.fullname || null);
        setChangeEmail(data?.data?.email || null);
        setChangeDateOfBirth(data?.data?.dateOfBirth || null);
        setChangePhone(data?.data?.phoneNum || null);
        setGender(data?.data?.gender || null);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  };

  const handleGenderChange = (value) => {
    setGender(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(updateInfo, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          email: changeEmail,
          fullname: fullname,
          avatar: changeAvatar,
          dateOfBirth: changeDateOfBirth,
          gender: gender,
          phoneNum: changePhone,
        }),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log("data cap nhat: ", responseData);
        await Swal.fire({
          icon: "success",
          title: "Cập nhật thành công",
        });
        getAccountApi();
      } else {
        console.log("Cập nhật thất bại!!!");
      }
    } catch (error) {
      console.error("Error calling API:", error);
    }
  };

  const handleDeleteFavorite = (id) => {
    Swal.fire({
      title: "Xác nhận!",
      text: "Bạn có chắc là sẽ xóa khỏi yêu thích!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Có",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`${deleteFavoriteUrl}?recipeId=${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
          })
          .then((data) => {
            Swal.fire(
              "Deleted!",
              "Đã xóa khỏi mục yêu thích thành công!",
              "success"
            );
            queryClient.invalidateQueries("favorite");
          })
          .catch((error) => {
            console.error("Error during fetch:", error);
          });
      }
    });
  };

  useEffect(() => {
    getAccountApi();
  }, []);

  return (
    <div className="container is-max-widescreen mt-5 mb-5">
      <div className="columns">
        <div className="settings-user">
          <div
            className="column is-one-quarter"
            style={{
              border: "2px solid hsl(171, 100%, 41%)",
              borderRadius: "10px",
              width: "267px",
              height: "300px",
            }}
          >
            <h4 className="title is-4">Thông tin tài khoản</h4>
            <ul>
              <li
                style={{
                  display: "flex",
                  cursor: "pointer",
                }}
                onClick={() => handleActive("account")}
              >
                <FontAwesomeIcon
                  icon={faUser}
                  size="lg"
                  className="has-text-primary"
                />
                <span
                  className="title is-5 pl-4"
                  style={{
                    color: active === "account" ? "hsl(171, 100%, 41%)" : "",
                  }}
                >
                  Tài khoản
                </span>
              </li>
              <hr className="is-divider mt-3 mb-3" />
              <li
                style={{
                  display: "flex",
                  cursor: "pointer",
                }}
                onClick={() => handleActive("favorite")}
              >
                <FontAwesomeIcon
                  icon={faHeart}
                  size="lg"
                  className="has-text-primary"
                />
                <span
                  className="title is-5 pl-4"
                  style={{
                    color: active === "favorite" ? "hsl(171, 100%, 41%)" : "",
                  }}
                >
                  Yêu thích
                </span>
              </li>
              <hr className="is-divider mt-3 mb-3" />
              <li
                style={{
                  display: "flex",
                  cursor: "pointer",
                }}
                onClick={() => handleActive("premium")}
              >
                <FontAwesomeIcon
                  icon={faMoneyCheck}
                  size="lg"
                  className="has-text-primary"
                />
                <span
                  className="title is-5 pl-4"
                  style={{
                    color: active === "premium" ? "hsl(171, 100%, 41%)" : "",
                  }}
                >
                  Gói cao cấp
                </span>
              </li>
              <hr className="is-divider mt-3 mb-3" />
              <a
                href="https://www.facebook.com/profile.php?id=100095496554189&mibextid=LQQJ4d"
                target="_blank"
                rel="noreferrer"
              >
                <li
                  style={{
                    display: "flex",
                    cursor: "pointer",
                  }}
                >
                  <FontAwesomeIcon
                    icon={faFacebook}
                    size="lg"
                    className="has-text-primary"
                  />
                  <span
                    className="title is-5 pl-4"
                    style={{
                      color: active === "contact" ? "hsl(171, 100%, 41%)" : "",
                    }}
                  >
                    Liên hệ
                  </span>
                </li>
              </a>

              {/* <hr className="is-divider mt-3 mb-3" />
            <li
              style={{
                display: "flex",
                cursor: "pointer",
              }}
              onClick={() => handleActive("setting")}
            >
              <FontAwesomeIcon
                icon={faCog}
                size="lg"
                className="has-text-primary"
              />
              <span
                className="title is-5 pl-4"
                style={{
                  color: active === "setting" ? "hsl(171, 100%, 41%)" : "",
                }}
              >
                Cài đặt
              </span>
            </li> */}
              <hr className="is-divider mt-3 mb-3" />
              <li
                style={{
                  display: "flex",
                  cursor: "pointer",
                }}
                onClick={() => handleActive("help")}
              >
                <FontAwesomeIcon
                  icon={faQuestionCircle}
                  size="lg"
                  className="has-text-primary"
                />
                <span
                  className="title is-5 pl-4"
                  style={{
                    color: active === "help" ? "hsl(171, 100%, 41%)" : "",
                  }}
                >
                  Trợ giúp & FAQS
                </span>
              </li>
            </ul>
          </div>
          {dataAccount.data && (
            <img
              src={rabbit}
              alt="#"
              style={{ position: "absolute", top: 350 }}
            />
          )}
        </div>

        <div>
          {active === "account" ? (
            !dataAccount.data ? (
              <div
                style={{
                  paddingLeft: 15,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginLeft: 300,
                  height: "50vh",
                }}
              >
                <CircularProgress />
              </div>
            ) : (
              <form
                style={{ paddingLeft: 150, position: "relative" }}
                onSubmit={handleSubmit}
              >
                <img
                  src={penguin}
                  alt="penguin"
                  style={{
                    position: "absolute",
                    width: 400,
                    left: 700,
                    top: 200,
                  }}
                />
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <h2 className="title is-2 mb-0">Thông tin cá nhân</h2>
                  &nbsp; &nbsp; &nbsp;
                  {user.data.isPremium && <img src={premium} alt="" />}
                </div>

                <h6 className="title is-6 mt-5">
                  Đây là chi tiết thông tin cá nhân của bạn vui lòng không chia
                  sẻ cho người lạ.
                </h6>
                <div className="field" style={{ width: 700 }}>
                  <label className="label">Tên tài khoản</label>
                  <div className="control">
                    <input
                      className="input"
                      type="text"
                      value={fullname}
                      required
                      onChange={(e) => setFullname(e.target.value)}
                    />
                  </div>
                </div>

                <div className="mt-5 mb-5">
                  <label>
                    <input
                      type="radio"
                      name="gender"
                      checked={gender === 1}
                      onChange={() => handleGenderChange(1)}
                    />
                    Nam
                  </label>
                  <label className="ml-5">
                    <input
                      type="radio"
                      name="gender"
                      checked={gender === 2}
                      onChange={() => handleGenderChange(2)}
                    />
                    Nữ
                  </label>
                </div>

                <div className="field" style={{ width: 700 }}>
                  <label className="label">Email</label>
                  <div className="control">
                    {dataAccount.data.email ? (
                      <input
                        className="input"
                        type="email"
                        value={dataAccount.data.email}
                        readOnly
                      />
                    ) : (
                      <input
                        className="input"
                        type="email"
                        value={changeEmail}
                        onChange={(e) => setChangeEmail(e.target.value)}
                      />
                    )}
                  </div>
                </div>

                <div className="field" style={{ width: 700 }}>
                  <label className="label">Ngày tháng năm sinh</label>
                  <div className="control">
                    <input
                      className="input"
                      type="date"
                      value={
                        dataAccount.data.dateOfBirth
                          ? format(new Date(changeDateOfBirth), "yyyy-MM-dd")
                          : changeDateOfBirth
                      }
                      onChange={(e) => setChangeDateOfBirth(e.target.value)}
                    />
                  </div>
                </div>

                <div className="field" style={{ width: 700 }}>
                  <label className="label">Số điện thoại</label>
                  <div className="control">
                    {dataAccount.data.phoneNum ? (
                      <input
                        className="input"
                        type="tel"
                        pattern="[0-9]{10}"
                        placeholder="e.g. 09XXXXXXX"
                        value={dataAccount.data.phoneNum}
                        readOnly
                      />
                    ) : (
                      <input
                        className="input"
                        type="tel"
                        pattern="[0-9]{10}"
                        value={changePhone}
                        placeholder="e.g. 09XXXXXXX"
                        onChange={(e) => setChangePhone(e.target.value)}
                      />
                    )}
                  </div>
                </div>
                <div className="buttons">
                  <button className="button is-primary">Save changes</button>
                  <button className="button is-link">Cancel</button>
                </div>
              </form>
            )
          ) : active === "favorite" ? (
            <div style={{ paddingLeft: 150 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <h2 className="title is-2 mb-0">Thực đơn yêu thích</h2>
                &nbsp; &nbsp; &nbsp;
                {user.data.isPremium && <img src={premium} alt="" />}
              </div>

              {dataFavorite?.data?.length === 0 ? (
                <h3 className="title is-3 mb-5" style={{ marginTop: 100 }}>
                  Bạn chưa có thực đơn
                  <Link to="/">
                    <strong className="has-text-primary"> yêu thích </strong>
                  </Link>
                  của mình
                </h3>
              ) : (
                <div
                  className="grid-container mt-5"
                  style={{
                    marginBottom: 20,
                  }}
                >
                  {dataFavorite?.data.map((favorite) => (
                    <div className="grid-item" key={favorite.recipeId}>
                      <div
                        className="card"
                        style={{ width: "300px", height: "350px" }}
                      >
                        <Link
                          to={`/recipe-detail/${favorite?.recipe?.recipeId}`}
                        >
                          <div className="card-image">
                            <figure className="image is-3by2">
                              <img
                                src={favorite?.recipe?.recipeImage}
                                alt="Placeholder"
                              />
                            </figure>
                          </div>
                        </Link>

                        <div className="card-content">
                          <div className="media">
                            <div className="media-content">
                              <Link
                                to={`/recipe-detail/${favorite?.recipe?.recipeId}`}
                              >
                                <p
                                  className="title is-5"
                                  style={{
                                    marginBottom: 10,
                                    width: "200px",
                                    height: "48px",
                                    overflow: "hidden",
                                  }}
                                >
                                  {favorite?.recipe?.recipeName}
                                </p>
                              </Link>
                              <Link
                                to={`/recipe-detail/${favorite?.recipe?.recipeId}`}
                              >
                                <div style={{ marginTop: 5 }}>
                                  <p className="title is-6">
                                    <strong className="subtitle is-6 has-text-primary">
                                      Ngày cập nhật:
                                    </strong>
                                    &nbsp;
                                    {new Date(
                                      favorite?.recipe?.updateTime
                                    ).toLocaleDateString()}
                                  </p>
                                </div>
                              </Link>

                              <div style={{ textAlign: "center" }}>
                                <button
                                  className="button is-warning is-light mt-2"
                                  onClick={() =>
                                    handleDeleteFavorite(favorite?.recipeId)
                                  }
                                >
                                  Remove recipe
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : active === "premium" ? (
            <>
              <img
                src={penguin}
                alt="penguin"
                style={{
                  position: "absolute",
                  width: 350,
                  left: 1080,
                  top: 200,
                }}
              />
              <div
                style={{ paddingLeft: 100, position: "relative", zIndex: 1000 }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <h2 className="title is-2 mb-0">Chi tiết gói</h2>
                  &nbsp; &nbsp; &nbsp;
                  {user.data.isPremium && <img src={premium} alt="" />}
                </div>
                <div className="notification is-primary is-light mt-5">
                  Bạn đã mua gói 365 ngày vào lúc <strong> 12h</strong> ngày
                  <strong> 17/9/2023</strong>, gói sẽ hết hạn vào lúc
                  <strong> 12h</strong> ngày <strong> 17/9/2024 </strong>
                </div>
                <h4 className="subtitle is-4">Lịch sử mua hàng</h4>
                <div className="table-container">
                  <table className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
                    <thead>
                      <tr>
                        <th>Ngày mua hàng</th>
                        <th>Thời gian mua</th>
                        <th>Tên gói</th>
                        <th>Mệnh giá</th>
                        <th>Ngày hết hạn</th>
                      </tr>
                    </thead>
                    <tfoot>
                      <tr>
                        <td>17/9/2023</td>
                        <td>12:59:100</td>
                        <td>Tên gói 1</td>
                        <td>90000 VNĐ</td>
                        <td>17/9/2024</td>
                      </tr>
                      <tr>
                        <td>17/9/2023</td>
                        <td>12:59:100</td>
                        <td>Tên gói 1</td>
                        <td>90000 VNĐ</td>
                        <td>17/9/2024</td>
                      </tr>
                      <tr>
                        <td>17/9/2023</td>
                        <td>12:59:100</td>
                        <td>Tên gói 1</td>
                        <td>90000 VNĐ</td>
                        <td>17/9/2024</td>
                      </tr>
                      <tr>
                        <td>17/9/2023</td>
                        <td>12:59:100</td>
                        <td>Tên gói 1</td>
                        <td>90000 VNĐ</td>
                        <td>17/9/2024</td>
                      </tr>
                      <tr>
                        <td>17/9/2023</td>
                        <td>12:59:100</td>
                        <td>Tên gói 1</td>
                        <td>90000 VNĐ</td>
                        <td>17/9/2024</td>
                      </tr>
                      <tr>
                        <td>17/9/2023</td>
                        <td>12:59:100</td>
                        <td>Tên gói 1</td>
                        <td>90000 VNĐ</td>
                        <td>17/9/2024</td>
                      </tr>
                      <tr>
                        <td>17/9/2023</td>
                        <td>12:59:100</td>
                        <td>Tên gói 1</td>
                        <td>90000 VNĐ</td>
                        <td>17/9/2024</td>
                      </tr>
                      <tr>
                        <td>17/9/2023</td>
                        <td>12:59:100</td>
                        <td>Tên gói 1</td>
                        <td>90000 VNĐ</td>
                        <td>17/9/2024</td>
                      </tr>
                      <tr>
                        <td>17/9/2023</td>
                        <td>12:59:100</td>
                        <td>Tên gói 1</td>
                        <td>90000 VNĐ</td>
                        <td>17/9/2024</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </>
          ) : active === "help" ? (
            <div style={{ paddingLeft: 100, marginBottom: 15 }}>
              <h2 className="title is-2 mb-5">
                Chính sách về BLW (baby led weaning)
              </h2>
              <p class="subtitle is-6 mt-5">
                Chế độ ăn{" "}
                <strong className="has-text-primary">
                  BLW (Baby-Led Weaning)
                </strong>{" "}
                là một phương pháp giúp bé tự học cách tự ăn và khám phá thức ăn
                bằng cách tự tay cầm và tự nắm, nếm thử thức ăn mà không cần
                dùng đũa hoặc thìa. Chế độ này thường bắt đầu khi bé đã đủ
                <strong className="has-text-primary"> 6 tháng tuổi</strong>, có
                khả năng ngồi đứng mà không cần hỗ trợ và có khả năng nuốt thức
                ăn.
              </p>
              <p class="subtitle is-5">
                Chính sách về chế độ ăn BLW có thể thay đổi tùy theo quốc gia
                hoặc tổ chức y tế.
              </p>
              <div style={{ paddingLeft: 15 }}>
                <ol type="1">
                  <li>
                    <strong className="has-text-primary title is-6">
                      Thời điểm bắt đầu:
                    </strong>
                    BLW thường bắt đầu từ 6 tháng tuổi trở lên, sau khi bé đã có
                    khả năng ngồi đứng độc lập và không có dấu hiệu dự đoán của
                    vấn đề sức khỏe nghiêm trọng.
                  </li>
                  <li className=" mt-3">
                    <strong className="has-text-primary title is-6">
                      Loại thức ăn:
                    </strong>
                    Bé có thể thử nhiều loại thức ăn, bao gồm thức ăn gia đình
                    được chuẩn bị dễ ăn và dễ nắm bằng tay.
                  </li>
                  <li className=" mt-3">
                    <strong className="has-text-primary title is-6">
                      An toàn:
                    </strong>
                    Đảm bảo rằng thức ăn được chuẩn bị an toàn cho bé, tránh các
                    loại thức ăn có nguy cơ nóng hoặc nghi ngờ về nguy cơ nghẹt
                    họng.
                  </li>
                  <li className=" mt-3">
                    <strong className="has-text-primary title is-6">
                      Giám sát:
                    </strong>
                    Luôn giám sát bé trong thời gian ăn và đảm bảo rằng bé có
                    thể nắm và nuốt thức ăn một cách an toàn.
                  </li>
                  <li className=" mt-3">
                    <strong className="has-text-primary title is-6">
                      Khuyến nghị về việc tiếp tục cho con bú:
                    </strong>
                    BLW không loại trừ việc cho con bú hoặc sử dụng sữa công
                    thức. Bé vẫn có thể được cho bú hoặc sữa công thức nhưng
                    thức ăn cố định cũng sẽ là một phần của chế độ ăn của bé.
                  </li>
                  <li className=" mt-3">
                    <strong className="has-text-primary title is-6">
                      Thời gian:
                    </strong>
                    Cho bé thời gian để khám phá và học cách ăn. Đừng ép bé ăn
                    hoặc gắn liền với việc phải ăn nhiều.
                  </li>
                  <li className=" mt-3">
                    <strong className="has-text-primary title is-6">
                      Tư vấn với bác sĩ hoặc chuyên gia dinh dưỡng:
                    </strong>
                    Trước khi bắt đầu BLW hoặc thay đổi chế độ ăn của bé, nên
                    thảo luận với bác sĩ hoặc chuyên gia dinh dưỡng để đảm bảo
                    rằng bé đủ điều kiện và có thể thực hiện chế độ ăn này một
                    cách an toàn và phù hợp.
                  </li>
                </ol>
              </div>
            </div>
          ) : (
            <h1>No</h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
