import Footer from './Footer'
import Header from './Header'
import React from 'react'
import { Outlet } from 'react-router-dom'

const DefaultLayout: React.FC = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}

export default DefaultLayout
