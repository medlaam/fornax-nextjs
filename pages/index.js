import Blogs from '../components/blogs'
import Pagination from '../components/pagination';
import Head from 'next/head';
import { useState } from 'react';
import { blogData } from '../components/blogData';

function Home({ posts, page }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage] = useState(2);

  const indexOfLastPost = page * postPerPage
  const indexOfFirstPost = indexOfLastPost - postPerPage
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  // change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  const hasNextPage = Math.ceil(posts.length / postPerPage) > page;
  console.log(hasNextPage);
  const hasPreviousPage = page > 1;

  return (
    <>
      <Head>
        <title>Leberte blog</title>
      </Head>
      <Blogs blogData={currentPosts} />
      <Pagination page={page} hasNextPage={hasNextPage} hasPreviousPage={hasPreviousPage} postPerPage={postPerPage} totalPost={posts.length} paginate={paginate} />
    </>
  )
}

Home.getInitialProps = ({ query: { page = 1 } }) => {
  const posts = blogData

  return {
    posts: posts,
    page: +page
  }
}

export default Home;
