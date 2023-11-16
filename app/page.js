// HOME PAGE
"use client";

import "bootstrap/dist/css/bootstrap.css";
import NavBar from "./components/navbar";
import Image from "next/image";
import { useEffect, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";

function Home() {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [pubs, setPubs] = useState([]);

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
      if (title === "" || text === "") {
        setErrorMessage("Preencha todos os campos!");
      } else {
        setErrorMessage("");
        const response = await fetch("/api/pub", {
          method: "POST",
          body: JSON.stringify({ title, text }),
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

  const putPub = async (id, title, text) => {
    try {
      const response = await fetch("/api/pub", {
        method: "PUT",
        body: JSON.stringify({ id, title, text }),
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
  const [pubEditavel, setPubEditavel] = useState(null);
  const [pubEditavelTitle, setPubEditavelTitle] = useState("");
  const [pubEditavelText, setPubEditavelText] = useState("");
  const [editavel, setEditavel] = useState(false);

  const handleEditar = (pub) => {
    setPubEditavel(pub);
    if (editavel) {
      setEditavel(false);
    }else{
      setEditavel(true);
    }
  };

  const handleSalvar = () => {
    setEditavel(false);
    // se o texto for vazio, não faz nada
    if (pubEditavelText === "" && pubEditavelTitle === "") {
      return;
    }

    if (pubEditavelText === "") {
      setPubEditavelText(pubEditavel.text_pub);
    }
    if (pubEditavelTitle === "") {
      setPubEditavelTitle(pubEditavel.title_pub);
    }
    // Aqui você pode fazer algo com o texto, como enviar para um servidor
    putPub(pubEditavel.ID_pub, pubEditavelTitle, pubEditavelText);
  };

  return (
    <main>
      <NavBar />
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
                <div key={pub.ID_pub} className="card mt-3 mb-3">
                  <div className="card-header d-flex justify-content-between">
                    <div>{pub.data_pub}</div>
                    <div>
                      <button
                        onClick={() => handleEditar(pub)}
                        type="button"
                        className="border-0 p-0 cursor-pointer bg-transparent"
                      >
                        <Image
                          src="/edit.svg"
                          alt="Delete"
                          width="20"
                          height="20"
                        />
                      </button>
                      <button
                        onClick={() => deletePub(pub.ID_pub)}
                        type="button"
                        className="border-0 p-0 cursor-pointer bg-transparent"
                      >
                        <Image
                          src="/delete.svg"
                          alt="Delete"
                          width="20"
                          height="20"
                        />
                      </button>
                    </div>
                  </div>
                  <div className="card-body">
                    {editavel && pubEditavel.ID_pub == pub.ID_pub ? (
                      <div>
                        <input
                          type="text"
                          placeholder={pub.title_pub}
                          onChange={(e) => setPubEditavelTitle(e.target.value)}
                        />
                        <textarea
                          placeholder={pub.text_pub}
                          onChange={(e) => setPubEditavelText(e.target.value)}
                        />
                        <button onClick={handleSalvar}>Salvar</button>
                      </div>
                    ) : (
                      <div>
                        <h5 className="card-title">{pub.title_pub}</h5>
                        <p className="card-text">{pub.text_pub}</p>
                      </div>
                    )}
                  </div>
                  <div className="card-footer text-muted">
                    Publicada por: ...
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Home;
