import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";
import "../../styles/Navbar.css";

function Navbar({ logout, auth: { isAuthenticated } }) {
  const authLinks = (
    <ul className="ul-links">
      <li>
        <p onClick={logout} className="hide-sm" className="logout-link">
          Logout
        </p>{" "}
      </li>
    </ul>
  );

  const guestLinks = (
    <ul className="ul-links">
      <li>
        <p></p>
      </li>
    </ul>
  );

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <p className="navbar-title">
          <Link to="/">
            <p>Kumiai Admin</p>
          </Link>
        </p>
        {/* If not loading, evaluate fragment */}
        <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
      </div>
    </nav>
  );
}

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
