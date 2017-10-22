import Sequelize from 'sequelize'

export default {
  db: 'swapi',
  user: '',
  password: '',
  options: {
    logging: false,
    dialect: 'sqlite',
    pool: {
      max: 5,
      min: 0,
      idle: 1000
    },
    storage: 'storage/swapi.db',
    operatorsAliases: Sequelize.Op
  }
}
