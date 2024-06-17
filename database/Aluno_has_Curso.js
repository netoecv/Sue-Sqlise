const { DataTypes } = require('sequelize');
const db = require('./database'); 

const Aluno_has_Curso = db.define(
  'Aluno_has_Curso',
   {
    Aluno_id_Aluno: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
   Curso_id_Curso: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'Aluno_has_Curso',
  timestamps: false, 
  
 
});
/**/
async function sincronizarAluno_has_Curso() {
  try {
      await Aluno_has_Curso.sync({ force: false });
  } catch (error) {
      console.error("Erro ao sincronizar a tabela Aluno: ", error);
  }
}

module.exports = {
  Aluno_has_Curso: Aluno_has_Curso,
  sincronizarAluno_has_Curso: sincronizarAluno_has_Curso
};

Aluno_has_Curso.sync({ force: false }).then(() => {});

module.exports = Aluno_has_Curso;