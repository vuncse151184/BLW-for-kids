import React from "react";
import "./home.css";
import "./home.scss";
import Rating from "@mui/material/Rating";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import home1 from "../../image/background.jpg";
import home2 from "../../image/layout3.jpg";
import home4 from "../../image/layout4.jpg";
import home3 from "../../image/layout5.jpg";
import { useQuery } from "react-query";
import loadingGif from "../../image/Baby-Crawl-Cycle-unscreen.gif";
import Swal from "sweetalert2";
import { useQueryClient } from "react-query";
import vip from "../../image/premium-logo.png";

const Home = ({ results, addFavorite, removeFavorite }) => {
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
          Authorization: `Bearer ${user?.token}`,
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
      <div style={{ marginBottom: "30px", marginTop: 20 }}>
        {results ? (
          <>
            <h4 className="title is-4" style={{ textAlign: "center" }}>
              Kết quả tìm kiếm
            </h4>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {results?.data?.length === 0 ? (
                <>
                  <h4
                    className="title is-4 text-center"
                    style={{ width: "1024px", height: "920px" }}
                  >
                    Không tìm thấy thực đơn phù hợp
                  </h4>
                </>
              ) : (
                <div style={{ width: "1024px", minHeight: "920px" }}>
                  <div className="grid-container">
                    {results?.data?.map((result) => (
                      <div className="grid-item" key={result.recipeId}>
                        <div
                          className="card"
                          style={{ width: "290px", height: "380px" }}
                        >
                          <div
                            className="card-image"
                            style={{ position: "relative" }}
                          >
                            <figure className="image is-3by2">
                              <img src={result.recipeImage} alt="Placeholder" />
                            </figure>
                            {result.forPremium && (
                              <img
                                src={vip}
                                alt="vip"
                                style={{
                                  position: "absolute",
                                  top: 0,
                                  right: 0,
                                }}
                              />
                            )}
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
                                    justifyContent: "space-between",
                                  }}
                                >
                                  <Link
                                    to={`/recipe-detail/${result.recipeId}`}
                                    style={{
                                      width: "190px",
                                      height: "24px",
                                      overflow: "hidden",
                                      color: "black",
                                    }}
                                  >
                                    <span>{result.recipeName}</span>
                                  </Link>
                                  {result.isFavorite && user ? (
                                    <FontAwesomeIcon
                                      icon={faHeart}
                                      className="has-text-primary"
                                      onClick={() =>
                                        removeFavorite(result.recipeId)
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
                                        addFavorite(result.recipeId)
                                      }
                                    >
                                      <FontAwesomeIcon icon={faHeart} />
                                    </button>
                                  )}
                                </p>
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                >
                                  <Rating
                                    name="half-rating-read"
                                    defaultValue={result.aveRate}
                                    precision={0.5}
                                    readOnly
                                    size="small"
                                  />
                                  &nbsp; &nbsp;
                                  <span className="title is-6">
                                    {result.aveRate}/5
                                  </span>
                                </div>
                                {/* <div style={{ marginTop: 5 }}>
                              <p className="title is-6">
                                <strong className="subtitle is-6 has-text-primary">
                                  Ngày cập nhật:
                                </strong>
                                &nbsp; 10/9/2023
                                {new Date(favor.updateTime).toLocaleDateString()}
                              </p>
                            </div> */}
                                <p
                                  className="title is-6 mb-4"
                                  style={{ marginTop: 10 }}
                                >
                                  <strong className="subtitle is-6 has-text-primary">
                                    Loại:
                                  </strong>
                                  &nbsp; {result.mealName}
                                </p>
                                <p
                                  className="title is-6"
                                  style={{ marginTop: 10 }}
                                >
                                  <strong className="subtitle is-6 has-text-primary">
                                    Độ tuổi:
                                  </strong>
                                  &nbsp; {result.ageName}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: "20px",
              }}
            >
              <article id="intro-card-welcome">
                <img
                  src={home2}
                  alt="Avatar wallpaper"
                  style={{ height: "400px" }}
                />
                {/* <div className="content-welcome">
                  <h1>Chào mừng các bạn đã đến với Baby Led Weaning</h1>
                  <div className="infos"></div>
                </div> */}
              </article>
            </div>

            <h4 className="title is-4" style={{ textAlign: "center" }}>
              Khám phá
            </h4>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div className="home-explore-container">
                <Link to="/recipe">
                  <figure className="home-explore">
                    <img
                      src={home1}
                      alt="Mountains"
                      style={{
                        width: "250px",
                        height: "300px",
                        objectFit: "cover",
                      }}
                    />
                    <figcaption className="home-explore-title">
                      Thực đơn
                    </figcaption>
                  </figure>
                </Link>
                <Link to="/plan">
                  <figure className="home-explore">
                    <img
                      src={home3}
                      alt="Mountains"
                      style={{
                        width: "250px",
                        height: "300px",
                        objectFit: "cover",
                      }}
                    />
                    <figcaption className="home-explore-title">
                      Kế hoạch
                    </figcaption>
                  </figure>
                </Link>
                <Link to="/list-expert">
                  <figure className="home-explore">
                    <img
                      src={home4}
                      alt="Mountains"
                      style={{
                        width: "250px",
                        height: "300px",
                        objectFit: "cover",
                      }}
                    />
                    <figcaption className="home-explore-title">
                      Chuyên gia
                    </figcaption>
                  </figure>
                </Link>
              </div>
            </div>
            <h4 className="title is-4" style={{ textAlign: "center" }}>
              Thực đơn được ưa chuộng nhất
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
                <div className="grid-container">
                  {recommendRecipes?.data
                    ?.slice(0, 3)
                    .map((recommendRecipe) => (
                      <div className="grid-item" key={recommendRecipe.recipeId}>
                        <div
                          className="card"
                          style={{ width: "290px", height: "370px" }}
                        >
                          <Link
                            to={`/recipe-detail/${recommendRecipe.recipeId}`}
                          >
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
                                  <Link
                                    to={`/recipe-detail/${recommendRecipe.recipeId}`}
                                    style={{
                                      width: "190px",
                                      height: "24px",
                                      overflow: "hidden",
                                      color: "black",
                                    }}
                                  >
                                    <span>{recommendRecipe.recipeName}</span>
                                  </Link>
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
                                          handleAddFavorite(
                                            recommendRecipe.recipeId
                                          )
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
                                    <span
                                      style={{ color: "black" }}
                                      className="title is-6"
                                    >
                                      {recommendRecipe.aveRate}/5
                                    </span>
                                  </div>
                                  <p
                                    className="title is-6 mb-4"
                                    style={{ marginTop: 10 }}
                                  >
                                    <strong className="subtitle is-6 has-text-primary">
                                      Loại:
                                    </strong>
                                    &nbsp; {recommendRecipe.mealName}
                                  </p>
                                  <p
                                    className="title is-6"
                                    style={{ marginTop: 10 }}
                                  >
                                    <strong className="subtitle is-6 has-text-primary">
                                      Độ tuổi:
                                    </strong>
                                    &nbsp; {recommendRecipe.ageName}
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
            <div style={{ textAlign: "center", marginTop: 30 }}>
              <Link to="/recipe" className="has-text-primary title is-4">
                Xem tất cả
              </Link>
            </div>
            <div style={{ marginBottom: "30px", marginTop: 20 }}>
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
                {loading ? (
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <img src={loadingGif} alt="loading-gif" />
                  </div>
                ) : (
                  <div className="grid-container">
                    {recipes?.data?.slice(0, 3).map((recipe) => (
                      <div className="grid-item" key={recipe.recipeId}>
                        <div
                          className="card"
                          style={{ width: "290px", height: "380px" }}
                        >
                          <Link to={`/recipe-detail/${recipe.recipeId}`}>
                            <div
                              className="card-image"
                              style={{ position: "relative" }}
                            >
                              <figure className="image is-3by2">
                                <img
                                  src={recipe.recipeImage}
                                  alt="Placeholder"
                                />
                              </figure>
                              {recipe.forPremium && (
                                <img
                                  src={vip}
                                  alt="vip"
                                  style={{
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
                                  <Link
                                    to={`/recipe-detail/${recipe.recipeId}`}
                                    style={{
                                      width: "190px",
                                      height: "24px",
                                      overflow: "hidden",
                                      color: "black",
                                    }}
                                  >
                                    <span>{recipe.recipeName}</span>
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
                                  {/* <div style={{ marginTop: 5 }}>
                              <p className="title is-6">
                                <strong className="subtitle is-6 has-text-primary">
                                  Ngày cập nhật:
                                </strong>
                                &nbsp; 10/9/2023
                                {new Date(favor.updateTime).toLocaleDateString()}
                              </p>
                            </div> */}
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
            <div style={{ textAlign: "center", marginBottom: 10 }}>
              <Link to="/recipe" className="has-text-primary title is-4">
                Xem tất cả
              </Link>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Home;
