const { DataTypes, Sequelize } = require("sequelize");
const connection = require("./database");

const Professor = connection.define(
  "professor",
  {
    id_professor: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    nome_professor: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    especialidade: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
  },
  {
    timestamps: true,
    tableName: "professor", 
  }
);
/**/
async function sincronizarProfessor() {
  try {
    await Professor.sync({ force: false });
  } catch (error) {
    console.error("Erro ao sincronizar a tabela: ", error);
 
  }
}
module.exports ={
Professor: Professor,
sincronizarProfessor: sincronizarProfessor
};
Professor.sync({ force: false }).then(() => {});

module.exports = Professor;