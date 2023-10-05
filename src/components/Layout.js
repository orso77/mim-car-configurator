import React, { useState } from "react";
import { Container } from "reactstrap";
import InsideAlerter from "./InsideAlerter";
import Music from "./Music";
import NavMenu from "./NavMenu";
import "./Layout.css";

function Layout(props) {
  const [music, setMusic] = useState(<Music url="waterfall-140894.mp3"></Music>);

  const insideAlerterHandler = () => {
    // if (!music) {
    //   setMusic(<Music url="waterfall-140894.mp3"></Music>);
    // }
  };

  return (
    <InsideAlerter handleAction={insideAlerterHandler}>
      <div>
        <nav className="top-nav navbar navbar-expand-sm navbar-light d-sm-none d-md-none d-lg-block">
          <div className="container">
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <a href="https://mimtecnomagnesio.com/index.php/contatti/">
                    Contatti
                  </a>
                </li>
                <li className="nav-item">
                  <a href="https://mimtecnomagnesio.com/index.php/diventa-agente-mim-tecnomagnesio/">
                    Diventa Agente Mim Tecnomagnesio
                  </a>
                </li>
                <li className="nav-item">
                  <a href="http://b2b.mimtecnomagnesio.it/registrazione">
                    Diventa Rivenditore Mim Tecnomagnesio
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <NavMenu music={music} />
        <Container tag="main">
          {props.children}
        </Container>        
      </div>
    </InsideAlerter>
  );
}

export default Layout;

//export class Layout extends Component {
//  static displayName = Layout.name;

//  render() {
//    return (
//      <div>
//        <NavMenu />
//        <Container tag="main" style={{ minHeight: 600 }}>
//          {this.props.children}
//        </Container>
//        <footer className="bg-light text-center">
//          <div className="mt-3 text-center p-2" style={{ backgroundColor: "#6d6d6d" }}>
//            <small>&copy; 2015-{new Date().getFullYear()} Top Ruote Srl</small>
//            <div>
//              <small>
//                <small>
//                p. iva: 01707830434
//                  Via Pirelli, 50/54 - Zona Ind.le A - 62012 - Civitanova Marche (MC) R.E.A. (MC) 174483 - cap. soc. &euro; 50'000,00</small></small></div>
//          </div>
//        </footer>
//      </div>
//    );
//  }
//}
