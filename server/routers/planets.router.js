import Router from 'koa-router'
import { compose } from '../utils'
import handler from './helpers/handler'
import { create, getAll, update, getById } from '../controllers/planets.controller'
import {
  augmentUrlFromId,
  augmentNestedEntityUrl,
  getUrlForEntityArray
} from './helpers/url'

const router = new Router()

export const getUrl = planetId => router.url('get_planet_id', planetId)

const dataTransformation = compose(
  augmentUrlFromId(getUrl),
  augmentNestedEntityUrl('residents', getUrlForEntityArray('/api/people/:id')),
  augmentNestedEntityUrl('films', getUrlForEntityArray('/api/films/:id'))
)

export default router
  .get('get_planets', '/planets', handler(getAll, {
    transform: data => data.map(dataTransformation)
  }))
  .post('post_planets', '/planets', handler(create, {
    transform: augmentUrlFromId(getUrl)
  }))
  .put('put_planet_id', '/planets/:id', handler(update, {
    transform: augmentUrlFromId(getUrl)
  }))
  .get('get_planet_id', '/planets/:id', handler(getById, {
    transform: dataTransformation
  }))
