import { LogoFooter } from "./icon/SvgPage";

const Footer = () => {
  return (
    <div style={{ marginTop: 50, backgroundColor: '#F4F5F6'}} id="footer">
      <div className="container">
        <div className="row">
          <div className=" box_flashSale col-xl-4 col-lg-5 col-md-5 col-sm-12 col-12 mt-5">
            <LogoFooter />
          </div>
          <div className="box_flashSale col-xl-8 col-lg-7 col-md-7 col-sm-12 col-12 mt-5">
            <nav>
              <ul className="row">
                <li className="col-xl-3 col-lg-4 col-md-5 col-sm-6 col-6">
                  <strong>Company</strong>
                  <ul style={{ padding: "30px 0px" }}>
                    <li style={{ marginTop: "15px" }}>About us</li>
                    <li style={{ marginTop: "15px" }}>Press</li>
                  </ul>
                </li>
                <li className="col-xl-3 col-lg-4 col-md-5 col-sm-6 col-6">
                  <strong>Support</strong>
                  <ul style={{ padding: "30px 0px" }}>
                    <li style={{ marginTop: "15px" }}>Privacy Policy</li>
                    <li style={{ marginTop: "15px" }}>Terms & Conditons</li>
                  </ul>
                </li>
                <li className="col-xl-3 col-lg-4 col-md-5 col-sm-6 col-6">
                  <strong>Support</strong>
                  <ul style={{ padding: "30px 0px" }}>
                    <li style={{ marginTop: "15px" }}>Privacy Policy</li>
                    <li style={{ marginTop: "15px" }}>Terms & Conditons</li>
                  </ul>
                </li>
                <li className="col-xl-3 col-lg-4 col-md-5 col-sm-6 col-6">
                  <strong>Support</strong>
                  <ul style={{ padding: "30px 0px" }}>
                    <li style={{ marginTop: "15px" }}>Privacy Policy</li>
                    <li style={{ marginTop: "15px" }}>Terms & Conditons</li>
                  </ul>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Footer;
