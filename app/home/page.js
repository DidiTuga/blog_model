// HOME PAGE
"use client";

import "bootstrap/dist/css/bootstrap.css";
import { useEffect, useState } from "react";
import PublicacaoCard from "../components/PublicacaoCard";
import { useSession} from "next-auth/react";

function Home() {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [pubs, setPubs] = useState([]);
  const [user, setUser] = useState(null);
  const {data: session, status} = useSession();
  useEffect(() => {
    if (status === "authenticated") {
      setUser(session?.user);
      console.log(user);
      // Agora você pode fazer o que precisa com os dados do usuário
    }else if (status === "unauthenticated"){
        window.location.href = "/";
    }
  }, [status, session]);
  // obtem os dados do servidor
  const getPub = async () => {
    try {
      const response = await fetch("/api/pub", {
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
  // envia os dados do formulário para o servidor
  const submitPub = async () => {
    try {
      const email = user.email;
      if (title === "" || text === "") {
        setErrorMessage("Preencha todos os campos!");
      } else {
        setErrorMessage("");
        const response = await fetch("/api/pub", {
          method: "POST",
          body: JSON.stringify({ title, text, email }),
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        await response.json();
        // atualiza a página
        location.reload();
      }
    } catch (error) {
      console.error(
        "There was a problem with the fetch operation: " + error.message
      );
    }
  };

  // apaga uma publicação do servidor pelo id
  const deletePub = async (id) => {
    try {
      const response = await fetch("/api/pub", {
        method: "DELETE",
        body: JSON.stringify({ id }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      await response.json();
      // atualiza a página

      location.reload();
    } catch (error) {
      console.error(
        "There was a problem with the fetch operation: " + error.message
      );
    }
  };

  // obtem os dados do servidor ao carregar a página
  useEffect(() => {
    getPub();
  }, []);

  return (
    <main>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card mt-3 shadow-lg">
              <div className="card-header pt-3 bg-dark text-white">
                <h5 className="text-center">Nova Publicação</h5>
              </div>
              <div className="card-body">
                <div className="form-group">
                  <input
                    type="text"
                    id="title"
                    className="mt-2 form-control"
                    placeholder="Título"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <textarea
                    value={text}
                    className="mt-2 form-control"
                    rows="3"
                    placeholder="Texto"
                    onChange={(e) => setText(e.target.value)}
                  />

                  <div className="mt-2">
                    <p className="text-danger text-center">{errorMessage}</p>
                  </div>

                  <button
                    className="mt-2 btn btn-dark w-100 p-2"
                    onClick={submitPub}
                  >
                    Submeter
                  </button>
                </div>
              </div>
            </div>

            <div>
              {pubs.map((pub) => (
                <PublicacaoCard
                  key={pub.ID_pub}
                  pub={pub}
                  deletePub={deletePub}
                  email={user?.email}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Home;
