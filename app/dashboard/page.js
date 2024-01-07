"use client";
import { useSession } from "next-auth/react";
import "bootstrap/dist/css/bootstrap.css";
import Image from "next/image";
import { useEffect, useState } from "react";
import PublicacaoCard from "../components/PublicacaoCard";

function dashboard() {
  const [pubs, setPubs] = useState([]);
  const { data: session, status } = useSession();
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (status === "authenticated") {
      setUser(session?.user);
      // Agora você pode fazer o que precisa com os dados do usuário
    } else if (status === "unauthenticated") {
      window.location.href = "/";
    }
  }, [status, session]);
  const getPub = async () => {
    try {
      const response = await fetch("/api/pub/" + session?.user.email, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      // ordena os posts por data da mais recente para a mais antiga e coloca a nova data no formato normal
      data.posts.sort((a, b) => {
        return new Date(b.data_pub) - new Date(a.data_pub);
      });
      data.posts.forEach((pub) => {
        pub.data_pub = new Date(pub.data_pub).toLocaleString();
      });

      setPubs(data.posts);
      // handle the response data
    } catch (error) {
      console.error(
        "There was a problem with the fetch operation: " + error.message
      );
    }
  };

  useEffect(() => {
    getPub();
  }, []);

  return (
    <main className="container mt-5">
      <h1 className="mb-4">Dashboard</h1>
      <p className="description mb-4">
        This is the dashboard page. You can access this page only after
        authentication.
      </p>

      <div className="d-flex align-items-center mb-3">
        <Image
          src={user?.image}
          width={35}
          height={35}
          className="radius-50 me-2"
          alt="profile image"
        />
        <p className="description mb-0">
          {user?.name} ({user?.email})
        </p>
      </div>
      <div>
        {pubs.map((pub) => (
          <PublicacaoCard key={pub.ID_pub} pub={pub} email={user.email} />
        ))}
      </div>
    </main>
  );
}

export default dashboard;
