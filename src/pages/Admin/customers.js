import React, { useState } from "react";
import { useQuery } from "react-query";
const CustomersManager = () => {
    const admin = JSON.parse(localStorage.getItem("admin"));
    const accessToken = admin?.token;
    const customerAPI_URL = `https://blw-api.azurewebsites.net/api/Customers/GetAllCus`
    const { data: customers, isLoading, isError } = useQuery('customersData', () => {
        return fetch(customerAPI_URL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
            }
        }).then(response => response.json());
    })
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
                <button disabled className="button is-rounded" style={{ border: "1px solid black" }}> Tất cả ({customers ? customers?.data.length : 0})</button>
            </div>
            <div className="container-trans">
                <div className="row-trans">
                    <div className="col-md-12-trans">
                        <div className="table-wrap">
                            <table className="table table-striped">
                                {!customers?.data ? (
                                    <p>No data found</p>
                                ) : (
                                    <>
                                        <thead>
                                            <tr>
                                                <th >Mã KH</th>
                                                <th>Tên KH</th>
                                                <th>Email</th>
                                                <th>Thành viên</th>
                                                <th>Trạng thái</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {customers && customers.data.map((customer) => (
                                                <tr style={{ alignItems: "center" }} key={customer.customerId}>
                                                    <td style={{ fontWeight: "600" }}>{customer.customerId}</td>
                                                    <td>{customer.fullname}</td>
                                                    <td>{customer.email}</td>
                                                    <td>
                                                        <p style={customer.isPremium ? { fontWeight: "800" } : {}}>
                                                            {customer.isPremium ? "Thành viên cao cấp" : "Thành viên thường"}
                                                        </p>

                                                    </td>
                                                    <td><p style={{ color: "#5d7ee7" }}>Active</p></td>

                                                </tr>
                                            ))
                                            }


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
export default CustomersManager