import React from "react";
import { useSelector } from "react-redux";
import { NavLink, Outlet } from "react-router-dom";
import { signOutUser } from "../../utils/firebase.utils";
import classes from "./navigation.module.css";
const Navigation = () => {
  const selector = useSelector((state) => state.user.user);

  return (
    <>
      <header>
        <nav className={classes.navbar}>
          <div className={classes.gradient}></div>
          <ul className={classes.navlinks}>
            <li className={classes.list}>
              {!selector ? (
                <NavLink
                  to="/signup"
                  className={({ isActive }) =>
                    isActive ? classes.active : null
                  }
                  end
                >
                  sign up
                </NavLink>
              ) : (
                <NavLink to="/" onClick={signOutUser()}>
                  sign out
                </NavLink>
              )}
            </li>
            <li className={classes.list}>
              <NavLink
                to="/podcasts"
                className={({ isActive }) => (isActive ? classes.active : null)}
              >
                podcast
              </NavLink>
            </li>
            <li className={classes.list}>
              <NavLink
                to="/start-podcast"
                className={({ isActive }) => (isActive ? classes.active : null)}
              >
                Start a podcast
              </NavLink>
            </li>
            <li className={classes.list}>
              <NavLink
                to="/profile"
                className={({ isActive }) => (isActive ? classes.active : null)}
              >
                profile
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Navigation;
