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
                    <div className='navicon'>
                        <FiHome>
                            <Link to=""></Link>
                        </FiHome>
                    </div>
                    <br /><br />
                    <div className='navicon'>
                        <FiSettings className='navicon'>
                            <Link to="settings"></Link>
                        </FiSettings>
                    </div>
                </div>
            </div>

            <div className='body'>
                <Outlet />
            </div>
        </div>
    );
}
