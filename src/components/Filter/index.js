import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { Rating } from "@mui/material";
import { useState } from "react";
import { useQuery } from "react-query";

const Filter = ({ handleSearchFilter, name }) => {
  const [ageId, setAgeId] = useState([]);
  const [mealId, setMealId] = useState([]);
  const [rating, setRating] = useState(0);
  const ageApi = `https://blw-api.azurewebsites.net/api/Age/GetAll`;
  const mealApi = `https://blw-api.azurewebsites.net/api/Meal/GetAll`;

  const { data: ageData, isLoading: ageLoading } = useQuery("ageData", () =>
    fetch(ageApi).then((response) => response.json())
  );
  const { data: mealData, isLoading: mealLoading } = useQuery("mealData", () =>
    fetch(mealApi).then((response) => response.json())
  );
  const handleMeal = (e) => {
    const selectedMeal = e.target.value;
    console.log("chon bua an 1:", typeof selectedMeal);
    setMealId((prevMealId) => {
      const updatedMealId = prevMealId.includes(selectedMeal)
        ? prevMealId.filter((value) => value !== selectedMeal)
        : [...prevMealId, selectedMeal];
      handleSearchFilter(name, ageId, updatedMealId, rating);
      console.log("chon bua an 2:", prevMealId.includes(selectedMeal));
      return updatedMealId;
    });
    console.log("chon bua an 3:", mealId);
  };
  const handleAge = (e) => {
    const selectedValue = e.target.value;
    setAgeId((prevAgeId) => {
      const updatedAgeId = prevAgeId.includes(selectedValue)
        ? prevAgeId.filter((value) => value !== selectedValue)
        : [...prevAgeId, selectedValue];
      handleSearchFilter(name, updatedAgeId, mealId, rating);
      return updatedAgeId;
    });
  };

  return (
    <div>
      <h3 className="title is-4">
        <FontAwesomeIcon icon={faFilter} style={{ width: 18 }} /> &nbsp; Bộ lọc
        tìm kiếm
      </h3>
      <h6 className="subtitle is-6 mt-5 pl-3">Theo tháng tuổi</h6>
      <div className="pl-3">
        {ageData?.data.map((ages) => (
          <div key={ages.ageId}>
            <label className="checkbox mb-2">
              <input
                type="checkbox"
                value={ages.ageId}
                onChange={handleAge}
                checked={ageId.includes(ages.ageId)}
              />
              &nbsp; &nbsp;
              {ages.ageName}
            </label>
            <br />
          </div>
        ))}
      </div>
      <hr className="is-divider has-background-dark" />
      <h6 className="subtitle is-6 mt-5 pl-3">Bữa ăn</h6>
      <div className="pl-3">
        {mealData?.data.map((meals) => (
          <div key={meals.mealId}>
            <label className="checkbox mb-2">
              <input
                type="checkbox"
                value={meals.mealId}
                onChange={handleMeal}
                checked={mealId.includes(meals.mealId)}
              />
              &nbsp; &nbsp;
              {meals.mealName}
            </label>
            <br />
          </div>
        ))}
      </div>
      <hr className="is-divider has-background-dark" />
      <h6 className="subtitle is-6 mt-5 pl-3">Đánh giá</h6>
      <div className="pl-3">
        <div
          style={{ cursor: "pointer" }}
          onClick={() => {
            const newRating = 5;
            setRating(newRating);
            handleSearchFilter(name, ageId, mealId, newRating);
          }}
        >
          <Rating
            name="half-rating"
            defaultValue={5}
            precision={0.5}
            size="sm"
            readOnly
          />
        </div>
        <div
          style={{ display: "flex", alignContent: "center", cursor: "pointer" }}
          onClick={() => {
            const newRating = 4;
            setRating(newRating);
            handleSearchFilter(name, ageId, mealId, newRating);
          }}
        >
          <Rating
            name="half-rating"
            defaultValue={4}
            precision={0.5}
            size="sm"
            readOnly
          />
          <span className="subtitle is-6 pl-3 pt-1"> Trở lên</span>
        </div>

        <div
          style={{ display: "flex", alignContent: "center", cursor: "pointer" }}
          onClick={() => {
            const newRating = 3;
            setRating(newRating);
            handleSearchFilter(name, ageId, mealId, newRating);
          }}
        >
          <Rating
            name="half-rating"
            defaultValue={3}
            precision={0.5}
            size="sm"
            readOnly
          />
          <span className="subtitle is-6 pl-3 pt-1"> Trở lên</span>
        </div>
        <div
          style={{ display: "flex", alignContent: "center", cursor: "pointer" }}
          onClick={() => {
            const newRating = 2;
            setRating(newRating);
            handleSearchFilter(name, ageId, mealId, newRating);
          }}
        >
          <Rating
            name="half-rating"
            defaultValue={2}
            precision={0.5}
            size="sm"
            readOnly
          />
          <span className="subtitle is-6 pl-3 pt-1"> Trở lên</span>
        </div>
        <div
          style={{ display: "flex", alignContent: "center", cursor: "pointer" }}
          onClick={() => {
            const newRating = 1;
            setRating(newRating);
            handleSearchFilter(name, ageId, mealId, newRating);
          }}
        >
          <Rating
            name="half-rating"
            defaultValue={1}
            precision={0.5}
            size="sm"
            readOnly
          />
          <span className="subtitle is-6 pl-3 pt-1"> Trở lên</span>
        </div>
      </div>
      <hr className="is-divider has-background-dark" />
    </div>
  );
};

export default Filter;
