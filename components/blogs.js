import React from 'react';
import Image from 'next/dist/client/image';
import Link from 'next/link';
import styles from '../styles/blogs.module.css';
import { marked } from 'marked';
import { kebabCase } from '../utils/kebabcase';


const Blogs = ({ postsBlog, authors }) => {
  let options = { year: "numeric", month: "long", day: "numeric" };
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
                      {
                        authors.map((a, i) => a.frontmatter.name === b.frontmatter.author && <div key={i}><img src={a.frontmatter.image} /></div>)
                      }
                      <span><Link href={`/authors/${b.frontmatter.author}`}><a className="text-gray-500">{b.frontmatter.author}</a></Link></span>
                    </div>

                  </div>
                  <div className="sm:mr-4 mr-1"><small className="text-gray-700">&#x25C8; {new Date(b.frontmatter.date).toLocaleDateString("en-US", options)}</small>
                  </div>
                  <div className="sm:mr-4 mr-1">
                    <Link href={`/tags/${kebabCase(b.frontmatter.tag[0])}`} >
                      <a className={`text-gray-500 ${styles.tags}`}>&#x25C8; {b.frontmatter.tag[0]}</a>
                    </Link>
                    {/* {
                      b.frontmatter.tag.map((t,i) => <div key={i}>
                        <Link href={`/tags/${kebabCase(t)}`}>
                          <a className={`text-gray-500 ${styles.tags}`}>&#x25C8; {t[0]}</a>
                        </Link>
                      </div>)
                    } */}
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