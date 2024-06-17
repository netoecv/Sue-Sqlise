const { DataTypes, Model } = require("sequelize");
const sequelize = require("./database"); // Arquivo de configuração da conexão com o banco de dados

class PagamentoAlunoVW extends Model {}

PagamentoAlunoVW.init(
  {
    id_Pagamento: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true, 
        references: {
          model: "Pagamento",
          key: "id_Pagamento",
        },
    },
    nome_pagamento: {
      type: DataTypes.DECIMAL,
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
    modelName: "PagamentoAlunoVW",
    tableName: "vw_pagamento_aluno",
    timestamps: false,
  }
);
/*
async function sincronizarPagamentoAlunoVW() {
  try {
    await PagamentoAlunoVW.sync({ force: false });
  } catch (error) {
    console.error("Erro ao sincronizar a tabela: ", error);
  } finally {
    await connection.close();
    console.log("Conexão fechada.");
  }
}

PagamentoAlunoVW.sync({ force: false }).then(() => {});
*/
module.exports = PagamentoAlunoVW;
