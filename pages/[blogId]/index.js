import React, { useState } from 'react';
import { blogData } from '../../components/blogData';
import { useRouter } from 'next/router';
import styles from '../../styles/singleblog.module.css';
import Image from 'next/dist/client/image';
import { FaFacebookF, FaTwitter, FaInstagram, FaDribbble } from 'react-icons/fa';
import Link from 'next/link';
import Head from 'next/head';

const SingleBlog = () => {
  // const [suggestBlog, setSuggestBlog] = useState(true);
  const router = useRouter()
  const blogID = router.query.blogId.replace(/ /g, "-")
  const blogs = [...blogData]
  const blog = blogData.find(b => b.heading == blogID.replace(/-/g, " "))
  const remainingBlogs = blogs.filter(b => b.heading != blogID.replace(/-/g, " ") && b.tags == blog.tags)
  const remBlog = remainingBlogs.slice(0, 2);

  // Blog by Author
  const blogByAuthor = blogs.filter(ba => ba.heading != blogID.replace(/-/g, " ") && ba.name == blog.name)

  // All Blog
  const b = [...blogByAuthor, ...remBlog]

  const rb = [...new Set(b)].slice(0, 2)
  // console.log('remaining blog',rb);

  // const blogsByDate = blogs.sort((a,b) => (a.date) - a.date)
  // console.log('blogsbyDate',blogsByDate);

  const sortByDate = b.sort((a, c) => new Date(c.date) - new Date(a.date))
  const uniqueBlog = [...new Set(sortByDate)].slice(0, 2)

  // const suggestedBlog = [...blogByAuthor,...uniqueBlog].slice(0,2)
  // console.log('suggested blog',suggestedBlog);


  return (
    <>
      <Head>
        <title>{blog.heading}</title>
      </Head>
      <div className={`${styles.singleBlog} container md:m-auto`}>
        <div className="w-full xl:w-2/3 items-center md:m-auto ">
          <div className={`${styles.blogContainer} p-4  py-16 `}>
            <p className="lg:text-5xl text-4xl">{blog.heading}</p>
            <div className="flex items-center sm:justify-between mt-5">
              <div className={`flex ${styles.author}`}>
                <img loading="lazy" src="https://1.gravatar.com/avatar/d278a48fabb0e7ccd38b69e2920c5f99?s=30&d=mm&r=g" />
                <span className="text-gray-500"><Link href={`/about/${blog.name}`}><a className="text-gray-500">{blog.name}</a></Link></span>
                <div className="flex-auto ml-5"><small className="text-gray-500">&#x25C8; {blog.date}</small>
                </div>
                <div className="flex-auto ml-5 text-gray-500">
                  <Link href={`/tags/${blog.tags}`}>
                    <a>&#x25C8; {blog.tags}</a>
                  </Link>
                </div>

              </div>
            </div>
          </div>
        </div>
        <div className="m-auto my-5 text-center">
          <Image layout={'responsive'} height={550} objectFit={'cover'} src={blog.image}></Image>
        </div>

        <div className="my-5 w-full p-4 md:w-2/3 m-auto">
          <h3 className="text-2xl text-gray-500	">{blog.blogHeading}</h3>
          <p className="mt-5 text-xl text-gray-500">{blog.blogDetails}</p>
          <h1 className="mt-10 text-3xl font-bold">Creative Design</h1>
          <p className="mt-5 text-xl text-gray-500">{blog.blogDetails}</p>
          <p className="mt-5 text-xl text-gray-500">{blog.blogDetails1}</p>
          <div className="my-5">
            <Image layout={'responsive'} objectFit={'cover'} src={blog.blogImage}></Image>
          </div>
        </div>

        <div className="md:flex md:justify-between block my-5 sm:py-10 m-20">
          <div className={`justify-evenly ${styles.postTag}`}>
            <ul className="flex items-center">
              <li><Link href={`/tags/${blog.tags}`}><a className="ml-5">{blog.tags}</a></Link>
              </li>
              <li><a href="" className="ml-5">Tech</a></li>
            </ul>
          </div>
          <div className="text-center md:text-right md:justify-between">
            <ul className={`${styles.socialLink} my-5 md:my-0 flex `}>
              <li style={{ backgroundColor: '#395693' }} className="ml-5"><a href={`https://www.facebook.com/sharer/sharer.php?u=+https://liberte-blogs.vercel.app/${blog.heading}`} target="_blank" rel="noopener noreferrer"><FaFacebookF /></a></li>
              <li style={{ backgroundColor: '#1C9CEA' }} className="ml-5"><a href={`https://twitter.com/intent/tweet/?text=What%20else%20do%20we%20need%20to%20make%20this%20a%20success%3f&url=+https://liberte-blogs.vercel.app/${blog.heading}`} target="_blank" rel="noopener noreferrer"><FaTwitter /></a></li>
              <li style={{ backgroundColor: '#894DB8' }} className="ml-5"><a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer"><FaInstagram /></a></li>
              <li style={{ backgroundColor: '#E34A85' }} className="ml-5"><a href=""><FaDribbble /></a> </li>
            </ul>
          </div>
        </div>
        <h4 className={styles.secondHeader}>You may also Like</h4>
        <div className="my-5 flex flex-wrap justify-center">

          {
            uniqueBlog.map(r => {
              return (
                <div key={r.id} className="p-4 bg-white md:w-1/2 lg:w-1/3 overflow-hidden">
                  <div className={styles.cardHeader}>
                    <Image layout={'responsive'} objectFit={'cover'} src={r.image} ></Image>
                    <div className="mt-4">
                      <Link href={`/${r.heading.replace(/ /g, "-")}`} >{r.heading}</Link>
                    </div>
                  </div>
                  <div className="flex mt-6">
                    <div className="sm:mr-4 mr-1">
                      <div className={`flex ${styles.author}`}>
                        <img src="https://1.gravatar.com/avatar/d278a48fabb0e7ccd38b69e2920c5f99?s=30&d=mm&r=g" />
                        <span><Link href={`/about/${r.name}`}><a className="text-gray-500">{r.name}</a></Link></span>
                      </div>

                    </div>
                    <div className="sm:mr-4 mr-1"><small className="text-gray-700">&#x25C8; {r.date}</small>
                    </div>
                    <div className="sm:mr-4 mr-1"> <Link href={`/tags/${r.tags}`}>
                      <a className={`text-gray-500 ${styles.tags}`}>&#x25C8; {r.tags}</a>
                    </Link>
                    </div>

                  </div>
                  <div className="mt-4 mb-3">
                    <span className="text-gray-500">{r.details}</span>
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
            <li className="ml-5"><a href={`https://www.facebook.com/`}><FaFacebookF /></a></li>
            <li className="ml-5"><a href={`https://twitter.com/`}><FaTwitter /></a></li>
            <li className="ml-5"><a href="#"><FaInstagram /></a></li>
            <li className="ml-5"><a href="#"><FaDribbble /></a></li>
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
