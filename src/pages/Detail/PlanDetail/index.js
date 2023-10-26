import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import { Rating } from "@mui/material";
import img from "../../../image/recipe1.jpg";
import "./index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReceipt } from "@fortawesome/free-solid-svg-icons";
const PlanDetail = () => {
  const [buttonDate, setButtonDate] = useState(true);
  const [buttonWeek, setButtonWeek] = useState(false);
  const [planDetail, setPlanDetail] = useState({
    1: [
      {
        id: 1,
        recipe: "Thức ăn 1",
        isBreak: true,
      },
      {
        id: 2,
        recipe: "Thức ăn 2",
        isSnack: true,
      },
      {
        id: 2,
        recipe: "Thức ăn 2",
        isBreak: true,
      },
    ],
    2: [
      {
        id: 3,
        recipe: "Thức ăn 3",
        isLunch: true,
      },
      {
        id: 4,
        recipe: "Thức ăn 4",
        isEvening: true,
      },
    ],
    3: [
      {
        id: 5,
        recipe: "Thức ăn 5",
        isBreak: true,
      },
      {
        id: 6,
        recipe: "Thức ăn 6",
        isLunch: true,
      },
    ],
    4: [
      {
        id: 7,
        recipe: "Thức ăn 7",
        isBreak: true,
      },
      {
        id: 8,
        recipe: "Thức ăn 8",
        isLunch: true,
      },
    ],
    5: [
      {
        id: 9,
        recipe: "Thức ăn 9",
        isBreak: true,
      },
      {
        id: 10,
        recipe: "Thức ăn 10",
        isLunch: true,
      },
    ],
    6: [
      {
        id: 11,
        recipe: "Thức ăn 11",
        isBreak: true,
      },
      {
        id: 12,
        recipe: "Thức ăn 12",
        isLunch: true,
      },
    ],
    7: [
      {
        id: 13,
        recipe: "Thức ăn 13",
        isEvening: true,
      },
      {
        id: 14,
        recipe: "Thức ăn 14",
        isLunch: true,
      },
    ],
    8: [
      {
        id: 15,
        recipe: "Thức ăn 15",
        isBreak: true,
      },
      {
        id: 16,
        recipe: "Thức ăn 16",
        isEvening: true,
      },
    ],
  });

  const itemsPerPage = 7;
  const pageCount = Object.keys(planDetail).length;
  const [currentPage, setCurrentPage] = useState(0);
  const [currentWeekPage, setCurrentWeekPage] = useState(0);
  const currentDate = Object.keys(planDetail)[currentPage];
  const currentItems = planDetail[currentDate];
  const currentWeekStartIndex = currentWeekPage * itemsPerPage;
  const currentWeekEndIndex = currentWeekStartIndex + itemsPerPage;
  const currentBreakfastItems = currentItems.filter((item) => item.isBreak);
  const currentLunchItems = currentItems.filter((item) => item.isLunch);
  const currentSnackItems = currentItems.filter((item) => item.isSnack);
  const currentEveningItems = currentItems.filter((item) => item.isEvening);
  const currentWeekDates = Object.keys(planDetail).slice(
    currentWeekStartIndex,
    currentWeekEndIndex
  );
  const currentWeekItems = currentWeekDates.flatMap(
    (date) => planDetail[date] || []
  );

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handleWeeklyPageClick = ({ selected }) => {
    setCurrentWeekPage(selected);
  };

  const calculateWeekPageCount = () => {
    const daysPerPage = 7;
    return Math.ceil(pageCount / daysPerPage);
  };
  const currentWeekNumber = Math.floor(currentWeekPage) + 1;

  const handleChangeDate = () => {
    setButtonDate(true);
    setButtonWeek(false);
  };
  const handleChangeWeek = () => {
    setButtonDate(false);
    setButtonWeek(true);
  };

  return (
    <div className="container is-widescreen">
      <h3 className="title is-3 mb-5" style={{ textAlign: "center" }}>
        Kế hoạch chi tiết cho 6 tháng - 30 ngày đầu tiên
      </h3>
      <div
        style={{
          textAlign: "center",
        }}
      >
        <button
          className="button is-primary"
          style={{ borderRadius: "10px", width: 150, marginRight: 20 }}
          onClick={handleChangeDate}
        >
          Ngày
        </button>
        <button
          className="button is-primary"
          style={{ borderRadius: "10px", width: 150, marginLeft: 20 }}
          onClick={handleChangeWeek}
        >
          Tuần
        </button>
      </div>
      {buttonDate && (
        <>
          <div style={{ marginTop: 30 }}>
            <div
              style={{
                width: 600,
                margin: "0 auto",
                textAlign: "center",
              }}
            >
              <ReactPaginate
                pageCount={pageCount}
                onPageChange={handlePageClick}
                containerClassName={"pagination-tu"}
                activeClassName={"active"}
              />
            </div>
          </div>

          <div className="mt-5 mb-5">
            <h4 className="title is-4" style={{ textAlign: "center" }}>
              Buổi sáng
            </h4>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div className="grid-container-planDetail">
                {currentBreakfastItems.length === 0 ? (
                  <>
                    <div className="grid-item-planDetail"></div>
                    <div className="grid-item-planDetail">
                      <div
                        className="notification is-primary is-light"
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          height: "100%",
                        }}
                      >
                        Kế hoạch cho buổi sáng không khả dụng cho ngày này!!!
                      </div>
                    </div>
                  </>
                ) : (
                  currentBreakfastItems.map((item) => (
                    <div className="grid-item-planDetail">
                      <div
                        className="card"
                        style={{ width: "300px", height: "320px" }}
                      >
                        <div className="card-image">
                          <figure className="image is-3by2">
                            <img src={img} alt="Placeholder" />
                          </figure>
                        </div>
                        <div className="card-content">
                          <div className="media">
                            <div className="media-content">
                              <p
                                className="title is-5"
                                style={{
                                  marginBottom: 10,
                                  display: "flex",
                                  alignItems: "center",
                                  width: "160px",
                                  height: "23px",
                                  overflow: "hidden",
                                }}
                              >
                                Thực đơn 1
                              </p>
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                <Rating
                                  name="half-rating-read"
                                  defaultValue={4.5}
                                  precision={0.5}
                                  readOnly
                                  size="small"
                                />
                                &nbsp; &nbsp;
                                <span>4.5/5</span>
                              </div>
                              <div style={{ marginTop: 5 }}>
                                <p>Ngày cập nhật: 10/9/2023</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
          <div className="mt-5 mb-5">
            <h4 className="title is-4" style={{ textAlign: "center" }}>
              Buổi trưa
            </h4>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div className="grid-container-planDetail">
                  {currentLunchItems.length === 0 ? (
                    <>
                      <div className="grid-item-planDetail"></div>
                      <div className="grid-item-planDetail">
                        <div
                          className="notification is-primary is-light"
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "100%",
                          }}
                        >
                          Kế hoạch cho buổi trưa không khả dụng cho ngày này!!!
                        </div>
                      </div>
                    </>
                  ) : (
                    currentLunchItems.map((item) => (
                      <div className="grid-item-planDetail">
                        <div
                          className="card"
                          style={{ width: "300px", height: "320px" }}
                        >
                          <div className="card-image">
                            <figure className="image is-3by2">
                              <img src={img} alt="Placeholder" />
                            </figure>
                          </div>
                          <div className="card-content">
                            <div className="media">
                              <div className="media-content">
                                <p
                                  className="title is-5"
                                  style={{
                                    marginBottom: 10,
                                    display: "flex",
                                    alignItems: "center",
                                    width: "160px",
                                    height: "23px",
                                    overflow: "hidden",
                                  }}
                                >
                                  Thực đơn 1
                                </p>
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                >
                                  <Rating
                                    name="half-rating-read"
                                    defaultValue={4.5}
                                    precision={0.5}
                                    readOnly
                                    size="small"
                                  />
                                  &nbsp; &nbsp;
                                  <span>4.5/5</span>
                                </div>
                                <div style={{ marginTop: 5 }}>
                                  <p>Ngày cập nhật: 10/9/2023</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="mt-5 mb-5">
            <h4 className="title is-4" style={{ textAlign: "center" }}>
              Ăn xế chiều
            </h4>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div className="grid-container-planDetail">
                  {currentSnackItems.length === 0 ? (
                    <>
                      <div className="grid-item-planDetail"></div>
                      <div className="grid-item-planDetail">
                        <div
                          className="notification is-primary is-light"
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "100%",
                          }}
                        >
                          Kế hoạch ăn xế chiều không khả dụng cho ngày này!!!
                        </div>
                      </div>
                    </>
                  ) : (
                    currentSnackItems.map((item) => (
                      <div className="grid-item-planDetail">
                        <div
                          className="card"
                          style={{ width: "300px", height: "320px" }}
                        >
                          <div className="card-image">
                            <figure className="image is-3by2">
                              <img src={img} alt="Placeholder" />
                            </figure>
                          </div>
                          <div className="card-content">
                            <div className="media">
                              <div className="media-content">
                                <p
                                  className="title is-5"
                                  style={{
                                    marginBottom: 10,
                                    display: "flex",
                                    alignItems: "center",
                                    width: "160px",
                                    height: "23px",
                                    overflow: "hidden",
                                  }}
                                >
                                  Thực đơn 1
                                </p>
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                >
                                  <Rating
                                    name="half-rating-read"
                                    defaultValue={4.5}
                                    precision={0.5}
                                    readOnly
                                    size="small"
                                  />
                                  &nbsp; &nbsp;
                                  <span>4.5/5</span>
                                </div>
                                <div style={{ marginTop: 5 }}>
                                  <p>Ngày cập nhật: 10/9/2023</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="mt-5 mb-5">
            <h4 className="title is-4" style={{ textAlign: "center" }}>
              Buổi Tối
            </h4>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div className="grid-container-planDetail">
                  {currentEveningItems.length === 0 ? (
                    <>
                      <div className="grid-item-planDetail"></div>
                      <div className="grid-item-planDetail">
                        <div
                          className="notification is-primary is-light"
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "100%",
                          }}
                        >
                          Kế hoạch cho buổi tối không khả dụng cho ngày này!!!
                        </div>
                      </div>
                    </>
                  ) : (
                    currentEveningItems.map((item) => (
                      <div className="grid-item-planDetail">
                        <div
                          className="card"
                          style={{ width: "300px", height: "320px" }}
                        >
                          <div className="card-image">
                            <figure className="image is-3by2">
                              <img src={img} alt="Placeholder" />
                            </figure>
                          </div>
                          <div className="card-content">
                            <div className="media">
                              <div className="media-content">
                                <p
                                  className="title is-5"
                                  style={{
                                    marginBottom: 10,
                                    display: "flex",
                                    alignItems: "center",
                                    width: "160px",
                                    height: "23px",
                                    overflow: "hidden",
                                  }}
                                >
                                  Thực đơn 1
                                </p>
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                >
                                  <Rating
                                    name="half-rating-read"
                                    defaultValue={4.5}
                                    precision={0.5}
                                    readOnly
                                    size="small"
                                  />
                                  &nbsp; &nbsp;
                                  <span>4.5/5</span>
                                </div>
                                <div style={{ marginTop: 5 }}>
                                  <p>Ngày cập nhật: 10/9/2023</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {buttonWeek && (
        <>
          <div style={{ marginTop: 30 }}>
            <div
              style={{
                width: 600,
                margin: "0 auto",
                textAlign: "center",
              }}
            >
              <ReactPaginate
                pageCount={calculateWeekPageCount()}
                onPageChange={handleWeeklyPageClick}
                containerClassName={"pagination-tu"}
                activeClassName={"active"}
              />
            </div>
          </div>
          <div style={{ width: 1000 }}>
            <h2
              className="title is-2 mt-5"
              style={{ textAlign: "center", marginTop: 20, marginBottom: 20 }}
            >
              Tuần {currentWeekNumber}
            </h2>
            {currentWeekDates.map((date) => (
              <>
                <h2 className="title is-2" key={date}>
                  Ngày {date}
                </h2>
                {planDetail[date].map((item) => (
                  <>
                    {item.isBreak && (
                      <article
                        className="message is-primary"
                        key={item.id}
                        style={{ width: 800, margin: "20px auto" }}
                      >
                        <div className="message-body" style={{ padding: 0 }}>
                          <div style={{ display: "flex" }}>
                            <img
                              src={img}
                              alt=""
                              style={{ width: 100, height: 80 }}
                            />
                            <div
                              style={{
                                paddingLeft: 50,
                                display: "flex",
                                alignItems: "center",
                              }}
                            >
                              <h5
                                className="title is-5 mb-0"
                                style={{ margin: 0, width: 100 }}
                              >
                                Buổi sáng:
                              </h5>

                              <p
                                className="subtitle is-5 ml-5"
                                style={{
                                  width: 300,
                                  height: 25,
                                  overflow: "hidden",
                                  marginTop: 1,
                                }}
                              >
                                {item.recipe}
                              </p>
                            </div>
                            <FontAwesomeIcon
                              icon={faReceipt}
                              size="lg"
                              style={{
                                width: 80,
                                height: 40,
                                marginLeft: 140,
                                marginTop: 20,
                              }}
                            />
                          </div>
                        </div>
                      </article>
                    )}
                    {item.isLunch && (
                      <article
                        className="message is-primary"
                        key={item.id}
                        style={{ width: 800, margin: "20px auto" }}
                      >
                        <div className="message-body" style={{ padding: 0 }}>
                          <div style={{ display: "flex" }}>
                            <img
                              src={img}
                              alt=""
                              style={{ width: 100, height: 80 }}
                            />
                            <div
                              style={{
                                paddingLeft: 50,
                                display: "flex",
                                alignItems: "center",
                              }}
                            >
                              <div style={{ width: "473" }}>
                                <h5
                                  className="title is-5 mb-0"
                                  style={{ margin: 0, width: 100 }}
                                >
                                  Buổi trưa :
                                </h5>
                              </div>
                              <p
                                className="subtitle is-5 ml-5"
                                style={{
                                  width: 300,
                                  height: 25,
                                  overflow: "hidden",
                                  marginTop: 1,
                                }}
                              >
                                {item.recipe}
                              </p>
                            </div>
                            <FontAwesomeIcon
                              icon={faReceipt}
                              size="lg"
                              style={{
                                width: 80,
                                height: 40,
                                marginLeft: 140,
                                marginTop: 20,
                              }}
                            />
                          </div>
                        </div>
                      </article>
                    )}
                    {item.isEvening && (
                      <article
                        className="message is-primary"
                        key={item.id}
                        style={{ width: 800, margin: "20px auto" }}
                      >
                        <div className="message-body" style={{ padding: 0 }}>
                          <div style={{ display: "flex" }}>
                            <img
                              src={img}
                              alt=""
                              style={{ width: 100, height: 80 }}
                            />
                            <div
                              style={{
                                paddingLeft: 50,
                                display: "flex",
                                alignItems: "center",
                              }}
                            >
                              <div style={{ width: "473" }}>
                                <h5
                                  className="title is-5 mb-0"
                                  style={{ margin: 0, width: 100 }}
                                >
                                  Buổi tối :
                                </h5>
                              </div>
                              <p
                                className="subtitle is-5 ml-5"
                                style={{
                                  width: 300,
                                  height: 25,
                                  overflow: "hidden",
                                  marginTop: 1,
                                }}
                              >
                                {item.recipe}
                              </p>
                            </div>
                            <FontAwesomeIcon
                              icon={faReceipt}
                              size="lg"
                              style={{
                                width: 80,
                                height: 40,
                                marginLeft: 140,
                                marginTop: 20,
                              }}
                            />
                          </div>
                        </div>
                      </article>
                    )}
                    {item.isSnack && (
                      <article
                        className="message is-primary"
                        key={item.id}
                        style={{ width: 800, margin: "20px auto" }}
                      >
                        <div className="message-body" style={{ padding: 0 }}>
                          <div style={{ display: "flex" }}>
                            <img
                              src={img}
                              alt=""
                              style={{ width: 100, height: 80 }}
                            />
                            <div
                              style={{
                                paddingLeft: 50,
                                display: "flex",
                                alignItems: "center",
                              }}
                            >
                              <div style={{ width: "473" }}>
                                <h5
                                  className="title is-5"
                                  style={{ margin: 0, width: 100 }}
                                >
                                  Snack :
                                </h5>
                              </div>
                              <p
                                className="subtitle is-5 ml-5"
                                style={{
                                  width: 300,
                                  height: 25,
                                  overflow: "hidden",
                                  marginTop: 1,
                                }}
                              >
                                {item.recipe}
                              </p>
                            </div>
                            <FontAwesomeIcon
                              icon={faReceipt}
                              size="lg"
                              style={{
                                width: 80,
                                height: 40,
                                marginLeft: 140,
                                marginTop: 20,
                              }}
                            />
                          </div>
                        </div>
                      </article>
                    )}
                  </>
                ))}
              </>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default PlanDetail;
