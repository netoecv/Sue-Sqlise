const { DataTypes,Sequelize } = require('sequelize');
const connection= require('./database'); 

const Avaliacao = connection.define('avaliacao', {
  id_Avaliacao: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  nome_avaliacao: {
    type: DataTypes.STRING(60),
    allowNull: true
  },
  valor: {
    type: DataTypes.DECIMAL,
    allowNull: true,
  },
  data: {
    type: DataTypes.DATE,
    allowNull: true,
  },
}, {
  tableName: 'avaliacao',
  timestamps: false,

});


/**/
async function sincronizarAvaliacao() {
  try {
    await Avaliacao.sync({ force: false });
  } catch (error) {
    console.error("Erro ao sincronizar a tabela: ", error);
  } finally {
    await connection.close();
    console.log("Conexão fechada.");
  }
}

module.exports = {
    Avaliacao: Avaliacao,
  sincronizarAvaliacao: sincronizarAvaliacao
};


Avaliacao.sync({ force: false }).then(() => {});

module.exports = Avaliacao;