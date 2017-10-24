import Sequelize from 'sequelize'
import conf from './conf'

const { db, user, password, options } = conf

export default new Sequelize(db, user, password, options)
