import Blogs from '../components/blogs'
import Pagination from '../components/pagination';
import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>Leberte blog</title>
      </Head>
      <Blogs />
      <Pagination />
    </>
  )
}
