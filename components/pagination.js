import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import styles from '../styles/pagination.module.css'

const Pagination = () => {
  return (
    <div className="p-4 mb-5">
      <ul className={`flex justify-between ${styles.pagination}`}>
        <li className={`px-5 h-10 ${styles.page}`}>
          <a className={ styles.arrow} href="#"><FaAngleLeft /></a>
        </li>
        <li>
          <ul className={`flex flex-wrap ${styles.pagination}`}>
            <li className={`px-5 h-10 ${styles.page} ${styles.active}`}><a href="#">1</a>
            </li>
            <li className={`px-5 h-10 ${styles.page}`}><a href="#">2</a>
            </li>
            <li className={`px-5 h-10 ${styles.page}`}><a href="#">3</a>
            </li>
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