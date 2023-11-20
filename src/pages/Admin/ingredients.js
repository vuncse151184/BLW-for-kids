import React, { useState, useRef } from "react";
import { useQuery, useQueryClient } from 'react-query';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import './css/expert.css';
import Grid from '@mui/material/Grid';
import Swal from "sweetalert2";
import { Navigate } from "react-router-dom";
const FoodsManager = () => {

    const queryClient = useQueryClient()
    const admin = JSON.parse(localStorage.getItem("admin"));
    const accessToken = admin?.token;
    const ingredientAPI_URL = `https://blw-api.azurewebsites.net/api/Ingredients/GetAll`
    const { data: ingredients, isLoading, isError } = useQuery('ingredientsData', () => {
        return fetch(ingredientAPI_URL).then(response => response.json());
    })
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [formData, setFormData] = useState({
        ingredientName: '',
        measure: '',
        protein: 0,
        carbohydrate: 0,
        fat: 0,
        calories: 0,
    });

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        const parsedValue = (name === 'protein' || name === 'fat' || name === 'carbohydrate' || name === 'calories') ? parseFloat(value) : value;
        setFormData({
            ...formData,
            [name]: parsedValue,
        });
    };
    const addNewIngredient = async () => {
        try {
            // Make an API POST request to create a new ingredient
            const response = await fetch('https://blw-api.azurewebsites.net/api/Ingredients/AddIngredient', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                formData.calories = 0
                formData.ingredientName = ''
                formData.carbohydrate = 0
                formData.fat = 0
                formData.protein = 0
                formData.measure = ''
                handleClose();
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Add success',
                    showConfirmButton: false,
                    timer: 2500
                })
                queryClient.invalidateQueries('ingredientsData');
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong! Add failed',
                })
                console.error('Error creating ingredient');
            }
        } catch (error) {
            console.error('API request failed', error);
        }
    };
    //Update modal
    const [editFormData, setEditFormData] = useState({
        ingredientId: '',
        ingredientName: '',
        measure: '',
        protein: 0,
        carbohydrate: 0,
        fat: 0,
        calories: 0,
    });
    const handleEditFormChange = (e) => {
        const { name, value } = e.target;
        const parsedValue = (name === 'protein' || name === 'fat' || name === 'carbohydrate' || name === 'calories') ? parseFloat(value) : value;
        setEditFormData({
            ...editFormData,
            [name]: parsedValue,
        });
    };
    const [editOpen, setEditOpen] = React.useState(false);
    const handleEditOpen = () => setEditOpen(true);
    const handleEditClose = () => setEditOpen(false);

    // Function to set the edit data when the "Edit" button is clicked
    const handleEditClick = (ingredient) => {
        setEditFormData({
            ingredientId: ingredient.ingredientId,
            ingredientName: ingredient.ingredientName,
            measure: ingredient.measure,
            protein: ingredient.protein,
            carbohydrate: ingredient.carbohydrate,
            fat: ingredient.fat,
            calories: ingredient.calories,
        });
        handleEditOpen();
    };

    const handleEditFormSubmit = async () => {

        try {
            // Make an API POST request to create a new ingredient
            const response = await fetch('https://blw-api.azurewebsites.net/api/Ingredients/UpdateIngredient', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`
                },
                body: JSON.stringify(editFormData),
            });

            if (response.ok) {
                editFormData.calories = 0
                editFormData.ingredientName = ''
                editFormData.carbohydrate = 0
                editFormData.fat = 0
                editFormData.protein = 0
                editFormData.measure = ''
                handleEditClose();
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Update success',
                    showConfirmButton: false,
                    timer: 2500
                })
                queryClient.invalidateQueries('ingredientsData');
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong! Update failed',
                })
                console.error('Error creating ingredient');
            }
        } catch (error) {
            console.error('API request failed', error);
        }
    };
    // delete
    const handleDeleteClick = async (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                const deleteAPI_URL = `https://blw-api.azurewebsites.net/api/Ingredients/DeleteIngredient?id=${id}`
                try {
                    // Make an API POST request to create a new ingredient
                    const response = await fetch(deleteAPI_URL, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${accessToken}`
                        }
                    });

                    if (response.ok) {
                        Swal.fire(
                            'Deleted!',
                            'Ingredient has been deleted.',
                            'success'
                        )
                        queryClient.invalidateQueries('ingredientsData');
                    } else {
                        console.error('Error creating ingredient');
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Something went wrong! Delete failed',
                        })
                    }
                } catch (error) {
                    console.error('API request failed', error);
                }


            }
        })

    }



    return (
        <>
            <div style={{ backgroundColor: "#f3f6f4", height: "50px" }}>
                <nav className="breadcrumb" aria-label="breadcrumbs" style={{ display: "flex", justifyContent: "start", alignItems: "center", height: "100%" }}>
                    <ul style={{ display: "flex", alignItems: "center", listStyle: "none", padding: "0", margin: 0 }}>
                        <li style={{ paddingLeft: "20px" }}><a className="bread-crumb" href="/admin/dashboard">Trang chủ</a></li>
                        <li className="is-active"><a href="#" className="bread-crumb" aria-current="page">Nguyên liệu</a></li>
                    </ul>
                </nav>
            </div>
            <hr style={{ marginTop: "0.5rem", marginBottom: "0.5rem" }} />
            <div id="heading-title">
                <p id="heading" >Nguyên liệu</p>
            </div>
            <div>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <div style={{ textAlign: "center" }}>
                            <Typography id="modal-modal-title" variant="h6" style={{ fontWeight: "bold", paddingBottom: "25px" }} component="h2">
                                Thêm mới Nguyên liệu
                            </Typography>
                        </div>

                        <hr className="expert-hr" style={{ paddingBottom: "25px" }} />

                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            <div style={{ zIndex: 1000, backgroundColor: "rgba(184, 176, 180, 0.09)", borderRadius: "20px", padding: "15px" }}>

                                <Box sx={{ flexGrow: 1 }}>
                                    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>

                                        <Grid item xs={4} sm={6} md={6}>
                                            <div className="field">
                                                <label className="label">Tên NL</label>
                                                <input className="input is-primary" required name="ingredientName" value={formData.ingredientName} onChange={handleFormChange} type="text" placeholder="ví dụ: nấm ..."></input>
                                            </div>
                                        </Grid>
                                        <Grid item xs={4} sm={6} md={6}>
                                            <div className="field">
                                                <label className="label">Đơn vị đo</label>
                                                <input className="input is-primary" required name="measure" type="text" value={formData.measure} onChange={handleFormChange} placeholder="ví dụ: 100g ..."></input>
                                            </div>
                                        </Grid>
                                    </Grid>
                                </Box>

                                <Box sx={{ flexGrow: 1 }}>
                                    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>

                                        <Grid item xs={4} sm={6} md={6}>
                                            <div className="field">
                                                <label className="label">Protein</label>
                                                <input className="input is-primary" required type="number" name="protein" value={formData.protein} onChange={handleFormChange} placeholder="ví dụ: 100"></input>
                                            </div>
                                        </Grid>
                                        <Grid item xs={4} sm={6} md={6}>
                                            <div className="field">
                                                <label className="label">Carbs</label>
                                                <input className="input is-primary" required type="number" name="carbohydrate" value={formData.carbohydrate} onChange={handleFormChange} placeholder="ví dụ: 100"></input>
                                            </div>
                                        </Grid>
                                        <Grid item xs={4} sm={6} md={6}>
                                            <div className="field">
                                                <label className="label">Fat</label>
                                                <input className="input is-primary" required type="number" name="fat" value={formData.fat} onChange={handleFormChange} placeholder="ví dụ: 100"></input>
                                            </div>
                                        </Grid>
                                        <Grid item xs={4} sm={6} md={6}>
                                            <div className="field">
                                                <label className="label">Total calories(Kcal)</label>
                                                <input className="input is-primary" required type="number" name="calories" value={formData.calories} onChange={handleFormChange} placeholder="ví dụ: 100"></input>
                                            </div>
                                        </Grid>
                                    </Grid>
                                </Box>

                            </div>

                            <div className="field is-grouped " style={{ paddingTop: "20px", display: "flex", justifyContent: "flex-end" }}>
                                <div className="control">
                                    <button className="button is-link" onClick={addNewIngredient}>Submit</button>
                                </div>
                                <div className="control">
                                    <button className="button is-link is-light" onClick={handleClose}>Cancel</button>
                                </div>
                            </div>
                        </Typography>
                    </Box>
                </Modal >
            </div >

            <div style={{ display: "flex" }}>
                <button disabled className="button is-rounded" style={{ border: "1px solid black" }}> Tất cả ({ingredients?.data.length})</button>
                <button style={{ marginLeft: "20px" }} onClick={handleOpen} className="button is-primary">+ Thêm mới</button>
            </div>
            <div className="container-trans">
                <div className="row-trans">
                    <div className="col-md-12-trans">
                        <div className="table-wrap">
                            <table className="table table-striped">
                                {!ingredients ? (
                                    <p>No data found</p>
                                ) : (
                                    <>
                                        <thead>
                                            <tr>
                                                <th >Mã NL</th>
                                                <th>Tên NL</th>
                                                <th>Đơn vị tính</th>
                                                <th>Protein</th>
                                                <th>Cacbohydrate</th>
                                                <th>Chất béo</th>
                                                <th>Tổng calo(s)</th>
                                                <th>Edit</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {ingredients && ingredients.data.map(ingredient => (
                                                <tr key={ingredient.id}>
                                                    <td style={{ fontWeight: "600" }}>{ingredient.ingredientId}</td>
                                                    <td>{ingredient.ingredientName}</td>
                                                    <td>{ingredient.measure}</td>
                                                    <td>{ingredient.protein}</td>
                                                    <td>{ingredient.carbohydrate}</td>
                                                    <td>{ingredient.fat}</td>
                                                    <td>{parseFloat(ingredient.calories.toFixed(2))}</td>
                                                    <td>
                                                        <button className="button is-link" style={{ width: 24, height: 32 }} onClick={() => handleEditClick(ingredient)}>
                                                            <i className="fas fa-pen-to-square"></i>
                                                        </button>
                                                        &nbsp;
                                                        <button className="button is-danger" style={{ width: 24, height: 32 }} onClick={() => handleDeleteClick(ingredient.ingredientId)}>
                                                            <i className="fas fa-trash"></i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>

                                    </>
                                )}

                            </table>
                            <div>
                                <Modal
                                    open={editOpen}
                                    onClose={handleEditClose}
                                    aria-labelledby="modal-modal-title"
                                    aria-describedby="modal-modal-description"
                                >
                                    <Box sx={style}>
                                        <div style={{ textAlign: "center" }}>
                                            <Typography id="modal-modal-title" variant="h6" style={{ fontWeight: "bold", paddingBottom: "25px" }} component="h2">
                                                Chỉnh sửa Nguyên liệu
                                            </Typography>
                                        </div>

                                        <hr className="expert-hr" style={{ paddingBottom: "25px" }} />

                                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                            <div style={{ zIndex: 1000, backgroundColor: "rgba(184, 176, 180, 0.09)", borderRadius: "20px", padding: "15px" }}>

                                                <Box sx={{ flexGrow: 1 }}>
                                                    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>

                                                        <Grid item xs={4} sm={6} md={6}>
                                                            <div className="field">
                                                                <label className="label">Tên NL</label>
                                                                <input className="input is-primary" name="ingredientName" value={editFormData.ingredientName} onChange={handleEditFormChange} type="text" placeholder="ví dụ: nấm ..."></input>
                                                            </div>
                                                        </Grid>
                                                        <Grid item xs={4} sm={6} md={6}>
                                                            <div className="field">
                                                                <label className="label">Đơn vị đo</label>
                                                                <input className="input is-primary" name="measure" type="text" value={editFormData.measure} onChange={handleEditFormChange} placeholder="ví dụ: 100g ..."></input>
                                                            </div>
                                                        </Grid>
                                                    </Grid>
                                                </Box>

                                                <Box sx={{ flexGrow: 1 }}>
                                                    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>

                                                        <Grid item xs={4} sm={6} md={6}>
                                                            <div className="field">
                                                                <label className="label">Protein</label>
                                                                <input className="input is-primary" type="number" name="protein" value={editFormData.protein} onChange={handleEditFormChange} placeholder="ví dụ: 100"></input>
                                                            </div>
                                                        </Grid>
                                                        <Grid item xs={4} sm={6} md={6}>
                                                            <div className="field">
                                                                <label className="label">Carbs</label>
                                                                <input className="input is-primary" type="number" name="carbohydrate" value={editFormData.carbohydrate} onChange={handleEditFormChange} placeholder="ví dụ: 100"></input>
                                                            </div>
                                                        </Grid>
                                                        <Grid item xs={4} sm={6} md={6}>
                                                            <div className="field">
                                                                <label className="label">Fat</label>
                                                                <input className="input is-primary" type="number" name="fat" value={editFormData.fat} onChange={handleEditFormChange} placeholder="ví dụ: 100"></input>
                                                            </div>
                                                        </Grid>
                                                        <Grid item xs={4} sm={6} md={6}>
                                                            <div className="field">
                                                                <label className="label">Total calories(Kcal)</label>
                                                                <input className="input is-primary" type="number" name="calories" value={editFormData.calories} onChange={handleEditFormChange} placeholder="ví dụ: 100"></input>
                                                            </div>
                                                        </Grid>
                                                    </Grid>
                                                </Box>

                                            </div>

                                            <div className="field is-grouped " style={{ paddingTop: "20px", display: "flex", justifyContent: "flex-end" }}>
                                                <div className="control">
                                                    <button className="button is-link" onClick={handleEditFormSubmit}>Submit</button>
                                                </div>
                                                <div className="control">
                                                    <button className="button is-link is-light" onClick={handleEditClose}>Cancel</button>
                                                </div>
                                            </div>
                                        </Typography>
                                    </Box>
                                </Modal >
                            </div >
                        </div>
                    </div>
                </div >
            </div>

        </>
    )
}
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    height: '73%',
    display: 'block'
};

export default FoodsManager