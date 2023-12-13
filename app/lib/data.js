const db = require("./db");

let publicacoes = [];
let users = [];

function atualizaPublicacoes() {
  db.query(
    "SELECT ID_pub, data_pub, title_pub, text_pub, ID_user, edit_pub FROM pub",
    function (err, rows, fields) {
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
    }
  );
}
function atualizaUsers() {
  db.query(
    "SELECT ID_user, name_user, email_user, image_user FROM user",
    function (err, rows, fields) {
      if (err) throw err;
      const user = rows.map((row) => {
        return new User(
          row.ID_user,
          row.name_user,
          row.email_user,
          row.image_user
        );
      });
      users = user;
    }
  );
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

export class User {
  constructor(ID_user, name_user, email_user, image_user) {
    this.ID_user = ID_user;
    this.name_user = name_user;
    this.email_user = email_user;
    this.image_user = image_user;
  }
  get getID_user() {
    return this.ID_user;
  }
  set setID_user(value) {
    this.ID_user = value;
  }
  get getName_user() {
    return this.name_user;
  }
  set setName_user(value) {
    this.name_user = value;
  }
  get getEmail_user() {
    return this.email_user;
  }
  set setEmail_user(value) {
    this.email_user = value;
  }
  get getImage_user() {
    return this.image_user;
  }
  set setImage_user(value) {
    this.image_user = value;
  }
  static getUsers() {
    try {
      atualizaUsers();
      return users;
    } catch (error) {
      console.error("Erro ao buscar users:", error);
    }
  }
  static addUser(user) {
    try {
      const result = db.query(
        "INSERT INTO user (ID_user, name_user, email_user, image_user) VALUES (?, ?, ?, ?)",
        [
          user.getID_user,
          user.getName_user,
          user.getEmail_user,
          user.getImage_user,
        ]
      );
    } catch (error) {
      console.log("Erro ao adicionar publ:", error);
    }
  }
  static getUserByID(ID_user) {
    try {
      const user = users.find((user) => user.getID_user == ID_user);
      return user;
    } catch (error) {
      console.error("Erro ao buscar user:", error);
    }
  }

  static updateUserByID(ID_user, name_user, email_user, image_user) {
    try {
      if (!ID_user) {
        throw new Error("ID_user não informado");
      }

      db.query(
        "UPDATE user SET name_user = ?, email_user = ?, image_user = ?) WHERE ID_user = ?",
        [name_user, email_user, image_user, ID_user]
      );
    } catch (error) {
      console.error("Erro ao atualizar user:", error);
    }
  }

  static deleteUserByID(ID_user) {
    try {
      if (!ID_user) {
        throw new Error("ID_user não informado");
      }

      db.query("DELETE FROM user WHERE ID_user = ?", [ID_user]);
    } catch (error) {
      console.error("Erro ao apagar user:", error);
    }
  }
}
