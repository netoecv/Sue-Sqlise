const { DataTypes, Sequelize } = require('sequelize');
const connection = require('./database'); 


const Turma = connection.define(
  'turma', {
  id_Turma: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  nome_turma: {
    type: DataTypes.STRING(45),
    allowNull: true
  },
  ano: {
    type: DataTypes.STRING(45),
    allowNull: true
  },
  semestre: {
    type: DataTypes.DECIMAL,
    allowNull: true
  },
}, 
{
  tableName: 'turma',
  timestamps: false,

}
);
async function sincronizarTurma() {
  try {
    await Turma.sync({ force: false });
  } catch (error) {
    console.error("Erro ao sincronizar a tabela: ", error);
  } finally {
    await connection.close();
    console.log("Conexão fechada.");
  }
}
/**/
module.exports = {
Turma: Turma,
sincronizarTurma: sincronizarTurma
};
Turma.sync({ force: false }).then(() => {});

module.exports = Turma;