import React from 'react'
import { Navbar } from '../components/header/Navbar'
import { Signup } from '../pages/user/Signup'
// import { Outlet } from 'react-router-dom'

export const UserLayout = () => {
  return (
    <div>
      {/* <Navbar/> */}
 <Signup/>
      {/* <Outlet/> */}
    </div>
  )
}

