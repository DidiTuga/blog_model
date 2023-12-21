"use client";
import Image from "next/image";
import Link from "next/link";
import Prof_log from "./prof_log";

function NavBar() {
  // use client

  return (
<div className="m-5">
  <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
    <div className="container-fluid">
      <Link href="/">
        <Image src="/../favicon.ico" alt="logo" width="35" height="35" />
      </Link>
      <div className="collapse navbar-collapse ms-auto" id="navbarNav">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link href="/" id="no-decoration" className="nav-link text-white">Home</Link>
          </li>
          <li className="nav-item">
            <Link href="/dashboard" id="no-decoration" className="nav-link text-white">Dashboard</Link>
          </li>
          <li className="nav-item">
            <Link href="/api/pub" className="nav-link text-white">API</Link>
          </li>
        </ul>
        <Prof_log /> 
      </div>
    </div>
  </nav>
</div>
  );
}

export default NavBar;
