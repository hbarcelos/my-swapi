import Sequelize from 'sequelize'
import client from '../database/client'

const Starship = client.define('Starship', {
  name: {
    type: Sequelize.STRING
  }
}, {
  underscored: true,
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
})

export default Starship
