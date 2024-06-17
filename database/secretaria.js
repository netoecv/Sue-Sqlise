const { DataTypes } = require('sequelize');
const sequelize = require('./database'); // Importe o objeto Sequelize configurado

const Secretaria = sequelize.define('secretaria', {
    id_Secretaria: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    nome: {
        type: DataTypes.STRING(45),
        allowNull: true
    }
}, 
{
    tableName: 'secretaria',
    timestamps: false
});
/*
async function sincronizarSecretaria() {
    try {
        await Secretaria.sync({ force: false });
    } catch (error) {
        console.error("Erro ao sincronizar a tabela Secretaria: ", error);
    }
}

module.exports = {
    Secretaria: Secretaria,
    sincronizarSecretaria: sincronizarSecretaria
};

Secretaria.sync({ force: false }).then(() => {});
*/
module.exports = Secretaria;