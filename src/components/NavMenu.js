import React, { useState } from "react";
import {
  Collapse,
  Nav,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  NavLink,
} from "reactstrap";
import { Link } from "react-router-dom";
import "./NavMenu.css";

function NavMenu(props) {
  const [collapsed, setCollapsed] = useState(true);

  const toggleNavbar = () => {
    setCollapsed(!collapsed);
  };

  const links = [
    {
      href: "https://mimtecnomagnesio.com/index.php/contatti/",
      text: "Contatti",
    },
    {
      href: "https://mimtecnomagnesio.com/index.php/diventa-agente-mim-tecnomagnesio/",
      text: "Diventa Agente",
    },
    {
      href: "http://b2b.mimtecnomagnesio.it/registrazione",
      text: "Diventa Rivenditore",
    },
  ];

  const createNavItem = ({ href, text, className }) => (
    <NavItem>
      <NavLink href={href} className={className}>
        {text}
      </NavLink>
    </NavItem>
  );

  return (
    <Navbar
      className="navMenu navbar-dark sticky-top border-bottom mb-3"
      light
      expand="lg"
      container
    >
      <div className="row w-100">
        <div className="col">
          <NavbarBrand tag={Link} to="https://www.mimtecnomagnesio.it/">
            <img
              className="img"
              alt="MIM Tecnomagnesio"
              title="MIM Tecnomagnesio"
              src="/images/loghi-mim-tm-white-red.png?201702202015"
            />
          </NavbarBrand>
        </div>
        <div className="col text-end">
          {props.music}
          <NavbarBrand
            className="d-none d-lg-inline-block ps-3"
            tag={Link}
            to="/"
          >
            <img
              className="img"
              alt="MIM Tecnomagnesio"
              title="MIM Tecnomagnesio"
              src="/images/tmshop.png?201702202015"
            />
          </NavbarBrand>
          <NavbarToggler onClick={toggleNavbar} />
        </div>
      </div>

      <Collapse isOpen={collapsed === false} navbar>
        <Nav className="ml-auto" navbar>
          {collapsed === false && links.map(createNavItem)}
        </Nav>
      </Collapse>
    </Navbar>

    // <Navbar
    //   className="navbar-dark sticky-top navbar-expand-md navbar-toggleable-lg ng-white border-bottom box-shadow mb-3"
    //   container
    //   light
    //   expand="md"
    // >
    //   <NavbarBrand tag={Link} to="https://www.mimtecnomagnesio.it/">
    //     <img
    //       className="img"
    //       alt="MIM Tecnomagnesio"
    //       title="MIM Tecnomagnesio"
    //       src="/images/loghi-mim-tm-white-red.png?201702202015"
    //     />
    //   </NavbarBrand>
    //   {props.music}
    //   <NavbarBrand
    //     className="d-none d-lg-block float-end ps-3"
    //     tag={Link}
    //     to="/"
    //   >
    //     <img
    //       className="img"
    //       alt="MIM Tecnomagnesio"
    //       title="MIM Tecnomagnesio"
    //       src="/images/tmshop.png?201702202015"
    //     />
    //   </NavbarBrand>
    //   <NavbarToggler onClick={toggleNavbar} className="mr-2" />
    //   <Collapse isOpen={collapsed===false} navbar>
    //       <Nav className="ml-auto" navbar>
    //         {links.map(createNavItem)}
    //       </Nav>
    //     </Collapse>
    // </Navbar>
  );
}

export default NavMenu;
