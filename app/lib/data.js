const db = require("./db");

let publicacoes = [];

function atualizaPublicacoes() {
  db.query("SELECT * FROM pub", function (err, rows, fields) {
    if (err) throw err;
    const publ = rows.map((row) => {
      return new Publicacao(
        row.ID_pub,
        row.data_pub,
        row.title_pub,
        row.text_pub,
        row.ID_user,
        row.edit_pub
      );
    });
    publicacoes = publ;
  });
}

export class Publicacao {
  constructor(ID_pub, data_pub,title_pub, text_pub, ID_user, edit_pub) {
    this.ID_pub = ID_pub;
    this.data_pub = data_pub;
    this.title_pub = title_pub;
    this.text_pub = text_pub;
    this.ID_user = ID_user;
    this.edit_pub = edit_pub;
  }

  // busca todos os publs
  static getPublicacoes() {
    try {
      atualizaPublicacoes();
      return publicacoes;
    } catch (error) {
      console.error("Erro ao buscar publs:", error);
    }
  }
  // adiciona um publ
  static addPubl(publ) {
    try {
      const [result] = db.query(
        "INSERT INTO pub (data_pub, title_pub,text_pub, ID_user, edit_pub) VALUES (?, ?, ?, ?)",
        [publ.data_pub, publ.title_pub, publ.text_pub, publ.ID_user, publ.edit_pub]
      );

      publ.ID_pub = result.insertId;

      return publ;
    } catch (error) {
      console.error("Erro ao adicionar publ:", error);
    }
  }
  // busca um publ pelo ID
  static getPublicacaoByID(ID_pub) {
    try {
      const [rows] = db.query("SELECT * FROM pub WHERE ID_pub = ?", [ID_pub]);

      if (!rows.length) {
        throw new Error("Publicacao não encontrado");
      }

      const row = rows[0];

      const publ = new publ(
        row.ID_pub,
        row.data_pub,
        row.title_pub,
        row.text_pub,
        row.ID_user,
        row.edit_pub
      );

      return publ;
    } catch (error) {
      console.error("Erro ao buscar publ:", error);
    }
  }
  // apaga um publ
  static deletePublicacaoByID(ID_pub) {
    try {
      if (!ID_pub) {
        throw new Error("ID_pub não informado");
      }

      db.query("DELETE FROM pub WHERE ID_pub = ?", [ID_pub]);
    } catch (error) {
      console.error("Erro ao apagar publ:", error);
    }
  }
}
