import React from "react";

const CustomersManager = () => {
    return (
        <>
            <div style={{ backgroundColor: "#f3f6f4", height: "50px" }}>
                <nav className="breadcrumb" aria-label="breadcrumbs" style={{ display: "flex", justifyContent: "start", alignItems: "center", height: "100%" }}>
                    <ul style={{ display: "flex", alignItems: "center", listStyle: "none", padding: "0", margin: 0 }}>
                        <li style={{ paddingLeft: "20px" }}><a className="bread-crumb" href="/admin/dashboard">Trang chủ</a></li>
                        <li className="is-active"><a href="#" className="bread-crumb" aria-current="page">Khách hàng</a></li>
                    </ul>
                </nav>
            </div>
            <hr style={{ marginTop: "0.5rem", marginBottom: "0.5rem" }} />
            <div id="heading-title">
                <p id="heading" >Khách hàng</p>
            </div>
            <div style={{ display: "flex" }}>
                <button disabled className="button is-rounded" style={{ border: "1px solid black" }}> Tất cả (2)</button>
            </div>
            <div className="container-trans">
                <div className="row-trans">
                    <div className="col-md-12-trans">
                        <div className="table-wrap">
                            <table className="table table-striped">
                                <p>No data found</p>
                                {/* <thead>
                                    <tr>
                                        <th >Mã KH</th>
                                        <th>Tên KH</th>
                                        <th>Thành viên</th>
                                        <th>Trạng thái</th>
                                        <th>Edit</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr style={{ alignItems: "center" }}>
                                        <td style={{ fontWeight: "600" }}>1001</td>
                                        <td>Nguyễn Văn A</td>
                                        <td>Thành viên thường</td>
                                        <td><p style={{ color: "#f01616" }}>Inactive</p></td>
                                        <td></td>
                                    </tr>
                                    <tr style={{ alignItems: "center" }}>
                                        <td>1002</td>
                                        <td>Nguyễn Văn B</td>
                                        <td>Hội viên cao cấp</td>
                                        <td><p style={{ color: "#5d7ee7" }}>Active</p></td>
                                        <td></td>
                                    </tr>
                                </tbody> */}
                            </table>
                        </div>
                    </div>
                </div >
            </div>

        </>
    )
}
export default CustomersManager