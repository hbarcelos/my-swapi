import Sequelize from 'sequelize'
import client from '../database/client'

const Planet = client.define('Planet', {
  name: {
    type: Sequelize.STRING
  }
}, {
  underscored: true,
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
})

export default Planet
