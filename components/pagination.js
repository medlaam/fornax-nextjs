import { useRouter } from 'next/router';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import styles from '../styles/pagination.module.css';

const Pagination = ({ postPerPage, totalPost, page, paginate, hasNextPage, hasPreviousPage }) => {
  const pageNumber = [];

  for (let i = 1; i <= Math.ceil(totalPost / postPerPage); i++) {
    pageNumber.push(i)
  }

  const router = useRouter();


  return (
    <div className="p-4 mb-5 container m-auto">
      <ul className={`flex justify-between ${styles.pagination}`}>
        {
          hasPreviousPage ?
            <li onClick={() => router.push(`/page/${page - 1}`)} className={`px-5 h-10 ${styles.page} transition  duration-300 ease-in-out hover:bg-primaryColor`}>
              <a className={styles.arrow}><FaAngleLeft /></a>
            </li> :
            <button disabled className={`px-5 h-10 ${styles.disablePage}`}>
              <a className={styles.disabled}><FaAngleLeft /></a>
            </button>
        }
        <li>
          <ul className={`flex flex-wrap ${styles.pagination}`}>
            {
              pageNumber.map(num => (
                <li key={num} onClick={() => { paginate(num); router.push(`/page/${num}`) }} className={num==page ? `px-5 h-10 ${styles.active} transition  duration-300 ease-in-out bg-primaryColor `: `px-5 h-10 ${styles.page} transition  duration-300 ease-in-out hover:bg-primaryColor `}><a >{num}</a>
                </li>
              ))
            }
          </ul>
        </li>
        {
          hasNextPage ?
            <li onClick={() => router.push(`/page/${page + 1}`)} className={`px-5 h-10 ${styles.page} transition  duration-300 ease-in-out hover:bg-primaryColor`}>
              <a className={styles.arrow}><FaAngleRight /></a>
            </li>
            :
            <button className={`px-5 h-10 text-gray-400 ${styles.disablePage}`} disabled>
              <a className={`${styles.disabled} `}><FaAngleRight /></a>
            </button>
        }
      </ul>
    </div>
  );
};


export default Pagination;

