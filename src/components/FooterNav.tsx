import "../styles/FooterNav.css";

const FooterNav = () => {
  return (
    <footer className="footer-nav">
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <h3>About Us</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere unde omnis veniam porro excepturi.</p>
            <ul>
              <li><a href="#"><span></span> +1 291 3912 329</a></li>
              <li><a href="#"><span></span> <span>[email&#160;protected]</span></a></li>
            </ul>
          </div>

          <div className="col-md-3">
            <h3>Latest Tweets</h3>
            <ul>
              <li>
                <div><span></span></div>
                <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere unde omnis veniam porro excepturi.</div>
              </li>
              <li>
                <div><span></span></div>
                <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere unde omnis veniam porro excepturi.</div>
              </li>
            </ul>
          </div>

          <div className="col-md-3">
            <h3>Instagram</h3>
            <div className="social-icons">
              <a href="#"><i className="fab fa-instagram"></i></a>
              <a href="#"><i className="fab fa-instagram"></i></a>
            </div>
          </div>

          <div className="col-md-3">
            <h3>Navigation</h3>
            <ul>
              <li><a href="#">Home</a></li>
              <li><a href="#">About</a></li>
              <li><a href="#">Services</a></li>
              <li><a href="#">Contact</a></li>
              <li><a href="#">Blog</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterNav;
