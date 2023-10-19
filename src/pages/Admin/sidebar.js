import React, { useState } from "react";
import './css/sidebar.css'
import logo from "../../image/rmbg-logo.png"
import { Link, useNavigate } from "react-router-dom";

const SideBar = ({ selectContent }) => {
    const navigate = useNavigate()
    const [selectedContent, setSelectedContent] = useState('Giao dịch')

    const handleSelectContent = (content) => {
        setSelectedContent(content)
        selectContent(content)
    }

    const handleLogout = () => {
        localStorage.removeItem("admin");
        navigate('/blw-manager/login')
    }
    return (
        <div id="nav-bar">
            <div id="nav-header" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <a id="nav-title" href='#tab-trans'>
                    <img style={{ width: 60, height: 60 }} src={logo}></img>&nbsp; DASHBOARD
                </a>
                <hr />
            </div>
            <div id="nav-content">
                <div id="tab-cus" className={selectedContent === 'Khách hàng' ? " nav-button active" : "nav-button"} onClick={() => handleSelectContent('Khách hàng')}><i className="fas fa-user"></i><span>Khách hàng</span></div>
                <div id="tab-expert" className={selectedContent === 'Chuyên gia' ? " nav-button active" : "nav-button"} onClick={() => handleSelectContent('Chuyên gia')}><i className="fas fa-user-tie"></i><span>Chuyên gia</span></div>
                <div id="tab-trans" className={selectedContent === 'Giao dịch' ? " nav-button active" : "nav-button"} onClick={() => handleSelectContent('Giao dịch')}><i className="fas fa-hand-holding-dollar"></i><span>Giao dịch</span></div>
                <hr />
                <div id="tab-recipe" className={selectedContent === 'Công Thức' ? " nav-button active" : "nav-button"} onClick={() => handleSelectContent('Công thức')}><i className="fas fa-utensils"></i><span>Công thức</span></div>
                <div id="tab-food" className={selectedContent === 'Nguyên Liệu' ? " nav-button active" : "nav-button"} onClick={() => handleSelectContent('Nguyên liệu')}><i className="fas fa-burger"></i><span>Nguyên liệu</span></div>
                <hr />


                <div id="nav-content-highlight"></div>
            </div><input id="nav-footer-toggle" type="checkbox" />
            <div id="nav-footer">
                <div id="nav-footer-heading" onClick={handleLogout}>
                    <div className="nav-button">
                        <i className="fas fa-right-from-bracket"></i>&nbsp;&nbsp;&nbsp;
                        <span>Sign out</span>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default SideBar