import React, { useEffect, useState } from 'react';
import styles from '../styles/search.module.css';
import { useContext } from 'react';
import Link from 'next/link';
import { AppContext } from './context';
import { kebabCase } from '../utils/kebabcase';
import { BsFillTagFill } from 'react-icons/bs';
import { BsFillCalendar2DateFill } from 'react-icons/bs';


const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { toggleSearch } = useContext(AppContext);
  const [showSearch, setShowSearch] = toggleSearch;

  const [search, setSearch] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      const res = await fetch("/api/search");

      const post = await res.json();
      setSearch(post);
    };
    getPosts();
  }, []);

  const searchAllBlogs = search.filter(val => {
    if (searchTerm === "") {
      return "";
    }
    else if (val.frontmatter.category[0].toLowerCase().includes(searchTerm.toLowerCase())) {
      return val;
    }
    else if (val.frontmatter.title.toLowerCase().includes(searchTerm.toLowerCase())) {
      return val;
    }
  });

  const resetSearchInput = () => {
    setShowSearch(!showSearch);
    setSearchTerm("");
  };

  let options = { year: "numeric", month: "long", day: "numeric" };

  return (
    <>
      <div  className={`${styles.searchContainer} relative`}>
        <div  className={`${styles.search} transition-all overflow-auto fixed right-0 left-0 top-0 sm:top-20 z-50 justify-center items-center md:inset-0 h-modal sm:h-full`} id="large-modal">
          <div className={`relative px-4 w-full md:w-2/3 max-w-4xl  ${styles.searchModal}`}>
            <div className="relative bg-body rounded-lg shadow">
              <div className="flex justify-between items-center rounded-t">
                <input className="rounded focus:outline-none bg-body	w-full" type="text" value={searchTerm} placeholder="Search here" onChange={(e) => { setSearchTerm(e.target.value) }} ref={inputElement => {if (inputElement) {
                    inputElement.focus();
                  }
                }} />

                <button onClick={resetSearchInput} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 transition  duration-300 ease-in-out hover:text-gray-900 rounded-lg text-sm p-3 mr-2 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="large-modal">
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

                            <div onClick={() => setShowSearch(!showSearch)} className={`blog-title ${styles.heading}`}>
                              <Link href={`/blog/${b.slug}`} ><a className="">{b.frontmatter.title}</a></Link>
                            </div>
                            <div className="flex">
                              <div className="sm:mr-4 mr-1"><small className="flex items-center blog-tag">
                                <div className="date mr-2"><BsFillCalendar2DateFill/></div>
                                {new Date(b.frontmatter.date).toLocaleDateString("en-US", options)}</small>
                              </div>
                              <div className="flex items-center sm:mr-4 mr-1 ">
                                <div className="tag">
                                <BsFillTagFill/>
                              </div>
                                {
                                  b.frontmatter.category.map((c, i) => (
                                    <a key={i} className="blog-tag flex items-center mr-2"> {kebabCase(c)} ;</a>
                                  ))
                                }
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