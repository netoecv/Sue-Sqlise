const { DataTypes, Sequelize } = require("sequelize");
const connection = require("./database");
const Disciplina = connection.define(
  "disciplina",
  {
    id_disciplina: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    nome_disciplina: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    carga_horaria: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    descricao_disciplina:{
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  },
  {
    timestamps: true, 
    tableName: "disciplina",
  }
);
/**/
async function sincronizarDisciplina() {
  try {
    await Disciplina.sync({ force: false });
  } catch (error) {
    console.error("Erro ao sincronizar a tabela: ", error);
  } finally {
    await connection.close();
    console.log("Conexão fechada.");
  }
}
module.exports = {
Disciplina: Disciplina,
sincronizarDisciplina: sincronizarDisciplina
};
Disciplina.sync({ force: false }).then(() => {});

module.exports = Disciplina;