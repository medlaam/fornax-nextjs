import React from 'react';
import Image from 'next/dist/client/image';
import Link from 'next/link';
import styles from '../styles/blogs.module.css';
import { blogData } from './blogData';

const Blogs = () => {
  return (
    <div className={styles.container}>
      <div className="flex flex-wrap my-14">
        {
          blogData.map((b, i) => {
            return (
              <div key={b.id} className="h-full p-4 bg-white sm:w-1 lg:w-1/3 md:w-1/2  overflow-hidden">
                <Image src={b.image} ></Image>
                <div className="mt-5">
                  <div className={styles.cardHeader}>
                    <Link href="#" >{b.heading}</Link>
                  </div>

                  <div class="flex mt-6">
                    <div class="flex-auto">
                      <div className={`flex ${styles.author}`}>
                        <img src="https://1.gravatar.com/avatar/d278a48fabb0e7ccd38b69e2920c5f99?s=30&d=mm&r=g" />
                        <span><small>{b.name}</small></span>
                      </div>

                    </div>
                    <div class="flex-auto"><small>&#x25C8; TECH</small>
                    </div>
                    <div class="flex-auto"><small>&#x25C8; AUGUST 28, 2018</small>
                    </div>
                  </div>
                  <div className="mt-4 mb-3">
                    <span>{b.details}</span>
                  </div>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  );
};

export default Blogs;