import Image from 'next/image';
import Img1 from '../public/logo-dark.png';


const Navbar = () => {
  return (
    <div>
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row
      items-center">
        <a className="flex title-font font-medium items-center text-gray-900
        mb-4 md:mb-0">
          <Image src={Img1} alt="" className="w-8" />
        </a>
        <nav
          className="md:ml-auto flex flex-wrap items-center text-base justify-center"
        >
          <a className="mr-5 hover:text-gray-900">Home</a>
          <a className="mr-5 hover:text-gray-900">Features</a>
          <a className="mr-5 hover:text-gray-900">About</a>
          <a className="mr-5 hover:text-gray-900">Contact</a>
          <a className="mr-5 hover:text-gray-900">Pages</a>
        </nav>
        <div className="navbar-right">
          <ul className="social-links list-unstyled list-inline">
            <li className="list-inline-item"><a href="#!">
              <i className="lab la-facebook-f"></i>
            </a></li>
            <li className="list-inline-item"><a href="#!">
              <i className="lab la-twitter"></i>
            </a></li>
            <li className="list-inline-item"><a href="#!">
              <i className="lab la-instagram"></i>
            </a></li>
            <li className="list-inline-item"><a href="#!">
              <i className="lab la-pinterest"></i>
            </a></li>

            <li className="list-inline-item ml-3 d-none d-lg-inline-block">
              <button className="search-toggle" data-toggle="search">
                <i className="las la-search"></i>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;