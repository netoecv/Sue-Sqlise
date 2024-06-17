const { DataTypes } = require('sequelize');
const db = require('./database'); 


const Aluno_has_Turma = db.define(
  'Aluno_has_Turma',
   {
  Aluno_id_Aluno: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  Turma_id_Turma: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'Aluno_has_Turma', 
  timestamps: false, 
});

module.exports = Aluno_has_Turma;
/**/
async function sincronizarAluno_has_Turma() {
  try {
      await Aluno_has_Turma.sync({ force: false });
  } catch (error) {
      console.error("Erro ao sincronizar a tabela Aluno: ", error);
  }
}

module.exports = {
  Aluno_has_Turma: Aluno_has_Turma,
  sincronizarAluno_has_Turma: sincronizarAluno_has_Turma
};
Aluno_has_Turma.sync({ force: false }).then(() => {});
