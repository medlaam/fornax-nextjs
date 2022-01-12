import Image from 'next/dist/client/image';
import styles from '../../styles/about.module.css';
import { FaFacebookF, FaTwitter, FaInstagram, FaDribbble } from 'react-icons/fa';
import Head from 'next/head';
import authorImg from '../../public/author.jpg'

const SingleAuthor = ({ author }) => {
  return (
    <>
      <Head>
        <title>Author | {author}</title>
      </Head>
      <div className={`mt-10 ${styles.about}`}>
        <div className="text-center">
          <Image height={100} width={100} objectFit="cover" src={authorImg}></Image>
          <p className="mt-3 font-bold">{author}</p>
          <p className="mt-4 m-auto w-1/3">Maecenas sit amet purus eget ipsum elementum venenatis. Aenean maximus urna magna elementum venenatis, quis rutrum mi semper non purus eget ipsum elementum venenatis.aecenas sit amet purus eget ipsum elementum venenatis. Aenean maximus urna magna elementum venenatis, quis rutrum mi semper non purus eget ipsum elementum venenatis.</p>
        </div>
        <ul className={`flex items-center justify-center mt-10 ${styles.writersLink}`}>
          <li className="ml-5"><a href={`https://www.facebook.com/`}><FaFacebookF /></a></li>
          <li className="ml-5"><a href={`https://twitter.com/`}><FaTwitter /></a></li>
          <li className="ml-5"><a href="#"><FaInstagram /></a></li>
          <li className="ml-5"><a href="#"><FaDribbble /></a></li>
        </ul>
      </div>
    </>
  );
};

export const getServerSideProps = async ({ query }) => {
  const { author } = query
  return {
    props: {
      author
    }
  }

}


export default SingleAuthor;
