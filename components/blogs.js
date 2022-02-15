import React from 'react';
import Image from 'next/dist/client/image';
import Link from 'next/link';
import styles from '../styles/blogs.module.css';
import { marked } from 'marked';
import { kebabCase } from '../utils/kebabcase';
import { BsFillTagFill } from 'react-icons/bs';
import { BsFillCalendar2DateFill } from 'react-icons/bs';

const Blogs = ({ postsBlog, authors }) => {
  let options = { year: "numeric", month: "short", day: "numeric" }
  return (
    <div className={styles.container}>
      <div className="flex flex-wrap justify-center container m-auto mt-10 sm:mt-16 md:mt-24 sm:mb-5 px-8 xl:px-0">
        {
          postsBlog.map((b, i) => {
            return (
              <div key={i} className="sm:px-2 mb-10 sm:mb-14 bg-body md:w-1/2 lg:w-1/3 overflow-hidden">
                <div className={styles.cardHeader}>
                  <Link href={`/blog/${b.slug}`} ><a className="mb-4 sm:mb-8 block"> <Image layout="responsive" width={350} height={200} objectFit={'cover'} preload="true" placeholder="blur" blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABAQMAAAAl21bKAAAAAXNSR0IB2cksfwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAANQTFRF2+HjWMCWZAAAAApJREFUeJxjYAAAAAIAAUivpHEAAAAASUVORK5CYII=" src={b.frontmatter.images} ></Image></a>
                  </Link>
                  <h3 className="blog-title">
                    <Link href={`/blog/${b.slug}`} ><a className="">{b.frontmatter.title}</a></Link>
                  </h3>
                </div>
                <div className="flex flex-wrap mb-2 sm:mb-4 ">
                  <div className="sm:mr-3 mr-1 mb-2">
                    <div className={` flex ${styles.author}`}>
                      {
                        authors.map((a, i) => a.frontmatter.name === b.frontmatter.author && <div  key={i}><img src={a.frontmatter.image} /></div>)
                      }
                      <span><Link href={`/authors/${kebabCase(b.frontmatter.author)}`}><a className="blog-tag">{b.frontmatter.author}</a></Link></span>
                    </div>

                  </div>
                  <div className="sm:mr-3 mr-1 mb-2">
                    <small className="text-textLight flex items-center text-base">
                      <div className="date"><BsFillCalendar2DateFill/></div>
                      {new Date(b.frontmatter.date).toLocaleDateString("en-US", options)}</small>
                  </div>
                  <div className="flex items-center mb-2"> 
                    <div className="tag"><BsFillTagFill/></div>
                    {
                      b.frontmatter.category.map((c, i) => (
                     
                        <Link key={i} href={`/categories/${kebabCase(c)}`} >
                          
                          <a className={`blog-tag flex items-center mr-1 ${styles.tags}`}>{c} ;</a>
                        </Link>
                      ))
                    }
                  </div>
                </div>
                <div className=" text-base lg:text-large text-textLight pr-4" dangerouslySetInnerHTML={{ __html: marked.parse(b.content).slice(0, 140) + ' ...' }}>
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