import React from 'react'
import { Outlet } from 'react-router-dom'
import { Navbar } from '../components/header/Navbar'

export const UserLayout = () => {
  return (
    <div>
      <Navbar/>
      <Outlet/>
    </div>
  )
}

