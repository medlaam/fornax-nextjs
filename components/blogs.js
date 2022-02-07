import React from 'react';
import Image from 'next/dist/client/image';
import Link from 'next/link';
import styles from '../styles/blogs.module.css';
import { marked } from 'marked';
import { kebabCase } from '../utils/kebabcase';


const Blogs = ({ postsBlog, authors }) => {
  let options = { year: "numeric", month: "long", day: "numeric" }
  return (
    <div className={styles.container}>
      <div className="flex flex-wrap my-7 justify-center container m-auto">
        {
          postsBlog.map((b, i) => {
            return (
              <div key={i} className="p-4  bg-body md:w-1/2 lg:w-1/3   overflow-hidden">
                <div className={styles.cardHeader}>
                  <Image layout="responsive" width={350} height={200} objectFit={'cover'} src={b.frontmatter.images} ></Image>
                  <h3 className="mt-4 text-h4 md:text-h4">
                    <Link href={`/blog/${b.slug}`} ><a className="block text-textColor transition  duration-300 ease-in-out hover:text-primaryColor">{b.frontmatter.title}</a></Link>
                  </h3>
                </div>

                <div className="flex flex-wrap mt-4">
                  <div className="sm:mr-4 mr-1">
                    <div className={`flex ${styles.author}`}>
                      {
                        authors.map((a, i) => a.frontmatter.name === b.frontmatter.author && <div key={i}><img src={a.frontmatter.image} /></div>)
                      }
                      <span><Link href={`/authors/${kebabCase(b.frontmatter.author)}`}><a className="text-textLight text-small">{b.frontmatter.author}</a></Link></span>
                    </div>

                  </div>
                  <div className="sm:mr-4 mr-1"><small className="text-textLight">&#x25C8; {new Date(b.frontmatter.date).toLocaleDateString("en-US", options)}</small>
                  </div>
                  <div className="sm:mr-4 mr-1">
                    {
                      b.frontmatter.category.map((c, i) => (
                        <Link key={i} href={`/categories/${kebabCase(c)}`} >
                          <a className={`text-textLight text-small ml-0 md:ml-1 ${styles.tags}`}>&#x25C8; {c}</a>
                        </Link>
                      ))
                    }
                  </div>

                </div>
                <div className="mt-3 mb-3 text-small md:text-large text-textLight" dangerouslySetInnerHTML={{ __html: marked.parse(b.content).slice(0, 140) + ' ...' }}>
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