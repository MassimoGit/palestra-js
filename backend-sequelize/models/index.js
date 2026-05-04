const sequelize = require('../config/database');
const TrainerModel = require('./Trainer');
const CustomerModel = require('./Customer');

const Trainer = TrainerModel(sequelize);
const Customer = CustomerModel(sequelize);

// Associazioni
Customer.belongsTo(Trainer, { foreignKey: 'trainer_id', as: 'trainer' });
Trainer.hasMany(Customer, { foreignKey: 'trainer_id', as: 'customers' });

module.exports = { sequelize, Trainer, Customer };
