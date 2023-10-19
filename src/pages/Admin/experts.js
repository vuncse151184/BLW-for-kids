import React, { useState, useRef } from "react";
import { useQuery } from "react-query";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import './css/expert.css';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

const ExpertManager = () => {
    const expertAPI_URL = `https://blw-api.azurewebsites.net/api/Expert/GetAll`
    const { data: experts, isLoading, isError } = useQuery('expertsData', () => {
        const response = fetch(expertAPI_URL).then(response => {
            return response.json()
        })
    })
    const fileInputRef = useRef(null)
    const [selectedImage, setSelectedImage] = useState(null)
    const handleUploadImage = () => {
        fileInputRef.current.click()
    }


    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [buttonStyle, setButtonStyle] = useState({
        zIndex: 0,
    })
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedImage(URL.createObjectURL(file));
        }

    }

    // -------------------------------HANDLE CREATE------------------------------
    const [name, setName] = useState('')
    const [dateOfBirth, setDateOfBirth] = useState('')
    const [gender, setGender] = useState(1)
    const [avatar, setAvatar] = useState('')
    const [position, setPosition] = useState('')
    const [phoneNum, setPhoneNum] = useState('')
    const [description, setDescription] = useState('')
    const [title, setTittle] = useState('')
    const [email, setEmail] = useState('')
    const [workProgress, setWorkProgress] = useState('')
    const [facebookId, setFacebookId] = useState('')
    const [professionalQualification, setProfessionalQualification] = useState('')
    const [achievements, setAchievements] = useState('')
    const [workUnit, setWorkUnit] = useState('')

    // -------------------------------END CREATE------------------------------
    return (
        <>
            <div style={{ backgroundColor: "#f3f6f4", height: "50px" }}>
                <nav className="breadcrumb" aria-label="breadcrumbs" style={{ display: "flex", justifyContent: "start", alignItems: "center", height: "100%" }}>
                    <ul style={{ display: "flex", alignItems: "center", listStyle: "none", padding: "0", margin: 0 }}>
                        <li style={{ paddingLeft: "20px" }}><a className="bread-crumb" href="/admin/dashboard">Trang chủ</a></li>
                        <li className="is-active"><a href="#" className="bread-crumb" aria-current="page">Chuyên gia</a></li>
                    </ul>
                </nav>
            </div>
            <hr style={{ marginTop: "0.5rem", marginBottom: "0.5rem" }} />
            <div id="heading-title">
                <p id="heading" >Chuyên gia</p>
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
                                {!experts ? (
                                    <p>No data found</p>
                                ) : (
                                    <>

                                        <thead>
                                            <tr>
                                                <th>Tên chuyên gia</th>
                                                <th>Số điện thoại</th>
                                                <th>Khu vực</th>
                                                <th>Mô tả</th>
                                                <th>Liên lạc mxh</th>
                                                <th>Trạng thái</th>
                                                <th>Edit</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {experts && experts?.data.forEach(expert => {
                                                <tr style={{ alignItems: "center" }}>
                                                    <td>Chuyên gia A</td>
                                                    <td>0123456789</td>
                                                    <td>Hồ Chí Minh</td>
                                                    <td>Chuyên gia dinh dưỡng</td>
                                                    <td>-</td>
                                                    <td><p style={{ color: "#5d7ee7" }}>Active</p></td>
                                                    <td>

                                                    </td>
                                                </tr>
                                            })}
                                        </tbody>
                                    </>
                                )}

                            </table>
                        </div>
                    </div>
                </div >
            </div >
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
                                Thêm mới chuyên gia
                            </Typography>
                        </div>

                        <hr className="expert-hr" style={{ paddingBottom: "25px" }} />

                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            <div style={{ zIndex: 1000, backgroundColor: "rgba(184, 176, 180, 0.09)", borderRadius: "20px", padding: "15px" }}>
                                <Typography variant="h6" style={{ fontWeight: "bold", paddingBottom: "20px", textDecoration: "underline" }} component="h2">Basic Info:</Typography>
                                <Box sx={{ flexGrow: 1 }}>
                                    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>

                                        <Grid item xs={4} sm={6} md={6}>
                                            <div className="field">
                                                <label className="label">Họ và tên</label>
                                                <input className="input is-primary" type="text" placeholder="Primary input"></input>
                                            </div>
                                        </Grid>
                                        <Grid item xs={4} sm={6} md={6}>
                                            <div className="field">
                                                <label className="label">Ngày sinh</label>
                                                <input className="input is-primary" type="date" placeholder="Primary input"></input>
                                            </div>
                                        </Grid>
                                    </Grid>
                                </Box>

                                <Box sx={{ flexGrow: 1 }}>
                                    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>

                                        <Grid item xs={4} sm={6} md={6}>
                                            <div>
                                                <label className="label">Giới tính</label>
                                                <div className="control">
                                                    <label className="radio">
                                                        <input type="radio" defaultChecked name="answer"></input>
                                                        Nam
                                                    </label>
                                                    <label className="radio">
                                                        <input type="radio" name="answer"></input>
                                                        Nữ
                                                    </label>
                                                </div>
                                            </div>
                                        </Grid>
                                        <Grid item xs={4} sm={6} md={6}>
                                            <Box>
                                                <label className="label">Photo</label>
                                                {!selectedImage ? (
                                                    <Button
                                                        onClick={handleUploadImage}
                                                        sx={{
                                                            backgroundSize: 'cover',
                                                            backgroundPosition: 'center',
                                                            width: '160px',
                                                            height: '160px',
                                                            borderRadius: '50%',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            cursor: 'pointer',
                                                            border: '2px dashed rgb(243, 156, 18)',
                                                        }}
                                                    >
                                                        <input
                                                            ref={fileInputRef}
                                                            type="file"
                                                            onChange={handleImageChange}
                                                            style={{ display: 'none' }}
                                                        />
                                                        <AddPhotoAlternateIcon fontSize="large" sx={{ ...buttonStyle }} />
                                                    </Button>
                                                ) : (
                                                    <div>

                                                        <button
                                                            onClick={() => setSelectedImage(null)}
                                                            style={{
                                                                backgroundSize: 'cover',
                                                                backgroundPosition: 'center',
                                                                width: '160px',
                                                                height: '160px',
                                                                borderRadius: '50%',
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                justifyContent: 'center',
                                                                cursor: 'pointer',
                                                                border: '2px dashed rgb(243, 156, 18)',
                                                            }}
                                                        >
                                                            <img
                                                                src={selectedImage}
                                                                alt="Selected"
                                                                style={{ width: '100%', height: '100%', borderRadius: '50%' }}
                                                            />
                                                        </button>
                                                    </div>
                                                )}
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </Box>
                                <Box sx={{ flexGrow: 1 }}>
                                    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                                        <Grid item xs={4} sm={6} md={6}>
                                            <div className="field">
                                                <label className="label">Trình độ chuyên môn</label>
                                                <input className="input is-primary" type="text" placeholder="Primary input"></input>
                                            </div>
                                        </Grid>
                                        <Grid item xs={4} sm={6} md={6}>
                                            <div className="field">
                                                <label className="label">Thành tựu</label>
                                                <input className="input is-primary" type="text" placeholder="Primary input"></input>
                                            </div>
                                        </Grid>
                                    </Grid>
                                </Box>
                                <Box sx={{ flexGrow: 1 }}>
                                    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                                        <Grid item xs={4} sm={6} md={6}>
                                            <div className="field">
                                                <label className="label">Chức vụ</label>
                                                <input className="input is-primary" type="text" placeholder="Primary input"></input>
                                            </div>
                                        </Grid>
                                        <Grid item xs={4} sm={6} md={6}>
                                            <div className="field">
                                                <label className="label">Vị trí chuyên môn</label>
                                                <input className="input is-primary" type="text" placeholder="Primary input"></input>
                                            </div>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </div>

                            <div style={{ zIndex: 1000, backgroundColor: "rgba(184, 176, 180, 0.09)", borderRadius: "20px", padding: "15px", marginTop: "30px" }}>
                                <Typography variant="h6" style={{ fontWeight: "bold", paddingBottom: "20px", textDecoration: "underline" }} component="h2">Contact Info:</Typography>

                                <Box sx={{ flexGrow: 1 }}>
                                    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                                        <Grid item xs={4} sm={6} md={6}>
                                            <div className="field">
                                                <label className="label">Email</label>
                                                <input className="input is-primary" type="text" placeholder="Primary input"></input>
                                            </div>
                                        </Grid>
                                        <Grid item xs={4} sm={6} md={6}>
                                            <div className="field">
                                                <label className="label">Faceboook</label>
                                                <input className="input is-primary" type="text" placeholder="Primary input"></input>
                                            </div>
                                        </Grid>
                                    </Grid>
                                </Box>
                                <Box sx={{ flexGrow: 1 }}>
                                    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                                        <Grid item xs={4} sm={6} md={6}>
                                            <div className="field">
                                                <label className="label">username</label>
                                                <input className="input is-primary" type="text" placeholder="Primary input"></input>
                                            </div>
                                        </Grid>
                                        <Grid item xs={4} sm={6} md={6}>
                                            <div className="field">
                                                <label className="label">password</label>
                                                <input className="input is-primary" type="text" placeholder="Primary input"></input>
                                            </div>
                                        </Grid>
                                    </Grid>
                                </Box>

                                <Box sx={{ flexGrow: 1 }}>
                                    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                                        <Grid item xs={4} sm={6} md={6}>
                                            <div className="field">
                                                <label className="label">Phone</label>
                                                <input className="input is-primary" type="number" placeholder="Primary input"></input>
                                            </div>
                                        </Grid>
                                        {/* <Grid item xs={4} sm={6} md={6}>
                                            <div className="field">
                                                <label className="label">password</label>
                                                <input className="input is-primary" type="text" placeholder="Primary input"></input>
                                            </div>
                                        </Grid> */}
                                    </Grid>
                                </Box>
                            </div>

                            <div className="field is-grouped " style={{ paddingTop: "20px", display: "flex", justifyContent: "flex-end" }}>
                                <div className="control">
                                    <button className="button is-link">Submit</button>
                                </div>
                                <div className="control">
                                    <button className="button is-link is-light" onClick={handleClose}>Cancel</button>
                                </div>
                            </div>
                        </Typography>
                    </Box>
                </Modal>
            </div >
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
    overflow: 'scroll',
    height: '70%',
    display: 'block'
};

export default ExpertManager