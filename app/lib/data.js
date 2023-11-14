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
  // atributos

  // construtor

  constructor(ID_pub, data_pub, title_pub, text_pub, ID_user, edit_pub) {
    this.ID_pub = ID_pub;
    this.data_pub = data_pub;
    this.title_pub = title_pub;
    this.text_pub = text_pub;
    this.ID_user = ID_user;
    this.edit_pub = edit_pub;
  }
  // getters e setters
  get getID_pub() {
    return this.ID_pub;
  }
  set setID_pub(value) {
    this.ID_pub = value;
  }
  get getData_pub() {
    return this.data_pub;
  }
  set setData_pub(value) {
    this.data_pub = value;
  }
  get getTitle_pub() {
    return this.title_pub;
  }
  set setTitle_pub(value) {
    this.title_pub = value;
  }
  get getText_pub() {
    return this.text_pub;
  }
  set setText_pub(value) {
    this.text_pub = value;
  }
  get getID_user() {
    return this.ID_user;
  }
  set setID_user(value) {
    this.ID_user = value;
  }
  get getEdit_pub() {
    return this.edit_pub;
  }
  set setEdit_pub(value) {
    this.edit_pub = value;
  }
  // métodos estáticos

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
      const result = db.query(
        "INSERT INTO pub (data_pub, title_pub, text_pub, ID_user, edit_pub) VALUES (?, ?, ?, ?, ?)",
        [
          publ.getData_pub,
          publ.getTitle_pub,
          publ.getText_pub,
          publ.getID_user,
          publ.getEdit_pub,
        ]
      );
    } catch (error) {
      console.log("Erro ao adicionar publ:", error);
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
