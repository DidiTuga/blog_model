const db = require("./db");

let publicacoes = [];

function atualizaPublicacoes() {
  db.query(
    "SELECT ID_pub, data_pub, title_pub, text_pub, email_user, edit_pub FROM pub",
    function (err, rows, fields) {
      if (err) throw err;
      const publ = rows.map((row) => {
        return new Publicacao(
          row.ID_pub,
          row.data_pub,
          row.title_pub,
          row.text_pub,
          row.email_user,
          row.edit_pub
        );
      });
      publicacoes = publ;
    }
  );
}

export class Publicacao {
  // atributos

  // construtor

  constructor(ID_pub, data_pub, title_pub, text_pub, email_user, edit_pub) {
    this.ID_pub = ID_pub;
    this.data_pub = data_pub;
    this.title_pub = title_pub;
    this.text_pub = text_pub;
    this.email_user = email_user;
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
  get getEmail_user() {
    return this.email_user;
  }
  set setEmail_user(value) {
    this.email_user = value;
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
  static getPublicacoesByUser(email_user) {
    try {
      atualizaPublicacoes();
      const publ = publicacoes.filter((publ) => publ.getEmail_user == email_user);
      return publ;
    } catch (error) {
      console.error("Erro ao buscar publs:", error);
    }
  }

  // adiciona um publ
  static addPubl(publ) {
    try {
      const result = db.query(
        "INSERT INTO pub (data_pub, title_pub, text_pub, email_user, edit_pub) VALUES (?, ?, ?, ?, ?)",
        [
          publ.getData_pub,
          publ.getTitle_pub,
          publ.getText_pub,
          publ.getEmail_user,
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
      const publ = publicacoes.find((publ) => publ.getID_pub == ID_pub);
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
  static updatePublicacaoByID(ID_pub, title_pub, text_pub) {
    try {
      if (!ID_pub) {
        throw new Error("ID_pub não informado");
      }

      const data_pub = new Date().toISOString().slice(0, 19).replace("T", " ");

      db.query(
        "UPDATE pub SET title_pub = ?, text_pub = ?, data_pub = ?, edit_pub = 1 WHERE ID_pub = ?",
        [title_pub, text_pub, data_pub, ID_pub]
      );
    } catch (error) {
      console.error("Erro ao atualizar publ:", error);
    }
  }
}