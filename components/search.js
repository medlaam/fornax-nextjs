import React, { useState } from 'react';
import styles from '../styles/search.module.css';
import { useContext } from 'react';
import Link from 'next/link';
import { AppContext } from './context';
import { kebabCase } from '../utils/kebabcase';


const Search = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const { value1, value2 } = useContext(AppContext);
  const [showSearch, setShowSearch] = value1
  const [showSearchPosts, setShowSearchPosts] = value2

  const searchAllBlogs = showSearchPosts.filter(val => {
    if (searchTerm === "") {
      return ""
    }
    else if (val.frontmatter.tag[0].toLowerCase().includes(searchTerm.toLowerCase())) {
      return val
    }
    else if (val.frontmatter.title.toLowerCase().includes(searchTerm.toLowerCase())) {
      return val
    }
  })

  const resetSearchInput = () => {
    setShowSearch(!showSearch)
    setSearchTerm("");
  }

  let options = { year: "numeric", month: "long", day: "numeric" };

  return (
    <>
      <div className={`${styles.searchContainer} relative`}>
        <div className={`${styles.search} overflow-auto fixed right-0 left-0 top-0 sm:top-20 z-50 justify-center items-center md:inset-0 h-modal sm:h-full`} id="large-modal">
          <div className={`relative px-4 w-full md:w-2/3 max-w-4xl h-full md:h-auto ${styles.searchModal}`}>
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <div className="flex justify-between items-center rounded-t  dark:border-gray-600">
                <input className="rounded focus:outline-none	w-full" type="text" value={searchTerm} placeholder="Search here" onChange={(e) => { setSearchTerm(e.target.value) }} />

                <button onClick={resetSearchInput} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-3 mr-2 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="large-modal">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                </button>
              </div>
              {
                searchAllBlogs.length ?
                  <div className="w-full border-t-2 border-dotted justify-center inline-block">
                    {
                      searchAllBlogs.map((b, i) => {
                        return (
                          <div key={i} className="p-4 block border-b-2  overflow-hidden">

                            <div onClick={() => setShowSearch(!showSearch)} className={`text-2xl ${styles.heading}`}>
                              <Link href={`/blog/${b.slug}`} ><a className="md:text-textDark hover:text-primaryColor">{b.frontmatter.title}</a></Link>
                            </div>
                            <div className="flex mt-6">
                              <div className="sm:mr-4 mr-1">
                                <div className={`flex ${styles.author}`}>
                                  <span>
                                    <a className="text-textLight">{b.frontmatter.author}</a></span>
                                </div>
                              </div>
                              <div className="sm:mr-4 mr-1"><small className="text-gray-700">&#x25C8; {new Date(b.frontmatter.date).toLocaleDateString("en-US", options)}</small>
                              </div>
                              <div className="sm:mr-4 mr-1">
                                <a className="text-textLight">&#x25C8; {kebabCase(b.frontmatter.tag[0])}</a>
                              </div>
                            </div>

                          </div>
                        )
                      })
                    }
                  </div> :
                  <div className=''>
                    {searchTerm === "" ? <p className='text-center'></p>
                      : <p className='text-center text-2xl p-4  border-t-2 border-dotted'>Not found!</p>}
                  </div>
              }

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Search;