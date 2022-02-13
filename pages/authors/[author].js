import Image from 'next/dist/client/image';
import styles from '../../styles/about.module.css';
import Head from 'next/head';
import { getAuthor } from '../../lib/author';
import { marked } from 'marked';
import socialIcons from '../../config/config.json';
import { kebabCase } from '../../utils/kebabcase';


const SingleAuthor = ({ authorName, author }) => {
  const authors = authorName.filter(a => kebabCase(a.frontmatter.name) === author);
  return (
    <>
      <Head>
        <title>Author | {author}</title>
      </Head>
      {
        authors.map((a, i) => (
          <div key={i} className="my-16 md:my-24 px-4 sm:px-6 flex justify-center items-center">
            <div className={`mx-auto w-full max-w-xl ${styles.about}`}>
              <div className="text-center">
                <Image className="rounded-full " height={200} width={200} src={a.frontmatter.image}></Image>
                <p className="font-bold text-4xl mt-6 mb-4">{a.frontmatter.name}</p>
                <div className="mx-auto prose-p:text-large leading-8 mb-10 text-textLight" dangerouslySetInnerHTML={{ __html: marked.parse(a.content) }}>
                </div>
              </div>
              <ul className={`flex items-center justify-center mt-10 ${styles.writersLink}`}>
                {
                  socialIcons.socialMedia.map(s => (
                    <li key={s.name} className="hover:text-primaryColor">
                      <a className="ml-5" href={s.link}><i className={`not-italic ${s.icon}`}></i></a>
                    </li>
                  ))
                }
              </ul>
            </div>
          </div>
        ))
      }
    </>
  );
};

export async function getStaticPaths() {
  const authors = getAuthor()
  const paths = authors.map(n => ({
    params: {
      author: kebabCase(n.frontmatter.name)
    }
  }))

  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params: { author } }) {
  const authorName = getAuthor()

  return {
    props: {
      authorName,
      author
    }
  }
}


export default SingleAuthor;
