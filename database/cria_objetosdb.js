// Este módulo é responsável por criar os objetos do banco de dados
const { Sequelize } = require("sequelize");
const Disciplina = require("./Disciplina");

//Sincroniza o modelo com o banco de dados para criar a tabela
async function sincronizarDisciplina() {
  try {
    await Disciplina.sync({ force: false });
  } catch (error) {
    console.error("Erro ao sincronizar a tabela: ", error);
  } finally {
    await Sequelize.close();
    console.log("Conexão fechada.");
  }
}

sincronizarDisciplina();
