/**
 * Created by domenicovacchiano on 22/01/16.
 * Sequlize data model example. It refers to the Customer table of the DoYouRest database
 */

var Sequelize = require('sequelize');

function Customer(){
    return {
        id: { type: Sequelize.INTEGER, primaryKey: true },
        firstName: { type: Sequelize.STRING },
        lastName: { type: Sequelize.STRING }
    };
}
module.exports = Customer;