import { useState } from "react";
import { Nav, Navbar } from "react-bootstrap";
import logo from './../../assets/images/logo.png';
import mobile from './../../assets/images/mobile.svg';
import languageimg from './../../assets/images/language.svg';
import profile from './../../assets/images/profile.PNG';
import LoginForm from "../../components/LoginForm";


const Header = () => {
    const [login, setLogin] = useState(false);
    const [language, setLanguage] = useState(false);
    const [download, setDownload] = useState(false);

    const handleSelect = (switchValue) => {

        switch (switchValue) {
            case "login":
                setLogin(!login);
                setLanguage(false);
                setDownload(false);
                break;
            case "language":
                setLogin(false);
                setLanguage(!language);
                setDownload(false);
                break;

            case "download":
                setLogin(false);
                setLanguage(false);
                setDownload(!download);
                break;
            default:
                console.log("please select one thing.")
        }
    };
    const [iconClick, seticonClick] = useState();

    return (
        <Navbar expand="lg">
            <Navbar.Brand href="/" className="icon"><img src={logo} alt="logo" /></Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />

            <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
                <Nav className="position-absolute">
                    <div className="link navlinks" onClick={() => handleSelect("download")}>
                        DOWNLOAD <img style={{ marginLeft: "10px" }} src={mobile} alt="mobileimg" />
                        {
                            download && <div className="dropdown_css">
                                <p onClick={() => seticonClick("ios")}>
                                    ios
                                    <span className="pull-right">
                                        {iconClick == "ios" && <i className="fa fa-check" aria-hidden="true"></i>}
                                    </span>
                                </p>

                                <p onClick={() => seticonClick("andriod")}>
                                    andriod
                                    <span className="pull-right">
                                        {iconClick == "andriod" && <i className="fa fa-check" aria-hidden="true"></i>}
                                    </span>
                                </p>
                            </div>
                        }
                    </div>
                    <div className="link navlinks" onClick={() => handleSelect("language")}>
                        LANGUAGES <img style={{ marginLeft: "10px" }} src={languageimg} alt="languageimg" />
                        {
                            language && <div className="dropdown_css">
                                <p onClick={() => seticonClick("spanish")}>
                                    spanish
                                    <span className="pull-right">
                                        {iconClick == "spanish" && <i className="fa fa-check" aria-hidden="true"></i>}
                                    </span>
                                </p>
                                <p onClick={() => seticonClick("english")}>
                                    english
                                    <span className="pull-right">
                                        {iconClick == "english" && <i className="fa fa-check" aria-hidden="true"></i>}
                                    </span>
                                </p>
                                <p onClick={() => seticonClick("french")}>
                                    french
                                    <span className="pull-right">
                                        {iconClick == "french" && <i className="fa fa-check" aria-hidden="true"></i>}
                                    </span>
                                </p>
                            </div>
                        }
                    </div>
                    <div className="link navlinks">
                        <button
                            className="loginBtn"
                            data-toggle="collapse"
                            href="#login"
                            aria-expanded="false"
                            aria-controls="login"
                            onClick={() => handleSelect("login")}
                        >
                            Log in  <img style={{ marginLeft: "10px" }} src={profile} alt="profileimg" />
                        </button>
                        {login && <LoginForm />}
                    </div>
                </Nav>
            </Navbar.Collapse>
        </Navbar >
    )
}

export default Header;