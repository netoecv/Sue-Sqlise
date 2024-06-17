const { DataTypes,Sequelize } = require('sequelize');
const connection = require('./database'); 


const Coordenador = connection.define('coordenador', {
  id_Coordenador: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  nome_coordenador: {
    type: DataTypes.STRING(45),
    allowNull: true
  },
  email: {
    type: DataTypes.STRING(45),
    allowNull: true
  },
 
},
 {
  tableName: 'coordenador',
  timestamps: false,

});



/**/
async function sincronizarCoordenador() {
  try {
    await Coordenador.sync({ force: false });
  } catch (error) {
    console.error("Erro ao sincronizar a tabela: ", error);
  } finally {
    await connection.close();
    console.log("Conexão fechada.");
  }
}


module.exports = {
  Coordenador: Coordenador,
  sincronizarCoordenador: sincronizarCoordenador
};


Coordenador.sync({ force: false }).then(() => {});

module.exports = Coordenador;