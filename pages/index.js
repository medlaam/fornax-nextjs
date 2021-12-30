import Pagination from '../components/pagination';
import Head from 'next/head';
import { useContext, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import matter from 'gray-matter';
import { AppContext } from '../components/context';
// import { sortByDate } from '../utils';

const Blogs = dynamic(() => import('../components/blogs'),
  { loading: () => <p>Loading...</p> }
)

function Home({ page, postsBlog }) {
  const {value2} = useContext(AppContext);
  const [showSearchPosts, setShowSearchPosts] = value2

  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage] = useState(5);

  useEffect(() => {
    setShowSearchPosts(postsBlog)
  })

  const SortedBlog = postsBlog.sort((a, b) => {
    new Date(b.frontmatter.date) - new Date(a.frontmatter.date)
  })

  const indexOfLastPost = page * postPerPage
  const indexOfFirstPost = indexOfLastPost - postPerPage
  const currentPosts = SortedBlog.slice(indexOfFirstPost, indexOfLastPost);

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

export const getServerSideProps = async ({ query: { page = 1 } }) => {

  const fs = require("fs");
  const path = require("path");
  const directoryPath = path.join(process.cwd(), "posts");
  const pageSlugs = fs.readdirSync(directoryPath);

  // get files from posts dir
  // const files = fs.readdirSync(path.join('posts'))

  const postsBlog = pageSlugs.map(filename => {
    // create slug
    const slug = filename.replace('.md', '')
    // const slug = filename.replace('.md', '').replace(/ /g,"-")

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
      page: +page,
      postsBlog: postsBlog
    }
  }
}

export default Home;
