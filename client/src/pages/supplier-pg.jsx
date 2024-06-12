import React from 'react';
import Navbar from '../components/nav-bar.jsx';
import SideBarS from '../components/side-bar-su.jsx';
import SupplierNav from '../components/supplier-nav.jsx';


function SupplierPg() {
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
                <div className='w-1/6 bg-sky-600 h-screen'>
                    <SideBarS/>
                </div>

                <div className='flex-1 h-screen pl-2 overflow-auto'>
              <SupplierNav/>
                </div>
               

                </div>


            </section>

        </React.Fragment>
    );
}

export default SupplierPg;
