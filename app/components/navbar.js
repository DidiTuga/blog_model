import Image from "next/image";
import Link from "next/link";

function NavBar() {
  // use client

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link href="/">
            <Image src="/../favicon.ico" alt="logo" width="25" height="25" />
          </Link>
          <div>
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link href="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link href="/dashboard">Dashboard</Link>
              </li>
              <li className="nav-item">
                <Link href="/api/pub">API</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
