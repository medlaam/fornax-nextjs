import Layout from '../components/Layout'
import '../styles/globals.css'
import '../styles/index.css'
import { AppContext } from '../components/context';
import { useState } from 'react';

function MyApp({ Component, pageProps }) {
  const [showSearch, setShowSearch] = useState(false);

  return <AppContext.Provider value={[showSearch, setShowSearch]}><Layout><Component {...pageProps} /></Layout></AppContext.Provider>
}

export default MyApp
