import React, { useState, useRef } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Grid } from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import { useQuery } from "react-query";
import Swal from "sweetalert2";

const RecipesManager = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const admin = JSON.parse(localStorage.getItem("admin"));
  //  ----------------------------------------------Directions-----------------------------------------------------------
  const [direction, setDirection] = useState([
    { directionNum: 1, directionDesc: "", directionImage: [""] },
  ]);
  const nextStep = direction.length + 1;
  const handleInputChangeDirection = (e, index) => {
    const { name, value } = e.target;
    const list = [...direction];
    list[index][name] = value;
    setDirection(list);
  };

  // handle click event of the Remove button
  const handleRemoveDirectionClick = (index) => {
    const list = [...direction];
    const remove = list.filter((_, indexFilter) => !(indexFilter === index));
    console.log("remove: ", remove);
    const renumberedFields = remove.map((field, index) => ({
      ...field,
      directionNum: index + 1,
    }));
    setDirection(renumberedFields);
  };
  console.log("direction thay doi", direction);
  // handle click event of the Add button
  const handleAddDirectionClick = () => {
    setDirection([
      ...direction,
      { directionNum: nextStep, directionDesc: "", directionImage: [""] },
    ]);
  };

  //  ----------------------------------------------Ingredients-----------------------------------------------------------
  const ingredientsApi = `https://blw-api.azurewebsites.net/api/Ingredients/GetAll`;

  const { data: ingredientData, isLoading } = useQuery("ingredients", () =>
    fetch(ingredientsApi).then((response) => response.json())
  );

  const [ingredient, setIngredient] = useState([
    { ingredientId: "", quantity: 1 },
  ]);

  const handleInputChangeIngredients = (e, index) => {
    const { name, value } = e.target;
    const list = [...ingredient];
    if (name === "quantity") {
      list[index][name] = parseInt(value);
    } else {
      list[index][name] = value;
    }

    setIngredient(list);
  };

  // handle click event of the Remove button
  const handleRemoveIngredientsClick = (index) => {
    const list = [...ingredient];
    const remove = list.filter((_, indexFilter) => !(indexFilter === index));
    setIngredient(remove);
  };

  // handle click event of the Add button
  const handleAddIngredientsClick = () => {
    setIngredient([...ingredient, { ingredientId: "", quantity: 1 }]);
  };

  //  --------------------------------------------------------------------------------------------------------------------

  // const fileInputRef = useRef(null);
  // const [selectedImage, setSelectedImage] = useState(null);
  // const handleUploadImage = () => {
  //   fileInputRef.current.click();
  // };

  // const handleImageChange = (event) => {
  //   const file = event.target.files[0];
  //   if (file) {
  //     setSelectedImage(URL.createObjectURL(file));
  //   }
  // };

  //  --------------------------------------------------------------------------------------------------------------------
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [prepare, setPrepare] = useState(1);
  const [standTime, setStandTime] = useState(0);
  const [cookTime, setCookTime] = useState(1);
  const [serving, setServing] = useState(1);
  const [premium, setPremium] = useState(true);
  const [meal, setMeal] = useState("");
  const [age, setAge] = useState("");
  const [image, setImage] = useState("");
  const ageApi = `https://blw-api.azurewebsites.net/api/Age/GetAll`;
  const mealApi = `https://blw-api.azurewebsites.net/api/Meal/GetAll`;

  const { data: ageData } = useQuery("ageData", () =>
    fetch(ageApi).then((response) => response.json())
  );
  const { data: mealData } = useQuery("mealData", () =>
    fetch(mealApi).then((response) => response.json())
  );

  console.log("bua an", mealData);

  const createUrl = `https://blw-api.azurewebsites.net/api/Recipe/AddRecipe`;

  const handleCreateRecipe = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(createUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${admin.token}`,
        },
        body: JSON.stringify({
          recipeName: name,
          recipeDesc: description,
          prepareTime: prepare,
          standTime: standTime,
          cookTime: cookTime,
          servings: serving,
          mealId: meal,
          recipeImage: image,
          ageId: age,
          forPremium: premium,
          directionVMs: direction,
          ingredientOfRecipeVMs: ingredient,
        }),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log("data tao: ", responseData);
        await Swal.fire({
          icon: "success",
          title: "Tạo thành công",
        });
        handleClose();
      } else {
        console.log("Tạo thất bại!!!");
      }
    } catch (error) {
      console.error("Error calling API:", error);
    }
  };

  return (
    <>
      <div style={{ backgroundColor: "#f3f6f4", height: "50px" }}>
        <nav
          className="breadcrumb"
          aria-label="breadcrumbs"
          style={{
            display: "flex",
            justifyContent: "start",
            alignItems: "center",
            height: "100%",
          }}
        >
          <ul
            style={{
              display: "flex",
              alignItems: "center",
              listStyle: "none",
              padding: "0",
              margin: 0,
            }}
          >
            <li style={{ paddingLeft: "20px" }}>
              <a className="bread-crumb" href="/admin/dashboard">
                Trang chủ
              </a>
            </li>
            <li className="is-active">
              <a href="/#" className="bread-crumb" aria-current="page">
                Công thức
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <hr style={{ marginTop: "0.5rem", marginBottom: "0.5rem" }} />
      <div id="heading-title">
        <p id="heading">Công thức</p>
      </div>
      <div style={{ display: "flex" }}>
        <button
          disabled
          className="button is-rounded"
          style={{ border: "1px solid black" }}
        >
          Tất cả (2)
        </button>
        <button
          style={{ marginLeft: "20px" }}
          onClick={handleOpen}
          className="button is-primary"
        >
          + Thêm mới
        </button>
        <div>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <div style={{ textAlign: "center" }}>
                <Typography
                  id="modal-modal-title"
                  variant="h6"
                  style={{ fontWeight: "bold", paddingBottom: "25px" }}
                  component="h2"
                >
                  Thêm mới thực đơn
                </Typography>
              </div>

              <hr className="expert-hr" style={{ paddingBottom: "25px" }} />
              <form>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  <Box sx={{ flexGrow: 1 }}>
                    <Grid
                      container
                      spacing={{ xs: 2, md: 3 }}
                      columns={{ xs: 4, sm: 8, md: 12 }}
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      {/* <Grid item xs={4} sm={6} md={6}>
                        <Box sx={{ marginLeft: 10 }}>
                          {!selectedImage ? (
                            <Button
                              onClick={handleUploadImage}
                              sx={{
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                width: "160px",
                                height: "160px",
                                borderRadius: "50%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                cursor: "pointer",
                                border: "2px dashed rgb(243, 156, 18)",
                              }}
                            >
                              <input
                                ref={fileInputRef}
                                type="file"
                                onChange={handleImageChange}
                                style={{ display: "none" }}
                              />
                              <AddPhotoAlternateIcon fontSize="large" />
                            </Button>
                          ) : (
                            <div>
                              <button
                                onClick={() => setSelectedImage(null)}
                                style={{
                                  backgroundSize: "cover",
                                  backgroundPosition: "center",
                                  width: "160px",
                                  height: "160px",
                                  borderRadius: "50%",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  cursor: "pointer",
                                  border: "2px dashed rgb(243, 156, 18)",
                                }}
                              >
                                <img
                                  src={selectedImage}
                                  alt="Selected"
                                  style={{
                                    width: "100%",
                                    height: "100%",
                                    borderRadius: "50%",
                                  }}
                                />
                              </button>
                            </div>
                          )}
                          
                        </Box>
                      </Grid> */}
                    </Grid>
                    <Grid item xs={4} sm={6} md={6}>
                      <div className="field">
                        <label className="label">Tên món ăn</label>
                        <input
                          className="input is-primary"
                          type="text"
                          placeholder="Primary input"
                          minLength="6"
                          maxLength="200"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          style={{ maxWidth: 800 }}
                        ></input>
                      </div>
                    </Grid>
                    <Grid item xs={4} sm={6} md={6}>
                      <div className="field">
                        <label className="label">Mô tả</label>
                        <textarea
                          className="input is-primary"
                          type="text"
                          minLength="10"
                          maxLength="5000"
                          required
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          placeholder="Mô tả"
                          style={{ height: 80 }}
                        ></textarea>
                      </div>
                    </Grid>
                    <Grid item xs={4} sm={6} md={6}>
                      <label className="label">Hình ảnh</label>
                      <input
                        className="input is-primary"
                        type="text"
                        placeholder="Image"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                      />
                    </Grid>
                    <hr
                      className="expert-hr"
                      style={{ paddingBottom: "25px", marginTop: 20 }}
                    />
                    <Grid
                      container
                      spacing={{ xs: 2, md: 3 }}
                      columns={{ xs: 4, sm: 8, md: 12 }}
                    >
                      <Grid item xs={2} sm={4} md={4}>
                        <div className="field">
                          <label className="label">Chuẩn bị (phút)</label>
                          <input
                            className="input is-primary"
                            type="number"
                            placeholder="0"
                            required
                            value={prepare}
                            onChange={(e) =>
                              setPrepare(parseInt(e.target.value))
                            }
                            min="1"
                            style={{ width: 150 }}
                          ></input>
                        </div>
                      </Grid>
                      <Grid item xs={2} sm={4} md={4}>
                        <div className="field">
                          <label className="label">Thời gian chờ (phút)</label>
                          <input
                            className="input is-primary"
                            type="number"
                            placeholder="0"
                            min="1"
                            style={{ width: 150 }}
                            value={standTime}
                            onChange={(e) =>
                              setStandTime(parseInt(e.target.value))
                            }
                          ></input>
                        </div>
                      </Grid>
                      <Grid item xs={2} sm={4} md={4}>
                        <div className="field">
                          <label className="label">Thời gian nấu (phút)</label>
                          <input
                            className="input is-primary"
                            type="number"
                            placeholder="0"
                            min="1"
                            required
                            style={{ width: 150 }}
                            value={cookTime}
                            onChange={(e) =>
                              setCookTime(parseInt(e.target.value))
                            }
                          ></input>
                        </div>
                      </Grid>
                      <Grid item xs={2} sm={4} md={4}>
                        <div className="field">
                          <label className="label">Số người ăn</label>
                          <input
                            className="input is-primary"
                            type="number"
                            placeholder="0"
                            required
                            min="1"
                            style={{ width: 150 }}
                            value={serving}
                            onChange={(e) =>
                              setServing(parseInt(e.target.value))
                            }
                          ></input>
                        </div>
                      </Grid>
                      <Grid item xs={2} sm={4} md={4}>
                        <label className="label">Premium</label>
                        <div className="select is-primary">
                          <select
                            style={{ width: 150 }}
                            onChange={(e) =>
                              setPremium(JSON.parse(e.target.value))
                            }
                            value={premium.toString()}
                          >
                            <option value={true}>Có</option>
                            <option value={false}>Không</option>
                          </select>
                        </div>
                      </Grid>
                      <Grid item xs={2} sm={4} md={4}>
                        <label className="label">Bữa ăn</label>
                        <div className="select is-primary">
                          <select
                            style={{ width: 150 }}
                            onChange={(e) => setMeal(e.target.value)}
                            value={meal}
                          >
                            {mealData?.data.map((meal) => (
                              <option value={meal.mealId} key={meal.mealId}>
                                {meal.mealName}
                              </option>
                            ))}
                          </select>
                        </div>
                      </Grid>
                      <Grid item xs={2} sm={4} md={4}>
                        <label className="label">Số tuổi</label>
                        <div className="select is-primary">
                          <select
                            style={{ width: 150 }}
                            onChange={(e) => setAge(e.target.value)}
                            value={age}
                          >
                            <option>Select Age</option>
                            {ageData?.data.map((age) => (
                              <option value={age.ageId} key={age.ageId}>
                                {age.ageName}
                              </option>
                            ))}
                          </select>
                        </div>
                      </Grid>
                    </Grid>
                  </Box>
                </Typography>
                <hr
                  className="expert-hr"
                  style={{ paddingBottom: "25px", marginTop: 20 }}
                />
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  <div className="field">
                    <label className="label">Các bước thực hiện</label>
                    {direction.map((x, i) => {
                      return (
                        <>
                          <div
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <textarea
                              name="directionDesc"
                              className="input is-primary"
                              type="text"
                              required
                              minLength="20"
                              placeholder="Primary input"
                              style={{
                                height: 50,
                                marginBottom: 20,
                                width: 500,
                              }}
                              value={x.directionDesc}
                              onChange={(e) => handleInputChangeDirection(e, i)}
                            ></textarea>
                            <div className="btn-box">
                              {direction.length !== 1 && (
                                <FontAwesomeIcon
                                  icon={faCircleXmark}
                                  onClick={() => handleRemoveDirectionClick(i)}
                                  style={{
                                    width: "50px",
                                    height: "30px",
                                    marginBottom: 10,
                                    marginLeft: 20,
                                    cursor: "pointer",
                                  }}
                                />
                              )}
                            </div>
                          </div>
                          {direction.length - 1 === i && (
                            <button
                              onClick={handleAddDirectionClick}
                              className="button is-success is-light"
                            >
                              Thêm mới
                            </button>
                          )}
                        </>
                      );
                    })}
                  </div>
                </Typography>
                <hr
                  className="expert-hr"
                  style={{ paddingBottom: "25px", marginTop: 20 }}
                />
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  <div className="field">
                    <label className="label">Nguyên liệu</label>
                    {ingredient.map((x, i) => {
                      console.log(x.ingredientId);
                      return (
                        <>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              marginTop: 20,
                            }}
                          >
                            <select
                              className="dropdown-content is-primary"
                              style={{ width: 200 }}
                              name="ingredientId"
                              value={x.ingredientId}
                              required
                              onChange={(e) =>
                                handleInputChangeIngredients(e, i)
                              }
                            >
                              <option>Select Ingredients</option>
                              {ingredientData?.data.map((ingredient, index) => (
                                <option
                                  value={ingredient.ingredientId}
                                  key={index}
                                >
                                  {ingredient.ingredientName}
                                </option>
                              ))}
                            </select>
                            <input
                              name="quantity"
                              className="input is-primary"
                              type="number"
                              placeholder="0"
                              required
                              min="1"
                              style={{ width: 150, marginLeft: 30 }}
                              value={x.quantity}
                              onChange={(e) =>
                                handleInputChangeIngredients(e, i)
                              }
                            ></input>
                            <div className="btn-box">
                              {ingredient.length !== 1 && (
                                <FontAwesomeIcon
                                  icon={faCircleXmark}
                                  onClick={() =>
                                    handleRemoveIngredientsClick(i)
                                  }
                                  style={{
                                    width: "50px",
                                    height: "30px",
                                    marginBottom: 10,
                                    marginLeft: 20,
                                    cursor: "pointer",
                                  }}
                                />
                              )}
                            </div>
                          </div>
                          {ingredient.length - 1 === i && (
                            <button
                              onClick={handleAddIngredientsClick}
                              className="button is-success is-light mt-5"
                            >
                              Thêm mới
                            </button>
                          )}
                        </>
                      );
                    })}
                  </div>
                </Typography>
                <hr
                  className="expert-hr"
                  style={{ paddingBottom: "25px", marginTop: 20 }}
                />
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: 10,
                  }}
                >
                  <button
                    className="button is-success is-light"
                    type="submit"
                    onClick={handleCreateRecipe}
                  >
                    Tạo thực đơn
                  </button>
                </div>
              </form>
            </Box>
          </Modal>
        </div>
      </div>
      <div className="container-trans" style={{ width: 1300 }}>
        <div className="row-trans">
          <div className="col-md-12-trans">
            <div className="table-wrap">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Tên nguyên liệu</th>
                    <th>Mô tả</th>
                    <th>Chuẩn bị</th>
                    <th>Thời gian chờ</th>
                    <th>Thời gian nấu</th>
                    <th>Tổng</th>
                    <th>Số người ăn</th>
                    <th>Premium</th>
                    <th>Các bước thực hiên</th>
                    <th>Nguyên liệu chuẩn bị</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ alignItems: "center" }}>
                    <td style={{ fontWeight: "600" }}>1001</td>
                    <td>Mark Otto</td>
                    <td>Japan</td>
                    <td>$3000</td>
                    <td>$1200</td>
                    <td>$1200</td>
                    <td>$1200</td>
                    <td>$1200</td>
                    <td>
                      <button
                        className="button is-success is-rounded"
                        style={{ width: "150px" }}
                      >
                        Đã thanh toán
                      </button>
                    </td>
                    <td>
                      <button
                        className="button is-success is-rounded"
                        style={{ width: "150px" }}
                      >
                        Đã thanh toán
                      </button>
                    </td>
                  </tr>
                  <tr style={{ alignItems: "center" }}>
                    <td>1001</td>
                    <td>Mark Otto</td>
                    <td>Japan</td>
                    <td>$3000</td>
                    <td>$1200</td>
                    <td>
                      <button
                        className="button is-warning is-rounded"
                        style={{ width: "150px" }}
                      >
                        Chưa thanh toán
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default RecipesManager;

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  overflow: "scroll",
  height: "90%",
  display: "block",
};
