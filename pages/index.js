import Blogs from '../components/blogs'
import Pagination from '../components/pagination';
import Head from 'next/head';
import { useState } from 'react';
import {blogData} from '../components/blogData';

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage] = useState(3);

  const indexOfLastPost = currentPage * postPerPage
  const indexOfFirstPost = indexOfLastPost - postPerPage
  const currentPosts = blogData.slice(indexOfFirstPost, indexOfLastPost);

  // change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <>
      <Head>
        <title>Leberte blog</title>
      </Head>
      <Blogs blogData={currentPosts} />
      <Pagination postPerPage={postPerPage} totalPost={blogData.length} paginate ={paginate} />
    </>
  )
}
