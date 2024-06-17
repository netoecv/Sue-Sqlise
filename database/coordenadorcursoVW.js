const { DataTypes, Model } = require("sequelize");
const sequelize = require("./database"); 
class CoordenadorCursoVW extends Model {}

CoordenadorCursoVW.init(
  {
    id_Coordenador: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: "Coordenador",
        key: "id_Coordenador",
      },
    },
    nome_coordenador: {
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
    modelName: "CoordenadorCursoVW",
    tableName: "vw_coordenador_curso",
    timestamps: false,
  }
);
/*
async function sincronizarCoordenadorCursoVW() {
  try {
    await CoordenadorCursoVW.sync({ force: false });
  } catch (error) {
    console.error("Erro ao sincronizar a tabela: ", error);
  } finally {
    await connection.close();
    console.log("Conexão fechada.");
  }
}

CoordenadorCursoVW.sync({ force: false }).then(() => {});
*/
module.exports = CoordenadorCursoVW;
