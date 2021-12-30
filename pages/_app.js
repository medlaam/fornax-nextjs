import Layout from '../components/Layout'
import '../styles/globals.css'
import '../styles/index.css'
import { AppContext } from '../components/context';
import { useState } from 'react';

function MyApp({ Component, pageProps }) {
  const [showSearch, setShowSearch] = useState(false);
  const [showSearchPosts, setShowSearchPosts] = useState([]);

  return <AppContext.Provider value={{value1:[showSearch, setShowSearch], value2:[showSearchPosts, setShowSearchPosts]}}><Layout><Component {...pageProps} /></Layout></AppContext.Provider>
}

export default MyApp
