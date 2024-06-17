const { DataTypes, Model } = require("sequelize");
const sequelize = require("./database"); 

class PagamentoAluno  extends Model {}

PagamentoAluno.init(
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
    id_Aluno: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: "Aluno",
        key: "id_Aluno",
      },
    },
  },
  {
    sequelize,
    modelName: "PagamentoAluno",
    tableName: "pagamentoaluno",
    timestamps: true,
  }
);
/**/
async function sincronizarPagamentoAluno() {
  try {
    await PagamentoAluno.sync({ force: true });
  } catch (error) {
    console.error("Erro ao sincronizar a tabela: ", error);
  } finally {
    await connection.close();
    console.log("Conexão fechada.");
  }
}
PagamentoAluno.sync({ force: false }).then(() => {});

module.exports = PagamentoAluno;
