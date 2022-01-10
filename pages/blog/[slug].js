import React from 'react';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { FaFacebookF, FaTwitter, FaInstagram, FaDribbble } from 'react-icons/fa';
import styles from '../../styles/singleblog.module.css';
import { sortByDate } from '../../utils';


export default function PostPage({ frontmatter: { title, date, tags, name, images, tags2, authorImage }, content, slug, suggestedBlog }) {

  const remainingBlogs = suggestedBlog.filter(b => b.slug !== slug);
  const blogByAuthor = remainingBlogs.filter(r => r.frontmatter.name === name);
  const sortedBlogByAuthor = blogByAuthor.sort(sortByDate)
  const recentBlogByAuthor = sortedBlogByAuthor.slice(0, 2)

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div className={`${styles.singleBlog} container md:m-auto`}>
        <div className="w-full xl:w-2/3 items-center md:m-auto ">
          <div className={`${styles.blogContainer} p-4  py-16 `}>
            <p className="lg:text-5xl text-4xl">{title}</p>
            <div className="flex items-center sm:justify-between mt-5">
              <div className={`flex ${styles.author}`}>
                <img loading="lazy" src={authorImage} />
                <span className="text-gray-500"><Link href={`/about/${name}`}><a className="text-gray-500">{name}</a></Link></span>
                <div className="flex-auto ml-5"><small className="text-gray-500">&#x25C8; {date}</small>
                </div>
                <div className="flex-auto ml-5 text-gray-500">
                  <Link href={`/tags/${tags}`}>
                    <a>&#x25C8; {tags}</a>
                  </Link>
                </div>

              </div>
            </div>
          </div>
        </div>
        <div className="m-auto my-5 text-center">
          <Image layout={'responsive'} height={140} width={350} objectFit={'cover'} src={images}></Image>
        </div>

        {/* Read content from markdown files */}

        <div className="my-5 w-full p-4 md:w-2/3 m-auto">
          <div className="mt-5 text-xl text-gray-500" dangerouslySetInnerHTML={{ __html: marked.parse(content) }}>
          </div>
        </div>

        <div className="md:flex md:justify-around block my-5 sm:py-10 m-20">
          <div className={`text-center md:text-right md:justify-between ${styles.postTag}`}>
            <ul className="flex justify-center my-5 md:my-0">
              <li><Link href={`/tags/${tags}`}><a className="md:mr-5 ml-3">{tags}</a></Link>
              </li>
              <li><Link href={`/tags/${tags2}`}><a className="md:mr-5 ml-3">{tags2}</a></Link></li>
            </ul>
          </div>
          <div className="text-center md:text-right md:justify-between">
            <ul className={`${styles.socialLink} my-5 md:my-0 flex justify-center`}>
              <li style={{ backgroundColor: '#395693' }} className="ml-5"><a href={`https://www.facebook.com/sharer/sharer.php?u=+https://liberte-blogs.netlify.app/blog/${slug}`} target="_blank" rel="noopener noreferrer"><FaFacebookF /></a></li>
              <li style={{ backgroundColor: '#1C9CEA' }} className="ml-5"><a href={`https://twitter.com/intent/tweet/?text=What%20else%20do%20we%20need%20to%20make%20this%20a%20success%3f&url=+https://liberte-blogs.netlify.app/blog/${slug}`} target="_blank" rel="noopener noreferrer"><FaTwitter /></a></li>
              <li style={{ backgroundColor: '#894DB8' }} className="ml-5"><a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer"><FaInstagram /></a></li>
              <li style={{ backgroundColor: '#E34A85' }} className="ml-5"><a href=""><FaDribbble /></a> </li>
            </ul>
          </div>
        </div>
        <h4 className={styles.secondHeader}>You may also Like</h4>
        <div className="my-5 flex flex-wrap justify-center">

          {
            recentBlogByAuthor.map((r, i) => {
              return (
                <div key={i} className="p-4 bg-white md:w-1/2 lg:w-1/3 overflow-hidden">
                  <div className={styles.cardHeader}>
                    <Image layout="responsive" width={350} height={200} objectFit={'cover'} src={r.frontmatter.images} ></Image>
                    <div className="mt-4">
                      <Link href={`/blog/${r.slug}`} >{r.frontmatter.title}</Link>
                    </div>
                  </div>
                  <div className="flex mt-6">
                    <div className="sm:mr-4 mr-1">
                      <div className={`flex ${styles.author}`}>
                        <img src="https://1.gravatar.com/avatar/d278a48fabb0e7ccd38b69e2920c5f99?s=30&d=mm&r=g" />
                        <span><Link href={`/about/${r.frontmatter.name}`}><a className="text-gray-500">{r.frontmatter.name}</a></Link></span>
                      </div>

                    </div>
                    <div className="sm:mr-4 mr-1"><small className="text-gray-700">&#x25C8; {r.frontmatter.date}</small>
                    </div>
                    <div className="sm:mr-4 mr-1"> <Link href={`/tags/${r.frontmatter.tags}`}>
                      <a className={`text-gray-500 ${styles.tags}`}>&#x25C8; {r.frontmatter.tags}</a>
                    </Link>
                    </div>

                  </div>
                  <div className="mt-4 mb-3">
                    <span dangerouslySetInnerHTML={{ __html: marked.parse(r.content).slice(0, 130) + ' ...' }} className="text-gray-500"></span>
                  </div>
                </div>
              )
            })
          }
        </div>
        <div className={`${styles.writer} my-14 flex flex-col	justify-center`}>
          <div>
            <img src={authorImage} alt="" />
          </div>
          <div className="text-center mt-5 w-2/3">
            <p>Written By</p>
            <h5 className="mt-3"><Link href={`/about/${name}`}>{name}</Link></h5>
            <p className="mt-4">Maecenas sit amet purus eget ipsum elementum venenatis. Aenean maximus urna magna elementum venenatis, quis rutrum mi semper non purus eget ipsum elementum venenatis.</p>
          </div>
          <ul className={`flex mt-5 ${styles.writersLink}`}>
            <li className="ml-5"><a href={`https://www.facebook.com/`}><FaFacebookF /></a></li>
            <li className="ml-5"><a href={`https://twitter.com/`}><FaTwitter /></a></li>
            <li className="ml-5"><a href={`https://instagram.com/`}><FaInstagram /></a></li>
            <li className="ml-5"><a href="#"><FaDribbble /></a></li>
          </ul>
        </div>
      </div>

    </>
  )
}

export async function getStaticPaths() {
  const files = fs.readdirSync(path.join('posts'))

  const paths = files.map(filename => ({
    params: {
      slug: filename.replace('.md', '').replace(/ /g,"-")
    }
  }))

  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params: { slug } }) {
  const markedDownMeta = fs.readFileSync(path.join('posts',
  slug.replace(/-/g, " ") + ".md"), 'utf8')
  const { data: frontmatter, content } = matter(markedDownMeta)

  // Read suggested blog from markdown
  const files = fs.readdirSync(path.join('posts'))
  const suggestedBlog = files.map(filename => {
    const slug = filename.replace('.md', '').replace(/ /g,"-")

    // get frontmatter
    const markedDownMeta = fs.readFileSync(path.join('posts', filename),
      'utf8')

    const { data: frontmatter, content } = matter(markedDownMeta)

    return {
      slug,
      frontmatter,
      content
    }
  })
  return {
    props: {
      frontmatter: frontmatter,
      content,
      slug,
      suggestedBlog
    }
  }
}
