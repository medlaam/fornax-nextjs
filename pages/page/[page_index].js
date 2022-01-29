import fs from 'fs'
import path from 'path'
import Pagination from '../../components/pagination';
import Head from 'next/head';
import { useState } from 'react';
import { getPosts } from '../../lib/posts';
import dynamic from 'next/dynamic';
import  posts  from '../../config/config.json';
import  title  from '../../config/config.json';
import { getAuthor } from '../../lib/author';

const Blogs = dynamic(() => import('../../components/blogs'),
  { loading: () => <p>Loading...</p> }
)

function Home({ page, postsBlog, authors }) {

  const [currentPage, setCurrentPage] = useState(1);
  const titleBlog = title.parameter.title
  const postPerPage = posts.parameter.pagination
  const indexOfLastPost = page * postPerPage
  const indexOfFirstPost = indexOfLastPost - postPerPage
  const currentPosts = postsBlog.slice(indexOfFirstPost, indexOfLastPost);

  // change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  const hasNextPage = Math.ceil(postsBlog.length / postPerPage) > page;
  const hasPreviousPage = page > 1;

  return (
    <div>
      <Head>
        <title>{titleBlog}</title>
      </Head>
      <Blogs postsBlog={currentPosts} authors={authors} />
      <Pagination page={page} hasNextPage={hasNextPage} hasPreviousPage={hasPreviousPage} postPerPage={postPerPage} totalPost={postsBlog.length} paginate={paginate} />
    </div>
  )
}

export async function getStaticPaths() {
  const files = fs.readdirSync(path.join('content/posts'))

  const postPerPage = posts.parameter.pagination
  const numPages = Math.ceil(files.length / postPerPage)

  let paths = []

  for (let i = 1; i <= numPages; i++) {
    paths.push({
      params: { page_index: i.toString() },
    })
  }

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const page = parseInt((params && params.page_index) || 1)
  const posts = getPosts()
  const authors = getAuthor()

  return {
    props: {
      postsBlog: posts,
      page: page,
      authors
    },
  }
}

export default Home;

