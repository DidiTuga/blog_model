"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";

function dashboard() {
  const {data: session, status} = useSession();

  if (status ==="authenticated"){
    window.location.href = "/";
}


  return (
    <main className="container mt-5">
      <h1 className="mb-4">Dashboard</h1>
      <p className="description mb-4">
        This is the dashboard page. You can access this page only after
        authentication.
      </p>

      <div className="d-flex align-items-center mb-3">
        <Image
          src={session.user.image}
          width={35}
          height={35}
          className="radius-50 me-2"
          alt="profile image"
        />
        <p className="description mb-0">
          {session.user.name} ({session.user.email})
        </p>
      </div>
    </main>
  );
}

export default dashboard;
