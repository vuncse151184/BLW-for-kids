import React from "react";
import "./recipe.css";
import carrot from "../../image/carrot.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Rating } from "@mui/material";
import { useQuery } from "react-query";
import loadingGif from "../../image/Baby-Crawl-Cycle-unscreen.gif";
import Swal from "sweetalert2";
import { useQueryClient } from "react-query";
import vip from "../../image/premium-logo.png";
import { Link } from "react-router-dom";

const Recipe = () => {
  const recipeApi = `https://blw-api.azurewebsites.net/api/Recipe/LastUpdateRecipe`;
  const recommendRecipeApi = `https://blw-api.azurewebsites.net/api/Recipe/MostFavoriteRecipe`;
  const postFavoriteUrl = `https://blw-api.azurewebsites.net/api/Favorite/AddRecipeFavorite`;
  const deleteFavoriteUrl = `https://blw-api.azurewebsites.net/api/Favorite/DeleteFavorite`;
  const user = JSON.parse(localStorage.getItem("user"));
  const queryClient = useQueryClient();
  const { data: recipes, isLoading: loading } = useQuery("allRecipes", () =>
    fetch(recipeApi, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user?.token}`,
      },
    }).then((response) => response.json())
  );
  const { data: recommendRecipes, isLoading: recommendLoading } = useQuery(
    "recommendRecipes",
    () =>
      fetch(recommendRecipeApi, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
      }).then((response) => response.json())
  );

  const handleAddFavorite = (id) => {
    if (!user) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Đăng nhập để được thêm thực đơn vào yêu thích",
      });
    } else {
      fetch(postFavoriteUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          recipeId: id,
        }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Đã thêm vào yêu thích",
            showConfirmButton: true,
            footer: '<a href="/profile">Truy cập vào đây để xem chi tiết</a>',
          });
          queryClient.invalidateQueries("allRecipes");
          queryClient.invalidateQueries("recommendRecipes");
        })
        .catch((error) => {
          console.error("Error during fetch:", error);
        });
    }
  };

  const handleDeleteFavorite = async (id) => {
    await fetch(`${deleteFavoriteUrl}?recipeId=${id}`, {
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
        queryClient.invalidateQueries("allRecipes");
        queryClient.invalidateQueries("recommendRecipes");
      })
      .catch((error) => {
        console.error("Error during fetch:", error);
      });
  };

  return (
    <>
      <div style={{ marginBottom: 20 }}>
        <h4 className="title is-4" style={{ textAlign: "center" }}>
          Công thức được đề xuất trong tuần
        </h4>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Swiper
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            className="mySwiper"
            style={{ width: "1000px", height: "300px" }}
          >
            <SwiperSlide>
              <img src={carrot} alt="" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={carrot} alt="" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={carrot} alt="" />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>

      <div>
        <h4 className="title is-4" style={{ textAlign: "center" }}>
          Thực đơn được ưa chuộng nhiều nhất
        </h4>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {recommendLoading ? (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <img src={loadingGif} alt="loading-gif" />
            </div>
          ) : (
            <div className="grid-container-food">
              {recommendRecipes.data.map((recommendRecipe) => (
                <div className="grid-item-food" key={recommendRecipe.recipeId}>
                  <div
                    className="card"
                    style={{ width: "300px", height: "300px" }}
                  >
                    <Link to={`/recipe-detail/${recommendRecipe.recipeId}`}>
                      <div
                        className="card-image"
                        style={{ position: "relative" }}
                      >
                        <figure className="image is-3by2">
                          <img
                            src={recommendRecipe.recipeImage}
                            alt="Placeholder"
                          />
                        </figure>
                        {recommendRecipe.forPremium && (
                          <img
                            src={vip}
                            alt="vip"
                            style={{
                              width: "24px",
                              height: "24px",
                              position: "absolute",
                              top: 0,
                              right: 0,
                            }}
                          />
                        )}
                      </div>
                    </Link>

                    <div className="card-content p-5">
                      <div className="media">
                        <div className="media-content">
                          <p
                            className="title is-5"
                            style={{
                              marginBottom: 10,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                            }}
                          >
                            <span
                              style={{
                                width: "170px",
                                height: "23px",
                                overflow: "hidden",
                                color: "black",
                              }}
                            >
                              <Link
                                to={`/recipe-detail/${recommendRecipe.recipeId}`}
                                style={{
                                  color: "black",
                                }}
                              >
                                {recommendRecipe.recipeName}
                              </Link>
                            </span>

                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                              }}
                            >
                              {recommendRecipe.isFavorite && user ? (
                                <FontAwesomeIcon
                                  icon={faHeart}
                                  className="has-text-primary"
                                  onClick={() =>
                                    handleDeleteFavorite(
                                      recommendRecipe.recipeId
                                    )
                                  }
                                />
                              ) : (
                                <button
                                  className="button is-primary"
                                  style={{
                                    borderRadius: "50%",
                                    width: "10px",
                                    height: "30px",
                                  }}
                                  onClick={() =>
                                    handleAddFavorite(recommendRecipe.recipeId)
                                  }
                                >
                                  <FontAwesomeIcon icon={faHeart} />
                                </button>
                              )}
                              &nbsp;
                              <h6 className="title is-6 mb-0">
                                {recommendRecipe.totalFavorite}
                              </h6>
                            </div>
                          </p>
                          <Link
                            to={`/recipe-detail/${recommendRecipe.recipeId}`}
                          >
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                              }}
                            >
                              <Rating
                                name="half-rating-read"
                                defaultValue={recommendRecipe.aveRate}
                                precision={0.5}
                                readOnly
                                size="small"
                              />
                              &nbsp; &nbsp;
                              <span className="title is-6">
                                {recommendRecipe.aveRate}/5
                              </span>
                            </div>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="mt-5 mb-5">
        <h4 className="title is-4" style={{ textAlign: "center" }}>
          Thực đơn mới được cập nhật
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
            {loading ? (
              <div style={{ display: "flex", justifyContent: "center" }}>
                <img src={loadingGif} alt="loading-gif" />
              </div>
            ) : (
              <div className="grid-container-food">
                {recipes?.data?.map((recipe) => (
                  <div className="grid-item-food" key={recipe.recipeId}>
                    <div
                      className="card"
                      style={{ width: "300px", height: "380px" }}
                    >
                      <Link to={`/recipe-detail/${recipe.recipeId}`}>
                        <div
                          className="card-image"
                          style={{ position: "relative" }}
                        >
                          <figure className="image is-3by2">
                            <img src={recipe.recipeImage} alt="Placeholder" />
                          </figure>
                          {recipe.forPremium && (
                            <img
                              src={vip}
                              alt="vip"
                              style={{
                                width: "24px",
                                height: "24px",
                                position: "absolute",
                                top: 0,
                                right: 0,
                              }}
                            />
                          )}
                        </div>
                      </Link>

                      <div className="card-content">
                        <div className="media">
                          <div className="media-content">
                            <p
                              className="title is-5"
                              style={{
                                marginBottom: 10,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                              }}
                            >
                              <Link to={`/recipe-detail/${recipe.recipeId}`}>
                                <span
                                  style={{
                                    width: "160px",
                                    height: "23px",
                                    overflow: "hidden",
                                    color: "black",
                                  }}
                                >
                                  {recipe.recipeName}
                                </span>
                              </Link>

                              {recipe.isFavorite && user ? (
                                <FontAwesomeIcon
                                  icon={faHeart}
                                  className="has-text-primary"
                                  onClick={() =>
                                    handleDeleteFavorite(recipe.recipeId)
                                  }
                                />
                              ) : (
                                <button
                                  className="button is-primary"
                                  style={{
                                    borderRadius: "50%",
                                    width: "10px",
                                    height: "30px",
                                  }}
                                  onClick={() =>
                                    handleAddFavorite(recipe.recipeId)
                                  }
                                >
                                  <FontAwesomeIcon icon={faHeart} />
                                </button>
                              )}
                            </p>
                            <Link to={`/recipe-detail/${recipe.recipeId}`}>
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                <Rating
                                  name="half-rating-read"
                                  defaultValue={recipe.aveRate}
                                  precision={0.5}
                                  readOnly
                                  size="small"
                                />
                                &nbsp; &nbsp;
                                <span className="title is-6">
                                  {recipe.aveRate}/5
                                </span>
                              </div>
                              <p
                                className="title is-6 mb-4"
                                style={{ marginTop: 10 }}
                              >
                                <strong className="subtitle is-6 has-text-primary">
                                  Loại:
                                </strong>
                                &nbsp; {recipe.mealName}
                              </p>
                              <p
                                className="title is-6"
                                style={{ marginTop: 10 }}
                              >
                                <strong className="subtitle is-6 has-text-primary">
                                  Độ tuổi:
                                </strong>
                                &nbsp; {recipe.ageName}
                              </p>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Recipe;
