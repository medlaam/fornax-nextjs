import React, { useState } from 'react';
import { blogData } from '../../components/blogData';
import { useRouter } from 'next/dist/client/router';
import styles from '../../styles/singleblog.module.css';
import Image from 'next/dist/client/image';
import { FaFacebookF, FaTwitter, FaInstagram, FaDribbble } from 'react-icons/fa';
import Link from 'next/link';
import Head from 'next/head';

const SingleBlog = () => {
  // const [suggestBlog, setSuggestBlog] = useState(true);
  const router = useRouter()
  const blogID = router.query.blogId
  const blogs = [...blogData]
  const blog = blogData.find(b => b.id == blogID)
  const remainingBlogs = blogs.filter(b => b.id != blogID && b.tags==blog.tags)
  const remBlog = remainingBlogs.slice(0, 2);

  // Blog by Author
  const blogByAuthor = blogs.filter(ba => ba.id != blogID && ba.name == blog.name)

  // All Blog
  const b = [...blogByAuthor,...remBlog]

  const rb = [...new Set(b)].slice(0,2)
  console.log('remaining blog',rb);

  // const blogsByDate = blogs.sort((a,b) => (a.date) - a.date)
  // console.log('blogsbyDate',blogsByDate);

  const sortByDate = b.sort((a,c) => new Date(c.date) - new Date(a.date))
  const uniqueBlog = [...new Set(sortByDate)].slice(0,2)

  // const suggestedBlog = [...blogByAuthor,...uniqueBlog].slice(0,2)
  // console.log('suggested blog',suggestedBlog);
  

  return (
    <>
    <Head>
      <title>{blog.heading}</title>
    </Head>
    <div className={`${styles.singleBlog} container m-auto`}>
      <div className="w-2/3 items-center m-auto">
        <div className={`${styles.blogContainer} p-10 m-10`}>
          <h1 className="">{blog.heading}</h1>
          <div className="flex mt-5">
            <div className={`flex ${styles.author}`}>
              <img src="https://1.gravatar.com/avatar/d278a48fabb0e7ccd38b69e2920c5f99?s=30&d=mm&r=g" />
              <span className=""><small>AZUMI</small></span>
              <div className="flex-auto ml-5"><small>&#x25C8; {blog.tags}</small>
              </div>
              <div className="flex-auto ml-5"><small>&#x25C8; {blog.date}</small>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="m-auto my-5 text-center">
        <Image layout={'responsive'} height={550} objectFit={'cover'} src={blog.image}></Image>
      </div>

      <div className="my-5 w-2/3 m-auto">
        <h3 className="text-2xl text-gray-500	">{blog.blogHeading}</h3>
        <p className="mt-5 text-xl text-gray-500">{blog.blogDetails}</p>
        <h1 className="mt-10 text-3xl font-bold">Creative Design</h1>
        <p className="mt-5 text-xl text-gray-500">{blog.blogDetails}</p>
        <p className="mt-5 text-xl text-gray-500">{blog.blogDetails1}</p>
        <div className="my-5">
          <Image layout={'responsive'} src={blog.blogImage}></Image>
        </div>
      </div>
      <div className="flex justify-between my-5 p-10 m-20">
        <div className={`flex justify-evenly mr-24 ${styles.postTag}`}>
          <a href={`/tags/${blog.tags}`} className="ml-5">{blog.tags}</a>
          <a href="" className="ml-5">Tech</a>
        </div>
        <div className="mr-10">
          <ul className={`${styles.socialLink} flex`}>
            <li style={{ backgroundColor: '#395693' }} className="ml-5"><a href=""><FaFacebookF /></a></li>
            <li style={{ backgroundColor: '#1C9CEA' }} className="ml-5"><a href=""><FaTwitter /></a></li>
            <li style={{ backgroundColor: '#894DB8' }} className="ml-5"><a href=""><FaInstagram /></a></li>
            <li style={{ backgroundColor: '#E34A85' }} className="ml-5"><a href=""><FaDribbble /></a> </li>
          </ul>
        </div>
      </div>
      <h4 className={styles.secondHeader}>You may also Like</h4>
      <div className="my-5 flex flex-wrap justify-center">

        {
          uniqueBlog.map(r => {
            return (
              <div key={r.id} className="p-4 bg-white sm:w-1 lg:w-1/3 md:w-1/2  overflow-hidden">
                <div className={styles.cardHeader}>
                  <Image src={r.image} ></Image>
                  <div className="mt-4">
                    <Link href={`/${r.id}`} >{r.heading}</Link>
                  </div>
                </div>
                <div className="flex mt-6">
                  <div className="flex-auto">
                    <div className={`flex ${styles.author}`}>
                      <img src="https://1.gravatar.com/avatar/d278a48fabb0e7ccd38b69e2920c5f99?s=30&d=mm&r=g" />
                      <span><small>{r.name}</small></span>
                    </div>

                  </div>
                  <div className="flex-auto"><small>&#x25C8; {r.tags}</small>
                  </div>
                  <div className="flex-auto"><small>&#x25C8; {r.date}</small>
                  </div>
                </div>
                <div className="mt-4 mb-3">
                  <span>{r.details}</span>
                </div>
              </div>
            )
          })
        }
      </div>
      <div className={`${styles.writer} my-14 flex flex-col	justify-center`}>
          <div>
            <img src="https://1.gravatar.com/avatar/d278a48fabb0e7ccd38b69e2920c5f99?s=135&d=mm&r=g" alt="" />
          </div>
          <div className="text-center mt-5 w-2/3">
            <p>Written By</p>
            <h5 className="mt-3">{blog.name}</h5>
            <p className="mt-4">Maecenas sit amet purus eget ipsum elementum venenatis. Aenean maximus urna magna elementum venenatis, quis rutrum mi semper non purus eget ipsum elementum venenatis.</p>
          </div>
          <ul className={`flex mt-5 ${styles.writersLink}`}>
            <li className="ml-5"><a href="#"><FaFacebookF/></a></li>
            <li className="ml-5"><a href="#"><FaTwitter/></a></li>
            <li className="ml-5"><a href="#"><FaInstagram/></a></li>
            <li className="ml-5"><a href="#"><FaDribbble/></a></li>
          </ul>
      </div>
    </div>
    </>
  );
};

SingleBlog.getInitialProps = ({ query: { id } }) => {
  const b = { id }
  return {
    props: b
  }
}


export default SingleBlog;
