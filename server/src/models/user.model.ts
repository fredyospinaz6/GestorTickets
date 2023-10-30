import { DataTypes } from 'sequelize';
import sequelize from '../db/connection';
import { Ticket } from './ticket.model';

export const User = sequelize.define('users', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    lastname: {
        type: DataTypes.STRING,
        allowNull: true
    },
    role: {
        type: DataTypes.STRING,
        allowNull: true
    },
});

User.hasMany(Ticket, { as: 'ticketsCreados', foreignKey: 'userId' });
User.hasMany(Ticket, { as: 'ticketsAsignados', foreignKey: 'tecnicoId' }); // Define la relación uno a muchos