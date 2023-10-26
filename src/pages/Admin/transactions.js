import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import Swal from "sweetalert2";
import CircularProgress from '@mui/material/CircularProgress';
import ReactDOM from 'react-dom';
import ReactPaginate from 'react-paginate';
// import "./css/transaction.css"

const Transactions = () => {
    const navigate = useNavigate()
    const admin = JSON.parse(localStorage.getItem('admin'))
    const accessToken = admin?.token
    const [transactionData, setTransactionData] = useState({ data: [] });
    console.log(transactionData.data)

    const handleUpdatePayment = (id, privateCode) => {
        console.log('payment:', id)
        Swal.fire({
            title: `Approve payment <strong>${privateCode}?</strong>`,
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            cancelButtonColor: '#d33',
            confirmButtonColor: '#3085d6',

            confirmButtonText: 'Yes, approve it!'
        }).then((result) => {
            if (result.isConfirmed) {
                if (admin) {
                    const updatePaymentURL = `https://blw-api.azurewebsites.net/api/Payments/UpdatePaymentStatus?paymentId=${id}`
                    fetch(updatePaymentURL, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${accessToken}`,
                        }
                    })
                        .then(response => {
                            if (!response.ok) {
                                throw new Error('Failed to fetch payment data');
                            } else {
                                Swal.fire({
                                    position: 'top-end',
                                    icon: 'success',
                                    title: 'Updated',
                                    width: 600,
                                    height: 600,
                                    showConfirmButton: false,
                                    timer: 1500
                                })
                            }
                            return response.json();
                        })
                        .then(data => {
                            setTransactionData(prevData => {
                                const updatedData = prevData.data.map(payment => {
                                    if (payment.paymentId === id) {
                                        return { ...payment, paymentStatus: true };
                                    }
                                    return payment;
                                });
                                return { data: updatedData };
                            });
                        })
                        .catch(error => {
                            console.error(error);
                        });
                } else {
                    navigate('/blw-manager/login');
                }
            }
        })

    }


    useEffect(() => {
        getTransaction()
    }, [])


    const getTransaction = async () => {
        if (admin) {
            fetch(`https://blw-api.azurewebsites.net/api/Payments/GetPayments`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                }
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Failed to fetch payment data');
                    }
                    return response.json();
                })
                .then(data => {
                    setTransactionData(data);
                })
                .catch(error => {
                    console.error(error);
                });

        } else {
            navigate('/blw-manager/login');
        }
    }

    useEffect(() => {
        if (admin) {
            const timer = setTimeout(() => {
                getTransaction();
            }, 18000);
        }
    }, [admin])

    // --- PAGINATE
    console.log(Array.isArray(transactionData.data))
    const items = transactionData.data

    function Items({ currentItems }) {
        return (
            <>

                <div className="col-md-12-trans">
                    <div className="table-wrap">
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th >Mã đơn</th>
                                    <th>Tên KH</th>
                                    <th>Tên gói</th>
                                    <th>Đơn giá</th>
                                    <th>Ngày giao dịch</th>
                                    <th>Tiền nhận</th>
                                    <th>Trạng thái</th>
                                    <th>Duyệt đơn</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentItems &&
                                    currentItems.map((item) => (
                                        <tr style={{ alignContent: "center" }} id={item.paymentId} key={item.paymentId}>
                                            <td style={{ fontWeight: "800" }}>{item.privateCode}</td>
                                            <td>{item.customerName}</td>
                                            <td>{item.packageName}</td>
                                            <td>{item.packagePrice}</td>
                                            <td>{new Date(item.createDate).toLocaleDateString()}</td>
                                            <td>{item.amount}</td>
                                            <td>
                                                {item.paymentStatus === false ? (
                                                    <p className="has-text-danger" style={{ fontWeight: "700" }}>Chưa duyệt</p>
                                                ) : (
                                                    <p className="has-text-success" style={{ fontWeight: "700" }}>Đã duyệt</p>
                                                )}
                                            </td>
                                            <td style={{ textAlign: "center" }}>
                                                {item.paymentStatus === false ? (
                                                    <button onClick={() => handleUpdatePayment(item.paymentId, item.privateCode)} className="button is-rounded" style={{ width: "25px", color: "inherit" }}><FontAwesomeIcon color="green" icon={faCheck} /></button>
                                                ) : (
                                                    <p className="has-text-success" style={{ fontWeight: "700" }}>Thành công</p>
                                                )}

                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                </div>


            </>
        );
    }
    function PaginatedItems({ itemsPerPage }) {
        const [itemOffset, setItemOffset] = useState(0);
        const endOffset = itemOffset + itemsPerPage;
        console.log(`Loading items from ${itemOffset} to ${endOffset}`);
        const currentItems = items.slice(itemOffset, endOffset);
        console.log('000000000000', items.length)
        const pageCount = Math.ceil(items.length / itemsPerPage);

        // Invoke when user click to request another page.
        const handlePageClick = (event) => {
            const newOffset = (event.selected * itemsPerPage) % items.length;
            console.log(
                `User requested page number ${event.selected}, which is offset ${newOffset}`
            );
            setItemOffset(newOffset);
        };

        return (
            <>
                <Items currentItems={currentItems} />
                <div style={{ display: "flex", justifyContent: "center", marginTop:"40px" }}>


                    <ReactPaginate
                        breakLabel="..."
                        nextLabel="next >"
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={5}
                        pageCount={pageCount}
                        previousLabel="< previous"
                        renderOnZeroPageCount={null}
                        previousClassName="pagination-previous"
                        breakClassName="pagination-ellipsis"
                        pageClassName="pagination-link"
                        nextClassName="pagination-next"
                        containerClassName="pagination is-rounded"
                        activeClassName="is-current"
                    />
                </div>
            </>
        );
    }


    return (
        <>
            <div style={{ backgroundColor: "#f3f6f4", height: "50px" }}>
                <nav className="breadcrumb" aria-label="breadcrumbs" style={{ display: "flex", justifyContent: "start", alignItems: "center", height: "100%" }}>
                    <ul style={{ display: "flex", alignItems: "center", listStyle: "none", padding: "0", margin: 0 }}>
                        <li style={{ paddingLeft: "20px" }}><a className="bread-crumb" href="/admin/dashboard">Trang chủ</a></li>
                        <li className="is-active"><a href="#" className="bread-crumb" aria-current="page">Giao dịch</a></li>
                    </ul>
                </nav>
            </div>
            <hr style={{ marginTop: "0.5rem", marginBottom: "0.5rem" }} />
            <div id="heading-title">
                <p id="heading" >Giao dịch</p>
            </div>
            <div style={{ display: "flex", paddingBottom: "40px" }}>
                <button disabled className="button is-rounded" style={{ border: "1px solid black", marginRight: "500px" }}> Tất cả ({transactionData?.data?.length || 0})</button>

                <Search>
                    <SearchIconWrapper>
                        <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                        placeholder="Tên kh..."
                        inputProps={{ 'aria-label': 'search' }}
                    />
                </Search>
                <Search>
                    <SearchIconWrapper>
                        <SearchIcon />
                    </SearchIconWrapper>
                    <StyledDateInputBase
                        placeholder="Tên kh..."
                        inputProps={{ 'type': 'date' }}
                    />
                </Search>

            </div>
            <div className="container-trans">
                {transactionData.data.length == 0 ? (
                    <Box sx={{ display: 'flex', justifyContent: "center" }}>
                        <CircularProgress />
                    </Box>
                ) : (
                    <>
                        <PaginatedItems itemsPerPage={10} />

                    </>
                )}

            </div >
        </>
    )
}
export default Transactions
const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    border: '1px solid black',
    borderRadius: '25px',
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));
const StyledDateInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        // transition: theme.transitions.create('width'),
        // width: '100%',
        // [theme.breakpoints.up('sm')]: {
        //     width: '12ch',
        //     '&:focus': {
        //         width: '20ch',
        //     },
        // },
    },
}));