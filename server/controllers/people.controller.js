import { map, pluck, prop } from '../utils'
import transform from './helpers/transform'

const queryOpts = {
  include: [{
    all: true
  }]
}

export const getAll = async ({ models }) =>
  map(transform)(await models.Person.findAll(queryOpts))

export const create = async ({ models, request }) => {
  const person = await models.Person.create(request.body)

  await Promise.all([
    person.setHome_planet(prop('id')(request.body.home_planet || {}) || null),
    person.setStarships(pluck('id')(request.body.starships || [])),
    person.setFilms(pluck('id')(request.body.films || []))
  ])

  return transform(person)
}

export const update = async ({ models, request, params }) => {
  const person = await models.Person.findById(params.id)

  if (!person) {
    return null
  }

  await Promise.all([
    person.update(request.body),
    person.setHome_planet(prop('id')(request.body.home_planet || {}) || null),
    person.setStarships(pluck('id')(request.body.starships || [])),
    person.setFilms(pluck('id')(request.body.films || []))
  ])

  return transform(person)
}

export const getById = async ({ models, request, params }) =>
  transform(await models.Person.findById(params.id, queryOpts))

export const removeById = ({ models, params }) =>
  models.Person.destroy({ where: { id: params.id } })
