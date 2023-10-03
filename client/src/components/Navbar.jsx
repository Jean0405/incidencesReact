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
    <div className="navbar bg-blue-500 sm:w-full md:1/2">
      <div className="navbar-start">
        <a className="hidden sm:block md:block lg:block navbar-item font-bold text-white">CAMPUSLANDS</a>
      </div>
      <div className="navbar-end">
        <a className="navbar-item">{role}</a>
        <div className="avatar avatar-ring avatar-md">
          <div className="dropdown-container">
            <div className="dropdown">
              <label className="btn btn-ghost flex cursor-pointer px-0" tabIndex="0">
                <div className="font-bold">{username[0]}</div>
              </label>
              <div className="dropdown-menu dropdown-menu-bottom-left">
                <span className='dropdown-item text-sm font-bold'>{props.user.username}</span>
                <span className='dropdown-item text-sm'>{props.user.email}</span>
                <div className='divider'></div>
                <Link to="/" onClick={handleLogOut} className="dropdown-item text-sm bg-blue-600 text-center hover:bg-blue-800">Log Out</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

