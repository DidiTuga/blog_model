"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";

function dashboard() {
  const {data: session, status} = useSession();


  return (
    <main>
      <h1>Dashboard</h1>
      <p className="description">
        This is the dashboard page. You can access this page only after
        authentication.
      </p>

      <Image src={session.user.image} width={35} height={35} className="radius-50" alt="profile image" />
      <p className="description">
        {session.user.name} ({session.user.email})
      </p>
      
    </main>
  );
}

export default dashboard;
