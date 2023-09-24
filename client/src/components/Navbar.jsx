import React from 'react'
import { Link } from 'react-router-dom'

export const Navbar = (props) => {
  function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  function handleLogOut() {
    localStorage.removeItem("token")
  }

  let role = capitalizeFirstLetter(props.user.role);
  let username = capitalizeFirstLetter(props.user.username);

  return (
    <div className="navbar sm:w-full md:1/2">
        <div className="navbar-start">
          <a className="hidden sm:block md:block lg:block navbar-item font-bold text-primary">CAMPUSLANDS</a>
        </div>
        <div className="navbar-end">
          <a className="navbar-item bg-primary font-bold px-3 py-2">+</a>
          <a className="navbar-item">{role}</a>
          <div className="avatar avatar-ring avatar-md">
            <div className="dropdown-container">
              <div className="dropdown">
                <label className="btn btn-ghost flex cursor-pointer px-0" tabIndex="0">
                  <div className="font-bold">{username[0]}</div>
                </label>
                <div className="dropdown-menu dropdown-menu-bottom-left">
                  <Link to="/" onClick={handleLogOut} className="dropdown-item text-sm">Log Out</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}

