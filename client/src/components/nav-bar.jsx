//import React from 'react';
//import { Link } from 'react-router-dom';

import React from "react";

const Navbar = () => {
  return (
    <React.Fragment>
      <section >
          <nav className="bg-sky-900 h-20 w-full flex items-center justify-between px-10">
        <div>
        <p className='text-white font-bold text-2xl'>Nirogya Pharmacy</p>
        </div>

        <div className='flex item-center gap-x-5'>
            <div className='text-white font-semibold'>Logout</div>


        </div>

    </nav>
    </section>
    </React.Fragment>
  );
};

export default Navbar;
