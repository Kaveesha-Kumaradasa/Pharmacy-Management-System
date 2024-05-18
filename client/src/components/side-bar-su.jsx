import React from 'react';
import { SidebarSupplier } from '../components/side-bar-admin.jsx';
import { NavLink } from "react-router-dom";

const Sidebar = () => {
    const activeLink = 'hover:bg-sky 800 mt-7 pl-7 w-full h-14 flex justify-start items-center text-white text-xl space-x-1  bg-sky-800'
    const normalLink = 'hover:bg-sky-800 pl-7 mt-7 w-full h-14 flex justify-start items-center text-white text-xl space-x-1 '

  return (
    <React.Fragment>
    <section >
      <div className="text-white">

          {
               SidebarSupplier.map((item, index)=>{
                return(
                    <div key={index}>
                        <NavLink to={item.path}
                        className={({ isActive }) =>
                        isActive ? activeLink: normalLink}
                      
                         >
                        <span>{item.icon}</span>
                        <span>{item.title}</span>
                        </NavLink>
                        
                    </div>
                )
              })
            }
  
  

  
      </div>
    </section>
  </React.Fragment>
  )
}

export default Sidebar;