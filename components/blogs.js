import React from 'react';
import Image from 'next/dist/client/image';
import Link from 'next/link';
import styles from '../styles/blogs.module.css';
import { marked } from 'marked';


const Blogs = ({ postsBlog }) => {
  return (
    <div className={styles.container}>
      <div className="flex flex-wrap my-7 justify-center container m-auto">
        {
          postsBlog.map((b, i) => {
            return (
              <div key={i} className="p-4 bg-white md:w-1/2 lg:w-1/3   overflow-hidden">
                <div className={styles.cardHeader}>
                  <Image layout="responsive" width={350} height={200} objectFit={'cover'} src={b.frontmatter.images} ></Image>
                  <div className="mt-4">
                    <Link href={`/blog/${b.slug}`} >{b.frontmatter.title}</Link>
                  </div>
                </div>

                <div className="flex mt-6">
                  <div className="sm:mr-4 mr-1">
                    <div className={`flex ${styles.author}`}>
                      <img src="https://1.gravatar.com/avatar/d278a48fabb0e7ccd38b69e2920c5f99?s=30&d=mm&r=g" />
                      <span><Link href={`/about/${b.frontmatter.name}`}><a className="text-gray-500">{b.frontmatter.name}</a></Link></span>
                    </div>

                  </div>
                  <div className="sm:mr-4 mr-1"><small className="text-gray-700">&#x25C8; {b.frontmatter.date}</small>
                  </div>
                  <div className="sm:mr-4 mr-1">
                    <Link href={`/tags/${b.frontmatter.tags}`} >
                      <a className={`text-gray-500 ${styles.tags}`}>&#x25C8; {b.frontmatter.tags}</a>
                    </Link>
                  </div>

                </div>
                <div className="mt-4 mb-3">
                  <span dangerouslySetInnerHTML={{ __html: marked.parse(b.content).slice(0, 140) + ' ...' }} className='text-gray-400'>
                  </span>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  );
};

export default Blogs;