import Sequelize from 'sequelize'
import client from '../database/client'

const Person = client.define('Person', {
  name: {
    type: Sequelize.STRING
  },
  gender: {
    type: Sequelize.STRING
  }
}, {
  timestamps: true,
  underscored: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
})

export default Person
