import React from "react";
import { useQuery } from "react-query";
const FoodsManager = () => {
    const ingredientAPI_URL = `https://blw-api.azurewebsites.net/api/Ingredients/GetAll`
    const { data: ingredients, isLoading, isError } = useQuery('ingredientsData', () => {
        return fetch(ingredientAPI_URL).then(response => response.json());
    })


    console.log("-----------------------", ingredients)
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
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
            <div style={{ display: "flex" }}>
                <button disabled className="button is-rounded" style={{ border: "1px solid black" }}> Tất cả (2)</button>
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
                                                    <td>{ingredient.calories}</td>
                                                    <td>
                                                        <button className="button is-link" style={{ width: 24, height: 32 }}>
                                                            <i className="fas fa-pen-to-square"></i>
                                                        </button>
                                                        &nbsp;
                                                        <button className="button is-danger" style={{ width: 24, height: 32 }}>
                                                            <i className="fas fa-trash"></i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>

                                    </>
                                )}

                            </table>
                        </div>
                    </div>
                </div >
            </div>

        </>
    )
}
export default FoodsManager