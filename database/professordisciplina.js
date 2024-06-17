const { DataTypes, Model } = require('sequelize');
const sequelize = require('./database'); 

class ProfessorDisciplina extends Model{}
  ProfessorDisciplina.init(
   {
    id_professor: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    references: {
      model: "Professor",
      key: "id_professor",
    },
  },
   id_disciplina: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    references: {
      model: "Disciplina",
      key: "id_disciplina",
    },
  }
}, {
  sequelize,
  modelName: 'ProfessorDisciplina',
  tableName: 'professordisciplina', 
  timestamps: false, 
  

}
);
/**/
async function sincronizarProfessorDisciplina() {
  try {
      await ProfessorDisciplina.sync({ force: false });
  } catch (error) {
      console.error("Erro ao sincronizar a tabela Aluno: ", error);
  }
}
module.exports = {
    ProfessorDisciplina: ProfessorDisciplina,
    ProfessorDisciplina: ProfessorDisciplina
};
ProfessorDisciplina.sync({ force: false }).then(() => {});

module.exports = ProfessorDisciplina;

