
import backgroundimg from './../../assets/images/building_2.png';
import ientry from './../../assets/images/ientry.png';
import reports from './../../assets/images/reports.svg';
import accesscontrol from './../../assets/images/accesscontrol.svg';
import security from './../../assets/images/security.svg';
import Header from './Header';

const Home = () => {
    return (
        <div className="header">
            <img src={backgroundimg} className="bgimg" alt="img" />
            <div className="card_overly">
                <Header />
                <div className="text-center logoAndText">
                    <img src={ientry} className="img-fluid" alt="i-entry" />
                    <p className="logoAndTextP">
                        iEntry is a technological platform for administration
                        <br />
                        and security in offices, industries and business parks.
                    </p>
                </div>
                <p className="footerText" style={{ left: "1rem" }}>Designed by IBL - iEntry 2022</p>
                <div className="footerRow row justify-content-center text-center m-0">
                    <div className="col-lg-2 col-md-2 col-12 footerCol" style={{ borderRadius: "10px 0 0 0" }}>
                        <img src={reports} alt="" />
                        <p>Reports</p>
                    </div>
                    <div className="col-lg-2 col-md-2 col-12 footerCol">
                        <img src={accesscontrol} alt="footer_logo" />
                        <p>Access Control</p>
                    </div>
                    <div className="col-lg-2 col-md-2 col-12 footerCol" style={{ borderRadius: "0 10px 0 0" }}>
                        <img src={security} alt="footer_logo_two" />
                        <p>security</p>
                    </div>
                </div>
                <p className="footerText" style={{ right: "10px" }}>Privacy Terms</p>
            </div>
        </div >
    )
}
export default Home;
