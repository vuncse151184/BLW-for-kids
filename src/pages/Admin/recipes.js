import React from "react";

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useQuery } from "react-query";
const RecipesManager = () => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>
            <div style={{ backgroundColor: "#f3f6f4", height: "50px" }}>
                <nav className="breadcrumb" aria-label="breadcrumbs" style={{ display: "flex", justifyContent: "start", alignItems: "center", height: "100%" }}>
                    <ul style={{ display: "flex", alignItems: "center", listStyle: "none", padding: "0", margin: 0 }}>
                        <li style={{ paddingLeft: "20px" }}><a className="bread-crumb" href="/admin/dashboard">Trang chủ</a></li>
                        <li className="is-active"><a href="#" className="bread-crumb" aria-current="page">Công thức</a></li>
                    </ul>
                </nav>
            </div>
            <hr style={{ marginTop: "0.5rem", marginBottom: "0.5rem" }} />
            <div id="heading-title">
                <p id="heading" >Công thức</p>
            </div>
            <div style={{ display: "flex" }}>
                <button disabled className="button is-rounded" style={{ border: "1px solid black" }}> Tất cả (2)</button>
                <button style={{ marginLeft: "20px" }} onClick={handleOpen} className="button is-primary">+ Thêm mới</button>
                <div>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                Text in a modal
                            </Typography>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                            </Typography>
                        </Box>
                    </Modal>
                </div>
            </div>
            <div className="container-trans">
                <div className="row-trans">
                    <div className="col-md-12-trans">
                        <div className="table-wrap">
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th >Tên nguyên liệu</th>
                                        <th>Mô tả</th>
                                        <th>Thời gian</th>
                                        <th>S</th>
                                        <th>Tiền nhận</th>
                                        <th>Trạng thái</th>
                                        <th>Duyệt đơn</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr style={{ alignItems: "center" }}>
                                        <td style={{ fontWeight: "600" }}>1001</td>
                                        <td>Mark Otto</td>
                                        <td>Japan</td>
                                        <td>$3000</td>
                                        <td>$1200</td>
                                        <td>
                                            <button className="button is-success is-rounded" style={{ width: "150px" }}>Đã thanh toán</button>
                                        </td>
                                        <td>
                                            <button className="button is-success is-rounded" style={{ width: "150px" }}>Đã thanh toán</button>
                                        </td>
                                    </tr>
                                    <tr style={{ alignItems: "center" }}>
                                        <td>1001</td>
                                        <td>Mark Otto</td>
                                        <td>Japan</td>
                                        <td>$3000</td>
                                        <td>$1200</td>
                                        <td>
                                            <button className="button is-warning is-rounded" style={{ width: "150px" }}>Chưa thanh toán</button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div >
            </div>

        </>
    )
}
export default RecipesManager

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};