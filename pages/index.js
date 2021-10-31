import Blogs from '../components/blogs'
import Footer from '../components/footer'
// import Navbar from '../components/navbar'
import Pagination from '../components/pagination'

export default function Home() {
  return (
    <>
      {/* <Navbar /> */}
      <Blogs />
      <Pagination />
      <Footer />
    </>
  )
}
