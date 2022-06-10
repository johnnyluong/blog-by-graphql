import React, { Children } from 'react'
import { Header } from './'

// This is a wrapper to add the header to every page when it is rendered 
// -> used in _app.tsx with the children being whatever components we pass in
const Layout = ({ children }) => {
  return (
    <>
        <Header />
        {children}
    </>
  )
}

export default Layout