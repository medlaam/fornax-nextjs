import React, { useContext, useState } from 'react';
import Image from 'next/dist/client/image';
import Link from 'next/link';
import styles from '../styles/blogs.module.css';
import { blogData } from './blogData';
import { AppContext } from './context';

const Blogs = ({ blogs }) => {
  const [showSearch] = useContext(AppContext);
  const [searchTerm, setSearchTerm] = useState('')
  const blog = blogData

  //search filter blogs
  const searchData = blogs.filter(val => {
    if (searchTerm === "") {
      return blog
    }
    // else if (val.tags.toLowerCase().includes(searchTerm.toLowerCase())) {
    //   return val
    // }
    // else if (val.heading.toLowerCase().includes(searchTerm.toLowerCase())) {
    //   return val
    // }
  })

  // Search all blogs
  const searchAllBlogs = blog.filter(val => {
    if (searchTerm === "") {
      return val
    }
    else if (val.tags.toLowerCase().includes(searchTerm.toLowerCase())) {
      return val
    }
    else if (val.heading.toLowerCase().includes(searchTerm.toLowerCase())) {
      return val
    }
  })

  return (
    <div className={styles.container}>
      {
        showSearch &&
        <form className="text-center" action="" method="post">
          <input className="border-2 rounded focus:outline-none	" type="text" placeholder="Search here" onChange={e => setSearchTerm(e.target.value)} />
        </form>
      }
      {
        searchData.length ?
          <div className="flex flex-wrap my-7 justify-center">
            {
              searchData.map((b, i) => {
                return (
                  <div key={b.id} className="p-4 bg-white md:w-1/2 lg:w-1/3   overflow-hidden">
                    <div className={styles.cardHeader}>
                      <Image src={b.image} ></Image>
                      <div className="mt-4">
                        <Link href={`/${b.heading.replace(/ /g,"-")}`} >{b.heading}</Link>
                      </div>
                    </div>

                    <div className="flex mt-6">
                      <div className="mr-4">
                        <div className={`flex ${styles.author}`}>
                          <img src="https://1.gravatar.com/avatar/d278a48fabb0e7ccd38b69e2920c5f99?s=30&d=mm&r=g" />
                          <span><Link href="/about"><a className="text-gray-500">{b.name}</a></Link></span>
                        </div>

                      </div>
                      <div className="mr-4">
                        <Link href={`/tags/${b.tags}`} >
                          <a className={`text-gray-500 ${styles.tags}`}>&#x25C8; {b.tags}</a>
                        </Link>
                      </div>
                      <div className="mr-4"><small className="text-gray-700">&#x25C8; {b.date}</small>
                      </div>
                    </div>
                    <div className="mt-4 mb-3">
                      <span className='text-gray-400'>{b.details}</span>
                    </div>
                  </div>
                )
              })
            }
          </div>
          :
          searchAllBlogs.length ?
            <div className="flex flex-wrap my-7 justify-center">
              {
                searchAllBlogs.map((b, i) => {
                  return (
                    <div key={b.id} className="p-4 bg-white lg:w-1/3  overflow-hidden">
                      <div className={styles.cardHeader}>
                        <Image src={b.image} ></Image>
                        <div className="mt-4">
                          <Link href={`/${b.heading}`} >{b.heading}</Link>
                        </div>
                      </div>

                      <div className="flex mt-6">
                        <div className="mr-4">
                          <div className={`flex ${styles.author}`}>
                            <img src="https://1.gravatar.com/avatar/d278a48fabb0e7ccd38b69e2920c5f99?s=30&d=mm&r=g" />
                            <span><Link href="/about"><a className="text-gray-500">{b.name}</a></Link></span>
                          </div>

                        </div>
                        <div className="mr-4"><small className="text-gray-500">&#x25C8; {b.tags}</small>
                        </div>
                        <div className="mr-4"><small className="text-gray-700">&#x25C8; {b.date}</small>
                        </div>
                      </div>
                      <div className="mt-4 mb-3">
                        <span className="text-gray-400" >{b.details}</span>
                      </div>
                    </div>
                  )
                })
              }
            </div> :
            <div className='my-14'>
              <p className='text-center text-2xl'>Not found!</p>
            </div>
      }
    </div>
  );
};

export default Blogs;


