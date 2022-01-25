import Layout from '../components/Layout';
import '../styles/globals.css';
import '../styles/index.css';
import { AppContext } from '../components/context';
import { useState } from 'react';
import Head from 'next/head';
import favicon from '../config/config.json';

function MyApp({ Component, pageProps }) {
  const [showSearch, setShowSearch] = useState(false);
  const [showSearchPosts, setShowSearchPosts] = useState([]);

  return <AppContext.Provider value={{value1:[showSearch, setShowSearch], value2:[showSearchPosts, setShowSearchPosts]}}><Head><link rel="icon" href={favicon.parameter.favicon}></link></Head><Layout><Component {...pageProps} /></Layout></AppContext.Provider>
}

export default MyApp
