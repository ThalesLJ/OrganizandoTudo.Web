import React from 'react';
import { Outlet, Link } from "react-router-dom";
import "../styles/App.css";

import { FiHome, FiSettings } from "react-icons/fi";

export default function App() {
    return (
        <div className='container'>
            <div className="nav">
                <div className='navbody'>
                    <br />
                    <div className='navicon-content'>
                        <div className='navicon'>
                            <Link className='icon' to=""><FiHome /></Link>
                        </div>
                    </div>
                    <br /><br />
                    <div className='navicon-content'>
                        <div className='navicon'>
                            <Link className='icon' to="settings"><FiSettings /></Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className='body'>
                <Outlet />
            </div>
        </div>
    );
}
