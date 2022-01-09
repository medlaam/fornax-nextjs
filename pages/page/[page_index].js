import fs from 'fs'
import path from 'path'
import Pagination from '../../components/pagination';
import Head from 'next/head';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../components/context';
import { getPosts } from '../../lib/posts';
import { postPerPage } from '../../config/pagination'
import Blogs from '../../components/blogs'

// const Blogs = dynamic(() => import('../../components/blogs'),
//   { loading: () => <p>Loading...</p> }
// )

function Home({ page, postsBlog }) {
  const { value2 } = useContext(AppContext);
  const [showSearchPosts, setShowSearchPosts] = value2

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setShowSearchPosts(postsBlog)
  })

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
        <title>Leberte blog</title>
      </Head>
      <Blogs postsBlog={currentPosts} />
      <Pagination page={page} hasNextPage={hasNextPage} hasPreviousPage={hasPreviousPage} postPerPage={postPerPage} totalPost={postsBlog.length} paginate={paginate} />
    </div>
  )
}

export async function getStaticPaths() {
  const files = fs.readdirSync(path.join('posts'))

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

  return {
    props: {
      postsBlog: posts,
      page: page,
    },
  }
}

// export const getServerSideProps = async ({ query: { page = 1 } }) => {
//   const posts = getPosts()

//   return {
//     props: {
//       page: +page,
//       postsBlog: posts
//     }
//   }
// }

export default Home;

