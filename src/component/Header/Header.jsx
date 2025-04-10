import { Link } from "react-router-dom";
const Header = () => {
  return (
    <header>
      {/* <div></div> */}
      <nav>
        <div>
          <Link to="/">
            <img
              className="logo"
              decoding="async"
              loading="eager"
              src="https://images.ctfassets.net/9haz2glq4wt0/3u3bSJcxg7Yk8RKpbO5Ygc/039d9e7e9a490b9ce006ba4f107c1da1/Calendly_Logo.webp?h=256&fm=webp&fit=pad&w=256&q=100"
              alt=""
            />
            <h3>Calendlly</h3>
          </Link>
          <ul className="main_navlink">
            <li>Product</li>
            <li>Solutions</li>
            <li>Enterprize</li>
            <li>Pricing</li>
            <li>Resources</li>
          </ul>
          <ul className="login_navlink">
            <Link to="/login">
              <li>Log In</li>
            </Link>
            <Link to="/signup">
              <li >
                <button>Get started</button>
              </li>
            </Link>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
