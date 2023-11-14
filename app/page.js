"use client";

import "bootstrap/dist/css/bootstrap.css";
import Link from "next/link";
import NavBar from "./components/navbar";
import { useEffect, useState } from "react";

function Home() {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  const [pubs, setPubs] = useState([]);

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
      setPubs(data.posts);
      // handle the response data
    } catch (error) {
      console.error(
        "There was a problem with the fetch operation: " + error.message
      );
    }
  };

  const submitPub = async () => {
    try {
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

      const data = await response.json();
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
    <main>
      <NavBar />
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <h2 className="text-center">Home Page</h2>
            <div className="card">
              <div className="card-body">
                <div className="form-group">
                  <input
                    type="text"
                    id="title"
                    className="m-1 form-control"
                    placeholder="Título"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />

                  <textarea
                    value={text}
                    className="m-1 form-control"
                    rows="3"
                    onChange={(e) => setText(e.target.value)}
                  />

                  <button className="m-1 btn btn-primary" onClick={submitPub}>
                    Submit
                  </button>
                </div>
              </div>
            </div>

            <div>
              {pubs.map((pub) => (
                <div key={pub.ID_pub} className="card mt-3 shadow-lg">
                  <div className="card-header bg-primary text-white">
                    <h3 className="text-center">{pub.title_pub}</h3>
                  </div>
                  <div className="card-body">
                    <p>{pub.text_pub}</p>
                    <p>{pub.data_pub}</p>
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
