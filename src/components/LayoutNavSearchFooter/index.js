import React from "react";
import Navbar from "../Navbar";
import Search from "../Search";
import Footer from "../Footer";
import "./index.css";
import Advertisement from "../Advertisement";
import Filter from "../Filter";
import { useState } from "react";
import Swal from "sweetalert2";

const LayoutNavSearchFooter = ({ children }) => {
  const [search, setSearch] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState([""]);
  const [meal, setMeal] = useState([""]);
  const [rate, setRate] = useState(0);

  const user = JSON.parse(localStorage.getItem("user"));

  const searchApi = `https://blw-api.azurewebsites.net/api/Recipe/SearchRecipe`;
  const postFavoriteUrl = `https://blw-api.azurewebsites.net/api/Favorite/AddRecipeFavorite`;
  const deleteFavoriteUrl = `https://blw-api.azurewebsites.net/api/Favorite/DeleteFavorite`;
  const handleSearch = async (
    search = "",
    ageIds = [""],
    mealIds = [""],
    rating = 0
  ) => {
    try {
      const response = await fetch(searchApi, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
        body: JSON.stringify({
          search,
          ageIds,
          mealIds,
          rating,
        }),
      });
      if (response.status === 204) {
        console.log("No content found.");
      } else {
        const searchData = await response.json();
        setName(search);
        setAge(ageIds);
        setMeal(mealIds);
        setRate(rating);
        setSearch(searchData);
      }
    } catch (error) {
      console.error("Error during fetch:", error);
    }
  };
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
          handleSearch(name, age, meal, rate);
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
        handleSearch(name, age, meal, rate);
      })
      .catch((error) => {
        console.error("Error during fetch:", error);
      });
  };

  return (
    <>
      <Navbar />
      <div style={{ paddingTop: 70 }}>
        {user?.data?.isPremium && (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div
              className="notification is-warning is-light mb-1"
              style={{ width: 410, textAlign: "center" }}
            >
              Chào mừng bạn đã đến với gói
              <strong className="has-text-warning is-dark"> Vip </strong>của
              chúng tôi
            </div>
          </div>
        )}
        <Search
          handleSearchName={handleSearch}
          age={age}
          meal={meal}
          rate={rate}
        />
        <div className="layout-container">
          <div className="layout-sidebar">
            <article className="layout-content" style={{ height: 600 }}>
              <Filter handleSearchFilter={handleSearch} name={name} />
            </article>
          </div>
          <div className="layout-main-content">
            {React.Children.map(children, (child) => {
              if (React.isValidElement(child)) {
                return React.cloneElement(child, {
                  results: search,
                  addFavorite: handleAddFavorite,
                  removeFavorite: handleDeleteFavorite,
                  key: child.props.id,
                });
              }
              return child;
            })}
          </div>
          <div className="layout-sidebar">
            <div className="layout-ads">
              <Advertisement />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default LayoutNavSearchFooter;
