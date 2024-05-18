import React from 'react';
import Navbar from '../components/nav-bar.jsx';
import SideBar from '../components/side-bar.jsx';
import AdminNav from '../components/admin-nav.jsx';


function AdminPg() {
    return (
        <React.Fragment>
            {/* heading section */}
            <section>
                <div>
                    <Navbar/>   
                </div>
            </section>
         <section>
                <div className='grid grid-cols-12'>
                <div className='col-span-1 bg-sky-900 h-screen pl-1 md:col-span-2'>
                    <SideBar/>
                </div>

                <div className='col-span-9 h-screen pl-2 md:col-span-10'>
              <AdminNav/>
                </div>
               

                </div>


            </section>

        </React.Fragment>
    );
}

export default AdminPg;
