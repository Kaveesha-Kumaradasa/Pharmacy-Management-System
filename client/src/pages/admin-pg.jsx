import React from 'react';
import Navbar from '../components/nav-bar.jsx';
import SideBarA from '../components/side-bar.jsx';
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
                <div className='flex'>
                    <div className='w-1/12 bg-sky-600 h-screen'>
                        <SideBarA/>
                    </div>
                    <div className='flex-1 h-screen pl-2 overflow-auto'>
                        <AdminNav/>
                    </div>
                </div>
            </section>
        </React.Fragment>
    );
}

export default AdminPg;
