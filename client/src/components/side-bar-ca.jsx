import React from 'react';
import { SidebarCashier } from '../components/side-bar-admin.jsx';
import { NavLink } from "react-router-dom";

const SidebarC = () => {
    const activeLink = 'bg-sky-700 text-white mt-7 w-full h-14 flex justify-start items-center pl-7 ';
    const normalLink = 'text-white hover:bg-sky-500 mt-7 w-full h-14 flex justify-start items-center pl-7 ';

    return (
        <React.Fragment>
            <section>
                <div className="text-white">
                    {SidebarCashier.map((item, index) => (
                        <div key={index}>
                            <NavLink 
                                to={item.path}
                                className={({ isActive }) =>
                                    isActive ? activeLink : normalLink}
                            >
                                <span className="icon">{item.icon}</span>
                                <span className="title">{item.title}</span>
                            </NavLink>
                        </div>
                    ))}
                </div>
            </section>
        </React.Fragment>
    );
}

export default SidebarC;
