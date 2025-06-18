import { Link, NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import styles from './MainNav.module.css';

export default function MainNav() {
  const user = useContext(UserContext);

  return (
    <nav className={styles.mainNav}>
      <h1 className={styles.title}>Birds of the World</h1>
      <div className={styles.navLinksGroup}>
        <div className={styles.navLink}>
          <NavLink to="/">Home</NavLink>
        </div>
        {user ? (
          <>
            <div className={styles.navLink}>
              <NavLink to="/userProfile">
                Profile
              </NavLink>
            </div>
            <div className={styles.navLink}>
              <Link to="/logout">
                Logout
              </Link>
            </div>
          </>
        ) : (
          <div className={styles.navLink}>
            <NavLink to="/login">
              Login
            </NavLink>
          </div>
        )}
      </div>
    </nav>
  );
}
