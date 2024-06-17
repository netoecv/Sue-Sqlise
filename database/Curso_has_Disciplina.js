const { DataTypes } = require('sequelize');
const db = require('./database'); 
const Curso_has_Disciplina= db.define(
  'Curso_has_Disciplina',
   {
  Curso_id_Curso: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  Disciplina_id_Disciplina: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'Curso_has_Disciplina', 
  timestamps: false, 

});
/**/

async function sincronizarCurso_has_Disciplina() {
  try {
      await Curso_has_Disciplina.sync({ force: false });
  } catch (error) {
      console.error("Erro ao sincronizar a tabela Aluno: ", error);
  }
}
module.exports = {
  Curso_has_Disciplina: Curso_has_Disciplina,
    sincronizarCurso_has_Disciplina: sincronizarCurso_has_Disciplina
};
Curso_has_Disciplina.sync({ force: false }).then(() => {});

