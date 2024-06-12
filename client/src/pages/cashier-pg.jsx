import React from 'react';
import Navbar from '../components/nav-bar.jsx';
import SideBarC from '../components/side-bar-ca.jsx';
import CashierNav from '../components/cashier-nav.jsx';

function CashierPg() {
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
                        <SideBarC/>
                    </div>
                    <div className='flex-1 h-screen pl-2 overflow-auto'>
                        <CashierNav/>
                    </div>
                </div>
            </section>
        </React.Fragment>
    );
}

export default CashierPg;
