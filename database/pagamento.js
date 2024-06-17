const { DataTypes } = require('sequelize');
const sequelize = require('./database'); 


const Pagamento = sequelize.define(
    'pagamento', 
    {
        id_Pagamento: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        nome_pagamento: {
            type: DataTypes.STRING,
            allowNull: true
        },
        valor: {
            type: DataTypes.DECIMAL,
            allowNull: true
        },
        data: {
            type: DataTypes.DATE,
        },
        taxa: {
            type: DataTypes.DECIMAL,
            allowNull: true
        },
        desconto: {
            type: DataTypes.DECIMAL,
            allowNull: true
        },
        Valor_Total: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
    }, 
    {
        tableName: 'pagamento',
        timestamps: false,
      
    }
);

/**/
async function sincronizarPagamento() {
    try {
        await Pagamento.sync({ force: false });
    } catch (error) {
        console.error("Erro ao sincronizar a tabela Aluno: ", error);
    }
}
module.exports = {
    Pagamento: Pagamento,
    sincronizarPagamento: sincronizarPagamento
};
Pagamento.sync({ force: false }).then(() => {});

module.exports = Pagamento;