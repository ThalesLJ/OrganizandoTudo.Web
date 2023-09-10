import React from 'react';
import { Outlet, Link } from "react-router-dom";

import { FiHome, FiSettings, FiLogOut } from "react-icons/fi";

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
                    <br /><br />
                    <div className='navicon-content not-vis'>
                        <div className='navicon'>
                            <Link className='icon' to="settings"><FiSettings /></Link>
                        </div>
                    </div>
                    <br /><br />
                    <div className='navicon-content not-vis'>
                        <div className='navicon'>
                            <Link className='icon' to="settings"><FiSettings /></Link>
                        </div>
                    </div>
                    <br /><br />
                    <div className='navicon-content not-vis'>
                        <div className='navicon'>
                            <Link className='icon' to="settings"><FiSettings /></Link>
                        </div>
                    </div>
                    <br /><br />
                    <div className='navicon-content not-vis'>
                        <div className='navicon'>
                            <Link className='icon' to="settings"><FiSettings /></Link>
                        </div>
                    </div>
                    <br /><br />
                    <div className='navicon-content logout'>
                        <div className='navicon'>
                            <Link className='icon' to="/"><FiLogOut /></Link>
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
