import React, { useState } from 'react';
import styles from '../styles/search.module.css';
import { useContext } from 'react';
import Link from 'next/link';
import { AppContext } from './context';
import { blogData } from './blogData';



const Search = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [showSearch, setShowSearch] = useContext(AppContext);

  const searchAllBlogs = blogData.filter(val => {
    if (searchTerm === "") {
      return ""
    }
    else if (val.tags.toLowerCase().includes(searchTerm.toLowerCase())) {
      return val
    }
    else if (val.heading.toLowerCase().includes(searchTerm.toLowerCase())) {
      return val
    }
  })

  const resetSearchInput = () => {
    setShowSearch(!showSearch)
    setSearchTerm("");
  }


  return (
    <div className={`${styles.searchContainer} container`}>
      <div className="fixed right-0 left-0 top-0 sm:top-20 z-50 justify-center items-center md:inset-0 h-modal sm:h-full" id="large-modal">
        <div className={`relative px-4 w-full md:w-2/3 max-w-4xl h-full md:h-auto ${styles.searchModal}`}>
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="flex justify-between items-center rounded-t border-b dark:border-gray-600">
              <input className="rounded focus:outline-none	w-full" type="text" value={searchTerm} placeholder="Search here" onChange={(e) => { setSearchTerm(e.target.value) }} />

              <button onClick={resetSearchInput} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-3 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="large-modal">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
              </button>
            </div>
            {
              searchAllBlogs.length ?
                <div className="my-7 w-full justify-center container inline-block">
                  {
                    searchAllBlogs.map((b, i) => {
                      return (
                        <div key={b.id} className="p-4 block border-b-2  overflow-hidden">

                          <div onClick={() => setShowSearch(!showSearch)} className={`text-2xl ${styles.heading}`}>
                            <Link href={`/${b.heading.replace(/ /g, "-")}`} >{b.heading}</Link>
                          </div>

                          <div className="flex mt-6">
                            <div className="sm:mr-4 mr-1">
                              <div className={`flex ${styles.author}`}>
                                <img className="mr-2" src="https://1.gravatar.com/avatar/d278a48fabb0e7ccd38b69e2920c5f99?s=30&d=mm&r=g" />
                                <span><Link href={`/about/${b.name}`}><a className="text-gray-500">{b.name}</a></Link></span>
                              </div>

                            </div>
                            <div className="sm:mr-4 mr-1"><small className="text-gray-700">&#x25C8; {b.date}</small>
                            </div>
                            <div className="sm:mr-4 mr-1">
                              <Link href={`/tags/${b.tags}`}>
                                <a className="text-gray-500">&#x25C8; {b.tags}</a>
                              </Link>
                            </div>
                          </div>

                        </div>
                      )
                    })
                  }
                </div> :
                <div className='my-3'>
                  {searchTerm === "" ? <p className='text-center'></p>
                    : <p className='text-center text-2xl'>Not found!</p>}
                </div>
            }

          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;