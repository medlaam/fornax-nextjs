import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import MobileMenu from './MobileMenu';
import Footer from './footer';
import Navbar from './navbar';

const Layout = ({ children }) => {

  const [isOpen, setIsOpen] = useState(false)
  const toggle = () => {
    setIsOpen(!isOpen)

  }
  useEffect(() => {
    const hiddenMenu = () => {
      if (window.innerWidth > 768 && isOpen) {
        setIsOpen(false)

      }
    }
    window.addEventListener('resize', hiddenMenu)

    return () => {
      window.removeEventListener('resize', hiddenMenu)
    }
  })
  return (
    <>
      <Head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/brands.min.css" crossOrigin="anonymous"
        referrerPolicy="no-referrer"/>
      </Head>
      <div>
        <Navbar toggle={toggle} isOpen={isOpen} />
        <MobileMenu toggle={toggle} isOpen={isOpen} />
        <main>{children}</main>
        <Footer />
      </div>
    </>

  );
};

export default Layout;