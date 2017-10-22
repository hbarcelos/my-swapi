import { map, pluck } from '../utils'
import transform from './helpers/transform'

const queryOpts = {
  include: [{
    all: true
  }]
}

export const getAll = async ({ models }) =>
  map(transform)(await models.Film.findAll(queryOpts))

export const create = async ({ models, request }) => {
  const film = await models.Film.create(request.body)

  await Promise.all([
    film.setCharacters(pluck('id')(request.body.characters || [])),
    film.setPlanets(pluck('id')(request.body.planets || [])),
    film.setStarships(pluck('id')(request.body.starships || []))
  ])

  return transform(film)
}

export const update = async ({ models, request, params }) => {
  const film = await models.Film.findById(params.id)

  if (!film) {
    return null
  }

  await Promise.all([
    film.update(request.body),
    film.setCharacters(pluck('id')(request.body.characters || [])),
    film.setPlanets(pluck('id')(request.body.planets || [])),
    film.setStarships(pluck('id')(request.body.starships || []))
  ])

  return transform(film)
}

export const getById = async ({ models, request, params }) =>
  transform(await models.Film.findById(params.id, queryOpts))
