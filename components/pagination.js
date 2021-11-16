import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import styles from '../styles/pagination.module.css';

const Pagination = ({ postPerPage, totalPost, paginate }) => {
  const pageNumber = [];

  for (let i = 1; i <= Math.ceil(totalPost / postPerPage); i++) {
    pageNumber.push(i)
  }

  return (
    <div className="p-4 mb-5">
      <ul className={`flex justify-between ${styles.pagination}`}>
        <li className={`px-5 h-10 ${styles.page}`}>
          <a className={styles.arrow} href="#"><FaAngleLeft /></a>
        </li>
        <li>
          <ul className={`flex flex-wrap ${styles.pagination}`}>
            {
              pageNumber.map(num => (
                <li key={num} className={`px-5 h-10 ${styles.page} `}><a  onClick={() => paginate(num)}  href="#">{num}</a>
                </li>
              ))
            }
          </ul>
        </li>
        <li className={`px-5 h-10 ${styles.page}`}>
          <a className={styles.arrow} href="#"><FaAngleRight /></a>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;