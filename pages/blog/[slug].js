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


export default function PostPage({ frontmatter: { title, date, author, images, tag, category }, content, slug, suggestedBlog, authors }) {

  const remainingBlogs = suggestedBlog.filter(b => b.slug !== slug);
  const blogByAuthor = remainingBlogs.filter(r => r.frontmatter.author === author);
  const sortedBlogByAuthor = blogByAuthor.sort(sortByDate);
  const recentBlogByAuthor = sortedBlogByAuthor.slice(0, 2);
  const authorDetails = authors.filter(a => a.frontmatter.name === author);

  const postShare = shareOption.parameter.sharePost;
  let options = { year: "numeric", month: "long", day: "numeric" };

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div className={`${styles.singleBlog} container md:m-auto`}>
        <div className="w-full xl:w-2/3 items-center md:m-auto ">
          <div className={`${styles.blogContainer} p-4  py-16 `}>
            <h1 className="text-h1_sm lg:text-h1 text-textColor">{title}</h1>
            <div className="flex items-center sm:justify-between mt-5">
              <div className={`flex flex-wrap ${styles.author}`}>
                {
                  authors.map((a, i) => a.frontmatter.name === author && <div key={i}><img src={a.frontmatter.image} /></div>)
                }
                <span className="text-textLight"><Link href={`/authors/${kebabCase(author)}`}><a>{author}</a></Link></span>
                <div className="flex-auto ml-5"><small className="text-textLight">&#x25C8; {new Date(date).toLocaleDateString("en-US", options)}</small>
                </div>
                <div className="flex-auto ml-5 text-textLight">
                  {
                    category.map((c, i) => (
                      <Link key={i} href={`/categories/${kebabCase(c)}`}>
                        <a className="m-0 md:m-2">&#x25C8; {c}</a>
                      </Link>
                    ))
                  }
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
          <div className="mt-5 prose-h1:text-h1 prose-p:text-lg prose-h2:text-h2 prose-h3:text-h3 prose-h4:text-2xl" dangerouslySetInnerHTML={{ __html: marked.parse(content) }}>
          </div>
        </div>

        <div className="md:flex md:justify-between md:w-2/3 block my-5 sm:py-10 m-auto">
          <div className={`text-center md:text-right md:justify-between ${styles.postTag}`}>
            <ul className="flex justify-center my-5 md:my-0">
              {
                tag.map((t, i) => (
                  <li key={i}>
                    <Link href={`/tags/${kebabCase(t)}`}><a className="md:mr-5 ml-3 text-textColor hover:text-primaryColor"># {t}</a></Link>
                  </li>
                ))
              }
            </ul>
          </div>
          <div className="text-center md:text-right md:justify-between">
            {
              postShare &&
              <div className={`${styles.socialLink} my-5 md:my-0 flex justify-center`}>
                <a className="bg-facebook text-textWhite" href={`https://www.facebook.com/sharer/sharer.php?u=+https://fornax-blogs.netlify.app/blog/${slug}`} target="_blank" rel="noopener noreferrer"><FaFacebookF /></a>
                <a className="ml-5 bg-twitter text-textWhite" href={`https://twitter.com/intent/tweet/?text=What%20else%20do%20we%20need%20to%20make%20this%20a%20success%3f&url=+https://fornax-blogs.netlify.app/blog/${slug}`} target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
                <a className="ml-5 bg-instagram text-textWhite" href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
                <a className="ml-5 bg-dribles text-textWhite" href="/#"><FaDribbble /></a>
              </div>
            }
          </div>
        </div>
        <h3 className={`text-textColor text-h3_sm md:text-h3   ${styles.secondHeader}`}>You may also Like</h3>
        <div className="my-5 flex flex-wrap justify-center">

          {
            recentBlogByAuthor.map((r, i) => {
              return (
                <div key={i} className="p-4 bg-body md:w-1/2 lg:w-1/3 overflow-hidden">
                  <div className={styles.cardHeader}>
                    <Image layout="responsive" width={350} height={200} objectFit={'cover'} src={r.frontmatter.images} ></Image>
                    <div className="mt-4">
                      <Link href={`/blog/${r.slug}`} ><a className="text-textColor hover:text-primaryColor">{r.frontmatter.title}</a></Link>
                    </div>
                  </div>
                  <div className="flex flex-wrap mt-6">
                    <div className="sm:mr-4 mr-1">
                      <div className={`flex ${styles.author}`}>
                        {
                          authors.map((a, i) => a.frontmatter.name === r.frontmatter.author && <div key={i}><img src={a.frontmatter.image} /></div>)
                        }
                        <span><Link href={`/about/${r.frontmatter.author}`}><a className="text-textLight">{r.frontmatter.author}</a></Link></span>
                      </div>

                    </div>
                    <div className="sm:mr-4 mr-1"><small className="text-textLight">&#x25C8; {new Date(r.frontmatter.date).toLocaleDateString("en-US", options)}</small>
                    </div>
                    <div className="sm:mr-4 mr-1">

                      {
                        r.frontmatter.category.map((c, i) => (
                          <Link key={i} href={`/categories/${kebabCase(c)}`} >
                            <a className={`text-textLight text-small ml-0 md:ml-1`}>&#x25C8; {c}</a>
                          </Link>
                        ))
                      }

                    </div>

                  </div>
                  <div className="mt-4 mb-3">
                    <span dangerouslySetInnerHTML={{ __html: marked.parse(r.content).slice(0, 130) + ' ...' }} className="text-textLight"></span>
                  </div>
                </div>
              )
            })
          }
        </div>
        <div className={` py-10 px-4 sm:px-6 flex justify-center items-center`}>
          <div className={`mx-auto w-full max-w-xl ${styles.writer}`}>
            <div className="text-center">
              {
                authors.map((a, i) => a.frontmatter.name === author && <div key={i} className="flex items-center justify-center" ><img src={a.frontmatter.image} /></div>)
              }
              <div className=" mt-5 w-full">
              <p className="text-textLight">Written By</p>
              <h5 className="mt-3 text-h5 text-textColor hover:text-primaryColor"><Link href={`/authors/${kebabCase(author)}`}>{author}</Link></h5>
              {
                authorDetails.map((a, i) => (
                  <p key={i} className="mt-4" dangerouslySetInnerHTML={{ __html: marked.parse(a.content).slice(0, 150) }}></p>
                ))
              }
            </div>
            </div>
            
            <ul className={`flex items-center justify-center mt-5 ${styles.writersLink}`}>
              {
                socialIcons.socialMedia.map(s => (
                  <li key={s.name} className="hover:text-primaryColor">
                    <a className="ml-5" href={s.link}><i className={`not-italic ${s.icon}`}></i></a>
                  </li>
                ))
              }
            </ul>
          </div>
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
