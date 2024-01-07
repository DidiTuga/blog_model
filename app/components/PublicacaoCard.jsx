import React, { useState } from "react";
import Image from "next/image";


const PublicacaoCard = ({ pub, email }) => {
  const [editavel, setEditavel] = useState(false);
  const [pubEditavelTitle, setPubEditavelTitle] = useState("");
  const [pubEditavelText, setPubEditavelText] = useState("");

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

  const handleEditarClick = () => {
    if (editavel) {
      setEditavel(false);
    } else {
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
      setPubEditavelText(pub.text_pub);
    }
    if (pubEditavelTitle === "") {
      setPubEditavelTitle(pub.title_pub);
    }
    // Aqui você pode fazer algo com o texto, como enviar para um servidor
    putPub(pub.ID_pub, pubEditavelTitle, pubEditavelText);
  };

  return (
    <div key={pub.ID_pub} className="card mt-3 mb-3 ">
      <div className="card-header d-flex justify-content-between">
        <div>{pub.data_pub}</div>

          {pub.email_user == email ? (
            <div>
          <button
            onClick={() => handleEditarClick()}
            type="button"
            className="border-0 p-0 cursor-pointer bg-transparent"
          >
            <Image src="/edit.svg" alt="Editar" width="20" height="20" />
          </button>
          <button
            onClick={() => deletePub(pub.ID_pub)}
            type="button"
            className="border-0 p-0 cursor-pointer bg-transparent"
          >
            <Image src="/delete.svg" alt="Apagar" width="20" height="20" />
          </button>
          </div>
          ) : (
            <p></p>
          )}

      </div>
      <div className="card-body">
        {editavel ? (
          <div className="">
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                value={pubEditavelTitle}
                placeholder={pub.title_pub}
                onChange={(e) => setPubEditavelTitle(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <textarea
                className="form-control"
                value={pubEditavelText}
                placeholder={pub.text_pub}
                onChange={(e) => setPubEditavelText(e.target.value)}
              />
            </div>
            <div className="">
              <button className="btn btn-dark" onClick={handleSalvar}>
                Salvar
              </button>
            </div>
          </div>
        ) : (
          <div>
            <h5 className="card-title">{pub.title_pub}</h5>
            <p className="card-text">{pub.text_pub}</p>
          </div>
        )}
      </div>
      <div className="card-footer text-muted">Publicada por: {pub.email_user}</div>
    </div>
  );
};

export default PublicacaoCard;
