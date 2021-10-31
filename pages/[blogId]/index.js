import React from 'react';
import { blogData } from '../../components/blogData';
import { useRouter } from 'next/dist/client/router';
import styles from '../../styles/singleblog.module.css';

const SingleBlog = () => {  
  const router = useRouter()
  const blogID = router.query.blogId
  const blog = blogData.find(b => b.id == blogID)

  return (
    <div className={`${styles.blogContainer} p-10 m-10`}>
      <h1 className="text-center">{blog.heading}</h1>
    </div>
  );
};

SingleBlog.getInitialProps = ({ query:  {id}  }) => {
  const b = {id}
  return {
    props: b
  }
}


export default SingleBlog;
