import Sequelize from 'sequelize'
import client from '../database/client'

const Film = client.define('Film', {
  title: {
    type: Sequelize.STRING
  },
  episode_id: {
    type: Sequelize.INTEGER
  },
  release_date: {
    type: Sequelize.DATE
  },
  director: {
    type: Sequelize.STRING
  },
  producer: {
    type: Sequelize.STRING
  }
}, {
  underscored: true,
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
})

export default Film
