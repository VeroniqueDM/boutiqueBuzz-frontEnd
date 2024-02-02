import CollectionsLinkElement from "./CollectionsLinkElement";
import DesignersLinkElement from "./DesignersLinkElement";
import EventsLinkElement from "./EventsLinkElement";
import FashionItemsLinkElement from "./FashionItemsLinkElement";
import HomeLinkElement from "./HomeLinkElement";
import NewsLinkElement from "./NewsLinkElement";
import LoginLinkElement from "./LoginLinkElement";
import RegisterLinkElement from "./RegisterLinkElement";
import "../../styles/Header.css";
import { useContext } from "react";
import DataContext from "../../DataContext";
import LogoutLinkElement from "./LogoutLinkElement";
import axios from "axios";
import CategoriesLinkElement from "./CategoriesLinkElement";
import { Link } from "react-router-dom";
function Header() {
    const { loggedIn, API_BASE_URL, setLoggedIn, 
        setUserDetails, userDetails, currentUser, logOut } =
        useContext(DataContext);

    // if (!loggedUser) {
    //     return <Loader/>;
    // }

    const isAdmin = userDetails && userDetails.role === "ROLE_ADMIN";

    const handleLogout = async (e) => {
        e.preventDefault();
        try {
            const response = await axios(`${API_BASE_URL}/logout`, {
                method: "POST",
                credentials: "include",
            });
            if (response.status === 200) {
                setLoggedIn(false);
                setUserDetails(null);
                console.log("Logout successful", response.data);
            } else {
                console.log("Logout unsuccessful / status", response.data);
            }
        } catch (error) {
            console.error("Logout failed..", error);
        }
    };
    return (
        // <header class="main-header sticky-header">
        //     <div>
        //       LOGO
        //     </div>
        //     <div class="user-info">
        //      <HomeLinkElement/>

        //         <CollectionsLinkElement/>
        //         <FashionItemsLinkElement/>
        //         <NewsLinkElement/>
        //         <EventsLinkElement/>
        //         <DesignersLinkElement/>
        //     </div>
        // </header>
        <header className="main-header sticky-header">
            <div className="logo">BOUTIQUE BUZZ</div>
            <div className="header-links">
                <HomeLinkElement />
                <CollectionsLinkElement />
                <FashionItemsLinkElement />
                <NewsLinkElement />
                <EventsLinkElement />
                {isAdmin && <CategoriesLinkElement />}

                {/* <DesignersLinkElement /> */}
                {/* {loggedIn ? <LogoutLinkElement handleLogout={handleLogout}/> : <LoginLinkElement />}
                {loggedIn ? null : <RegisterLinkElement />} */}

                {currentUser ? (
          <div className="navbar-nav ms-auto">
            <li className="nav-item">
              <a href="/" className="nav-link" onClick={logOut}>
                Logout
              </a>
            </li>
          </div>
        ) : (
          <div className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                Login
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/register"} className="nav-link">
                Sign up
              </Link>
            </li>
          </div>
        )}
                
            </div>
        </header>
    );
}

export default Header;
