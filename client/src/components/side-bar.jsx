import React from 'react'
import { SidebarAdmin } from '../components/side-bar-admin.jsx';
// import { SidebarCashier } from '../components/side-bar-admin.jsx';
// import { SidebarSupplier } from '../components/side-bar-admin.jsx';
import { NavLink } from "react-router-dom";

const SidebarA = () => {
  const activeLink = 'bg-sky-700 text-white mt-7 w-full h-14 flex justify-start items-center pl-7';
  const normalLink = 'text-white hover:bg-sky-500 mt-7 w-full h-14 flex justify-start items-center pl-7';

  return (
    <React.Fragment>
      <section>
        <div className="text-white">
          {
            SidebarAdmin.map((item, index) => {
              return (
                <div key={index}>
                  <NavLink to={item.path}
                    className={({ isActive }) =>
                      isActive ? activeLink : normalLink}
                  >
                    <span className="icon">{item.icon}</span>
                    <span className="title">{item.title}</span>
                  </NavLink>
                </div>
              )
            })
          }

          {/* 
          SidebarCashier.map((item, index) => {
            return (
              <div key={index}>
                <NavLink to={item.path}
                  className={({ isActive }) =>
                    isActive ? activeLink : normalLink}
                >
                  <span className="icon">{item.icon}</span>
                  <span className="title">{item.title}</span>
                </NavLink>
              </div>
            )
          })
          */}

          {/* 
          SidebarSupplier.map((item, index) => {
            return (
              <div key={index}>
                <NavLink to={item.path}
                  className={({ isActive }) =>
                    isActive ? activeLink : normalLink}
                >
                  <span className="icon">{item.icon}</span>
                  <span className="title">{item.title}</span>
                </NavLink>
              </div>
            )
          })
          */}
        </div>
      </section>
    </React.Fragment>
  )
}

export default SidebarA;
