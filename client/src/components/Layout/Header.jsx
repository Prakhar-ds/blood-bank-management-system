import React from 'react'

import {MdBloodtype} from 'react-icons/md'
import {FaUser} from 'react-icons/fa'
import {FiLogIn} from 'react-icons/fi'
import {motion} from 'framer-motion'

import { Link, NavLink } from "react-router-dom";
import icon from '../../assets/logo.jpg'

import toast from "react-hot-toast";
import {useAuth} from '../../context/auth.js'

const Header = () => {
  const [auth,setAuth]=useAuth();
  const handleLogout=()=>{
    setAuth({
      ...auth,
      user:null,
      token:"",
    })
    localStorage.removeItem("auth");
    toast.success("Logout successfully")
  }
  return (
    // <nav>
    //   <motion.div>
    //     <MdBloodtype />
    //     <img src={icon} alt="mainIcon" />
    //   </motion.div>
    //   <div>
    //     <Link to="/">Home</Link>
    //     <Link to="/about">About</Link>
    //     <Link to="/eligibility">Eligibility</Link>
    //     <Link to="/contact">Contact</Link>
    //     {/* <Link to='/gallery'>Gallery</Link> */}
    //     <Link to={!auth?.user ? "/me" : "login"}>
    //       {!auth?.user ? <FaUser /> : <FiLogIn />}
    //     </Link>

    //   </div>
    // </nav>
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <Link to="/" className="navbar-brand">
              <motion.div>
                <MdBloodtype />
                <img src={icon} alt="mainIcon" />
              </motion.div>
            </Link>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink to="/" className="nav-link ">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/about" className="nav-link ">
                  About
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/contact" className="nav-link ">
                  Contact
                </NavLink>
              </li>
              {!auth?.user ? (
                <>
                  <li className="nav-item">
                    <NavLink to="/register" className="nav-link">
                      Register
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/login" className="nav-link">
                      Login
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item dropdown">
                    <NavLink
                      className="nav-link dropdown-toggle"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {auth?.user?.name}
                    </NavLink>
                    <ul className="dropdown-menu">
                      <li>
                        <NavLink
                          to={`/dashboard/${
                            auth?.user?.role === 1 ? "admin" : "user"
                          }`}
                          className="dropdown-item"
                        >
                          Dashboard
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          onClick={handleLogout}
                          to="/login"
                          className="dropdown-item"
                        >
                          Logout
                        </NavLink>
                      </li>
                    </ul>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header