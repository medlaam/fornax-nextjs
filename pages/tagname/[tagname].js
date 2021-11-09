import React from 'react';
import { blogData } from '../../components/blogData';
import Link from 'next/dist/client/link';
import Image from 'next/dist/client/image';
import styles from '../../styles/tagname.module.css';

const TagName = ({ tagname }) => {

  // filter blogs by tagname
  const allBlogs = blogData.filter(a => a.tags == tagname)

  
  return (
    <div className={`my-14 flex flex-wrap justify-center ${styles.container}`}>
      {
          allBlogs.map(r => {
            return (
              <div key={r.id} className="p-4 bg-white sm:w-1 lg:w-1/3 md:w-1/2  overflow-hidden">
                <div >
                  <Image src={r.image} ></Image>
                  <div className="mt-4">
                    <Link href={`/${r.id}`} >{r.heading}</Link>
                  </div>
                </div>
                <div className="flex mt-6">
                  <div className="flex-auto">
                    <div className={`flex ${styles.author}`}>
                      <img src="https://1.gravatar.com/avatar/d278a48fabb0e7ccd38b69e2920c5f99?s=30&d=mm&r=g" />
                      <span><small>{r.name}</small></span>
                    </div>

                  </div>
                  <div className="flex-auto"><small>&#x25C8; {r.tags}</small>
                  </div>
                  <div className="flex-auto"><small>&#x25C8; {r.date}</small>
                  </div>
                </div>
                <div className="mt-4 mb-3">
                  <span>{r.details}</span>
                </div>
              </div>
            )
          })
        }
    </div>
  );
};

TagName.getInitialProps = async ({ query }) => {
  const { tagname } = query
  return { tagname }

}

export default TagName;

