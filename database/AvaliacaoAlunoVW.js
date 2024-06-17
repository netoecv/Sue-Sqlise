const { DataTypes, Model } = require("sequelize");
const sequelize = require("./database"); 


class AvaliacaoAlunoVW  extends Model {}

AvaliacaoAlunoVW.init(
  {
    id_Avaliacao: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: "Avaliacao",
        key: "id_Avaliacao",
      },
    },
    nome_avaliacao: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: false,
    },
    id_Aluno: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: "Aluno",
        key: "id_Aluno",
      },
    },
    nome_aluno: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: false,
    },
  },
  {
    sequelize,
    modelName: "AvaliacaoAluno",
    tableName: "vw_avaliacao_aluno",
    timestamps: false,
  }
);
/* 
async function sincronizarAvaliacaoAlunoVW() {
  try {
    await AvaliacaoAlunoVW.sync({ force: true });
  } catch (error) {
    console.error("Erro ao sincronizar a tabela: ", error);
  } finally {
    await connection.close();
    console.log("Conexão fechada.");
  }
}

AvaliacaoAlunoVW.sync({ force: false }).then(() => {}); */

module.exports = AvaliacaoAlunoVW;
