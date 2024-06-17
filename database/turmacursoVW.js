const { DataTypes, Model } = require("sequelize");
const sequelize = require("./database"); 

class TurmaCursoVW extends Model {}

TurmaCursoVW.init(
  {
    id_Turma: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true, 
        references: {
          model: "Turma",
          key: "id_Turma",
        },
    },
    nome_turma: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: false,
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
    nome_curso: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: false,
    },
  },
  {
    sequelize,
    modelName: "TurmaCursoVW",
    tableName: "vw_turma_curso",
    timestamps: false,
  }
);
/* 
async function sincronizarTurmaCursoVW() {
  try {
    await TurmaCursoVW.sync({ force: false });
  } catch (error) {
    console.error("Erro ao sincronizar a tabela: ", error);
  } finally {
    await connection.close();
    console.log("Conexão fechada.");
  }
}
TurmaCursoVW.sync({ force: false }).then(() => {});  */

module.exports = TurmaCursoVW;
