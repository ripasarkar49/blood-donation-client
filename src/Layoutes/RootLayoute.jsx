import React from 'react'
import { Outlet } from 'react-router'
import Navbar from '../Components/Navbar'

const RootLayoute = () => {
  return (
    <div>
        <Navbar></Navbar>
      <Outlet></Outlet>
    </div>
  )
}

export default RootLayoute
