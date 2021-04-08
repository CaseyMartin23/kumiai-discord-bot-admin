import React, { Fragment } from "react";
import { Link, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";
import "../../styles/Navbar.css";

function Navbar({ logout, auth: { isAuthenticated } }) {
  return (
    <Fragment>
      <nav className="navbar">
        <div className="navbar-content">
          <span className="navbar-title">
            <Link to="/" className="title-link">
              Kumiai Admin
            </Link>
          </span>
          {isAuthenticated && (
            <>
              <div>
                <ul id="unordered-list" className="ul-links">
                  <NavLink
                    to="/dashboard/ranks"
                    className="nav-links"
                    activeClassName="active"
                  >
                    Ranks
                  </NavLink>
                  <NavLink
                    to="/dashboard/quests"
                    className="nav-links"
                    activeClassName="active"
                  >
                    Quests
                  </NavLink>
                  <NavLink
                    to="/dashboard/achievements"
                    className="nav-links"
                    activeClassName="active"
                  >
                    Achievements
                  </NavLink>
                  <NavLink
                    to="/dashboard/users"
                    className="nav-links"
                    activeClassName="active"
                  >
                    Users
                  </NavLink>
                </ul>
              </div>
              <button id="logout-button" onClick={logout}>
                Logout
              </button>
            </>
          )}
        </div>
      </nav>
    </Fragment>
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
