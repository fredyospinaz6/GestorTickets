import { Sequelize } from "sequelize";


const sequelize = new Sequelize('rrhh', 'root', 'admin123', {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql',   
});

export default sequelize;