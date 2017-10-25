import { map, pluck } from '../utils'
import transform from './helpers/transform'

const queryOpts = {
  include: [{
    all: true
  }]
}

export const getAll = async ({ models }) =>
  map(transform)(await models.Planet.findAll(queryOpts))

export const create = async ({ models, request }) => {
  const planet = await models.Planet.create(request.body)

  await Promise.all([
    planet.setResidents(pluck('id')(request.body.residents || [])),
    planet.setFilms(pluck('id')(request.body.films || []))
  ])

  return transform(planet)
}

export const update = async ({ models, request, params }) => {
  const planet = await models.Planet.findById(params.id)

  if (!planet) {
    return null
  }

  await Promise.all([
    planet.update(request.body),
    planet.setResidents(pluck('id')(request.body.residents || [])),
    planet.setFilms(pluck('id')(request.body.films || []))
  ])

  return transform(planet)
}

export const getById = async ({ models, request, params }) =>
  transform(await models.Planet.findById(params.id, queryOpts))

export const removeById = ({ models, params }) =>
  models.Planet.destroy({ where: { id: params.id } })
