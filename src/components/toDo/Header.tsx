import React from "react";
import "../../styles/header.scss";
import "../../styles/fontawesome/fontawesome.scss";

const Header: React.FC = () => {
    return(
        <header className="header header_light">
            <h4 className="header__content">
                [<i className="fas fa-clipboard-list"></i>]
                To-Dooooooooo...ooo
            </h4>
        </header>
    );
}

export default Header;