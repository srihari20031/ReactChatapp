import { Link, NavLink } from "react-router-dom";
import Ninchat from "../assets/images/Reactchatlogo.png";

const Navbar = () => {
  return (
    <div className="bg-gray-800">
      <nav className="flex items-center justify-around p-3 mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 h-15 ">
        <Link to="/">
          <div className="flex text-white items-center cursor-pointer gap-2">
            <img src={Ninchat} alt="" className="w-8 h-8" />
            <p className="font-bold text-xl">Ninchat</p>
          </div>
        </Link>
        <div className="flex gap-10 text-gray-50">
          <NavLink to="/login">
            <button className="hover:bg-gray-700 hover:text-gray-50 p-2 rounded-lg cursor-pointer active:bg-[rgba(94, 3, 240, 0.358)]">
              Log In
            </button>
          </NavLink>
          <NavLink to="/signup">
            <button className="hover:bg-gray-700  p-2 rounded-lg cursor-pointeractive:bg-[rgba(94, 3, 240, 0.358)]">
              Sign Up
            </button>
          </NavLink>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
