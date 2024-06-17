const { DataTypes, Sequelize } = require("sequelize");
const connection = require("./database");

const connection = require("./database");

const Usuario = connection.define(
    "usuario",
    {
      id_usuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,                                              
      },
      nome_usuario: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
     telefone_usuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      email_usuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      cpf_usuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
       endereco_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      timestamps: true, // Habilita a criação automática de campos de timestamp
      tableName: "usuario", // Nome da tabela no banco de dados
    }
  );

  async function sincrozinarUsuario() {
    try {
      await Usuario.sync({ force: true });
    } catch (error) {
      console.error("Erro ao sincronizar a tabela: ", error);
    } finally {
      await connection.close();
      console.log("Conexão fechada.");
    }
  }
  
  
  module.exports = {
      Usuario: Usuario,
      sincrozinarUsuario: sincrozinarUsuario
    }; 

    module.exports = Usuario;
  