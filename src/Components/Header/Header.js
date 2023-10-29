import CollectionsLinkElement from "./CollectionsLinkElement";
import DesignersLinkElement from "./DesignersLinkElement";
import EventsLinkElement from "./EventsLinkElement";
import FashionItemsLinkElement from "./FashionItemsLinkElement";
import HomeLinkElement from "./HomeLinkElement";
import NewsLinkElement from "./NewsLinkElement";
import LoginLinkElement from "./LoginLinkElement";
import RegisterLinkElement from "./RegisterLinkElement";
import "../../styles/Header.css";
import { useContext} from "react";
import DataContext from "../../DataContext";
import LogoutLinkElement from "./LogoutLinkElement";
function Header() {
    const { loggedIn, setLoggedIn } = useContext(DataContext);

    // if (!loggedUser) {
    //     return <Loader/>;
    // }
    
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
        <div className="logo">
          LOGO
        </div>
        <div className="header-links">
          <HomeLinkElement />
          <CollectionsLinkElement />
          <FashionItemsLinkElement />
          <NewsLinkElement />
          <EventsLinkElement />
          <DesignersLinkElement />
          {/* <LoginLinkElement /> */}
          {loggedIn ? <LogoutLinkElement /> : <LoginLinkElement />}
          <RegisterLinkElement />
        </div>
      </header>
    );
}

export default Header;
