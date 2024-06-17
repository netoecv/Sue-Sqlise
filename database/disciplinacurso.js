const { DataTypes, Model } = require("sequelize");
const sequelize = require("./database");

class DisciplinaCurso extends Model {}

DisciplinaCurso.init(
  {
    id_disciplina: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: "Disciplina",
        key: "id_disciplina",
      },
    },
    id_Curso: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: "Curso",
        key: "id_Curso",
      },
    },
  },
  {
    sequelize,
    modelName: "DisciplinaCurso",
    tableName: "disciplinacurso",
    timestamps: true,
  }
);
/**/
async function sincronizarDisciplinaCurso() {
  try {
    await DisciplinaCurso.sync({ force: true });
  } catch (error) {
    console.error("Erro ao sincronizar a tabela: ", error);
  } finally {
    await connection.close();
    console.log("Conexão fechada.");
  }
}

DisciplinaCurso.sync({ force: false }).then(() => {});

module.exports = DisciplinaCurso;
