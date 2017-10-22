import { map, pluck } from '../utils'
import transform from './helpers/transform'

const queryOpts = {
  include: [{
    all: true
  }]
}

export const getAll = async ({ models }) =>
  map(transform)(await models.Starship.findAll(queryOpts))

export const create = async ({ models, request }) => {
  const starship = await models.Starship.create(request.body)

  await Promise.all([
    starship.setPilots(pluck('id')(request.body.pilots || [])),
    starship.setFilms(pluck('id')(request.body.films || []))
  ])

  return transform(starship)
}

export const update = async ({ models, request, params }) => {
  const starship = await models.Starship.findById(params.id)

  if (!starship) {
    return null
  }

  await Promise.all([
    starship.update(request.body),
    starship.setPilots(pluck('id')(request.body.pilots || [])),
    starship.setFilms(pluck('id')(request.body.films || []))
  ])

  return transform(starship)
}

export const getById = async ({ models, request, params }) =>
  transform(await models.Starship.findById(params.id, queryOpts))
