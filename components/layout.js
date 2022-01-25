import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import MobileMenu from './mobileMenu';
import Footer from './footer';
import Navbar from './navbar';
import config from "../config/style.json";

const Layout = ({ children }) => {
  const { fontFamily } = config.font;
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen(!isOpen);

  };
  useEffect(() => {
    const hiddenMenu = () => {
      if (window.innerWidth > 768 && isOpen) {
        setIsOpen(false);

      }
    };
    window.addEventListener('resize', hiddenMenu);

    return () => {
      window.removeEventListener('resize', hiddenMenu);
    };
  });
  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href={`https://fonts.googleapis.com/css2?family=${fontFamily.primary}&display=swap`}
          rel="stylesheet"
        />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/brands.min.css" crossOrigin="anonymous"
          referrerPolicy="no-referrer" />
      </Head>
      <div className="font-primary bg-body selection:bg-primaryColor selection:text-textWhite">
        <Navbar toggle={toggle} isOpen={isOpen} />
        <MobileMenu toggle={toggle} isOpen={isOpen} />
        <main>{children}</main>
        <Footer />
      </div>
    </>

  );
};

export default Layout;