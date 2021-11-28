import React, { useState, useEffect } from 'react'
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
    <div>
      <Navbar toggle={toggle} isOpen={isOpen} />
      <MobileMenu toggle={toggle} isOpen={isOpen} />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;