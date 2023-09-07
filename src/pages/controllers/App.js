import React from 'react';
import { Outlet, Link } from "react-router-dom";
import "../styles/App.css";

export default function App() {
    return (
        <div>

            <div className='container'>

                <div className="navbar">
                    <div className='navbar-body'>
                        <br />
                        <span><Link to="/">Notes</Link></span>
                        <br /><br />
                        <span><Link to="/settings">Settings</Link></span>
                    </div>
                </div>

                <div className='body'>
                    <Outlet />
                </div>

            </div>

            <div className="footer">
                <span>©2023 by Thales Lima</span>
            </div>

        </div>
    );
}
