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
import { getAuthor } from '../../lib/author';
import shareOption from '../../config/config.json';
import { kebabCase } from '../../utils/kebabcase';
import socialIcons from '../../config/config.json';
import { BsFillTagFill, BsFillCalendar2DateFill } from 'react-icons/bs';

export default function PostPage({ frontmatter: { title, date, author, images, tag, category }, content, slug, suggestedBlog, authors }) {

  const remainingBlogs = suggestedBlog.filter(b => b.slug !== slug);
  const blogByAuthor = remainingBlogs.filter(r => r.frontmatter.author === author);
  const sortedBlogByAuthor = blogByAuthor.sort(sortByDate);
  const recentBlogByAuthor = sortedBlogByAuthor.slice(0, 2);
  const authorDetails = authors.filter(a => a.frontmatter.name === author);

  const postShare = shareOption.parameter.sharePost;
  let options = { year: "numeric", month: "short", day: "numeric" };

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div className={`${styles.singleBlog} container md:m-auto`}>
        <div className="w-full xl:w-2/3 items-center md:m-auto px-8 xl:px-0">
          <div className={`${styles.blogContainer} my-10 sm:mt-16 md:mt-24 sm:mb-16 `}>
            <h1 className="text-h4 lg:text-h2   text-textColor mb-4 sm:mb-6">{title}</h1>
            <div className="flex items-center sm:justify-between">
              <div className={`flex flex-wrap ${styles.author}`}>
                <div className="flex items-center mr-1 sm:mr-3 mb-2">
                  {
                    authors.map((a, i) => a.frontmatter.name === author && <div key={i}><img src={a.frontmatter.image} /></div>)
                  }
                  <span className="blog-tag "><Link href={`/authors/${kebabCase(author)}`}><a>{author}</a></Link></span>
                </div>
                <div className="flex items-center mr-1 sm:mr-3 mb-2">
                  <small className="text-textLight flex items-center text-base">
                    <div className="date mr-1"><BsFillCalendar2DateFill /></div> {new Date(date).toLocaleDateString("en-US", options)}</small>
                </div>
                <div className="flex items-center  text-textLight mr-1 sm:mr-3 mb-2">
                  <div className="tag mr-2"><BsFillTagFill /></div>
                  {
                    category.map((c, i) => (
                      <Link key={i} href={`/categories/${kebabCase(c)}`}>
                        <a className="flex items-center blog-tag mr-1">{i== 0 ? '' : ','} {c}</a>
                      </Link>
                    ))
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="px-4 xl:px-0 mx-auto text-center mb-10">
          <Image layout={'responsive'} height={140} width={350} objectFit={'cover'} src={images}></Image>
        </div>

        {/* Read content from markdown files */}

        <div className="px-8 md:px-0 w-full md:w-2/3 m-auto mb-10 md:mb-14">
          <div className="prose-h1:text-h1 prose-p:text-lg prose-h2:text-h2 prose-h3:text-h3 prose-h4:text-lg sm:prose-h4:text-2xl prose-p:mb-6 prose-h4:mb-6 prose-h4:text-black prose-h4:font-bold text-textLight prose-li:mb-5 prose-li:text-large prose-p:leading-8 " dangerouslySetInnerHTML={{ __html: marked.parse(content) }}>
          </div>
        </div>

        <div className="md:flex md:justify-between md:w-2/3 block m-auto mb-10 md:mb-20">
          <div className={`text-center md:text-right md:justify-between ${styles.postTag}`}>
            <ul className="flex items-center justify-center ">
              <div className="tag mr-2"><BsFillTagFill /></div>
              {
                tag.map((t, i) => (
                  <li key={i}>
                    <Link href={`/tags/${kebabCase(t)}`}>
                      <a className=" blog-tag mr-2"> {i == 0 ? '' : ','} {t}  </a></Link>
                  </li>
                ))
              }
            </ul>
          </div>
          <div className="text-center md:text-right md:justify-between">
            {
              postShare &&
              <div className={`${styles.socialLink} my-5 md:my-0 flex justify-center`}>
                <a className="social-icon-bg ml-0 bg-facebook" href={`https://www.facebook.com/sharer/sharer.php?u=+https://fornax-blogs.netlify.app/blog/${slug}`} target="_blank" rel="noopener noreferrer"><FaFacebookF /></a>
                <a className="social-icon-bg bg-twitter" href={`https://twitter.com/intent/tweet/?text=What%20else%20do%20we%20need%20to%20make%20this%20a%20success%3f&url=+https://fornax-blogs.netlify.app/blog/${slug}`} target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
                <a className="social-icon-bg bg-instagram" href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
                <a className="social-icon-bg bg-dribles " href="/#"><FaDribbble /></a>
              </div>
            }
          </div>
        </div>

        <div className={` flex justify-center items-center mb-16 md:mb-24`}>
          <div className={`mx-auto w-full max-w-xl py-8 px-6 sm:px-8 sm:pt-8 sm:pb-14 shadow-2xl ${styles.writer}`}>
            <div className="text-center">
              {
                authors.map((a, i) => a.frontmatter.name === author && <div key={i} className="flex items-center justify-center mb-5" ><img height={150} width={150} src={a.frontmatter.image} /></div>)
              }
              <div className=" w-full">
                <p className="text-textLight pb-2">Written By</p>
                <h5 className="author-title"><Link href={`/authors/${kebabCase(author)}`}>{author}</Link></h5>
                {
                  author && authorDetails.map((a, i) => (
                    <div key={i} className="text-center prose-p:text-large leading-7 mb-8 text-textLight" dangerouslySetInnerHTML={{ __html: marked.parse(a.content).slice(0, 150) }}>
                    </div>
                  ))
                }
              </div>
            </div>
            <ul className={`flex items-center justify-center  ${styles.writersLink}`}>
              {
                socialIcons.socialMedia.map(s => (
                  <li key={s.name} className="social-icon ">
                    <a className="ml-5" href={s.link}><i className={`not-italic ${s.icon}`}></i></a>
                  </li>
                ))
              }
            </ul>
          </div>
        </div>

        {/* some blog show */}
        <h3 className={`text-textColor text-h3_sm md:text-h3   ${styles.secondHeader}`}>You may also Like</h3>
        <div className="mt-10 mb-10 flex flex-wrap justify-center px-8 xl;px-0">
          {
            recentBlogByAuthor.map((r, i) => {
              return (
                <div key={i} className="px-4 mb-10 sm:mb-14 bg-body md:w-1/2 lg:w-1/3 overflow-hidden">
                  <div className={styles.cardHeader}>
                    <Link href={`/blog/${r.slug}`} ><a className="mb-8 block">
                      <Image layout="responsive" width={350} height={200} objectFit={'cover'} src={r.frontmatter.images} ></Image>
                    </a>
                    </Link>
                    <h3 className="text-h4 mb-4 blog-title ">
                      <Link href={`/blog/${r.slug}`} ><a>{r.frontmatter.title}</a></Link>
                    </h3>
                  </div>
                  <div className="flex flex-wrap mb-4">
                    <div className="flex items-center">
                      <div className="tag"><BsFillTagFill /></div>
                      {
                        r.frontmatter.category.map((c, i) => (
                          <Link key={i} href={`/categories/${kebabCase(c)}`} >
                            <a className={`blog-tag flex items-center  mr-1  `}>{i== 0 ? '' : ','} {c}</a>
                          </Link>
                        ))
                      }

                    </div>

                  </div>
                  <div className=" text-base sm:text-large text-textLight pr-4">
                    <span dangerouslySetInnerHTML={{ __html: marked.parse(r.content).slice(0, 130) + ' ...' }} className="text-textLight"></span>
                  </div>
                  <div className="flex items-centers my-5">
                    <div className="sm:mr-3 mr-1 mb-2">
                      <div className={` flex ${styles.author}`}>
                        {
                          authors.map((a, i) => a.frontmatter.name === r.frontmatter.author && <div key={i}><img src={a.frontmatter.image} /></div>)
                        }
                      </div>
                    </div>
                    <div className="sm:mr-3 mr-1 mb-2">
                      <span><Link href={`/authors/${kebabCase(r.frontmatter.author)}`}><a className="blog-tag">{r.frontmatter.author}</a></Link></span>
                      <small className="text-textLight flex items-center text-base">
                        {new Date(r.frontmatter.date).toLocaleDateString("en-US", options)}</small>
                    </div>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>

    </>
  )
}

export async function getStaticPaths() {
  const files = fs.readdirSync(path.join('content/posts'))

  const paths = files.map(filename => ({
    params: {
      slug: filename.replace('.md', '')
    }
  }))

  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params: { slug } }) {
  const markedDownMeta = fs.readFileSync(path.join('content/posts',
    slug.replace(/ /g, " ") + ".md"), 'utf8')
  const { data: frontmatter, content } = matter(markedDownMeta)

  // Read suggested blog from markdown
  const files = fs.readdirSync(path.join('content/posts'))
  const suggestedBlog = files.map(filename => {
    const slug = filename.replace('.md', '').replace(/ /g, "-")

    // get frontmatter
    const markedDownMeta = fs.readFileSync(path.join('content/posts', filename),
      'utf8')

    const { data: frontmatter, content } = matter(markedDownMeta)

    return {
      slug,
      frontmatter,
      content
    }
  })

  const authors = getAuthor()

  return {
    props: {
      frontmatter: frontmatter,
      content,
      slug,
      suggestedBlog,
      authors
    }
  }
}
