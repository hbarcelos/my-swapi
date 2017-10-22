import Router from 'koa-router'
import { compose } from '../utils'
import handler from './helpers/handler'
import { create, getAll, update, getById } from '../controllers/starships.controller'
import {
  augmentUrlFromId,
  augmentNestedEntityUrl,
  getUrlForEntityArray
} from './helpers/url'

const router = new Router()

export const getUrl = starshipId => router.url('get_starship_id', starshipId)

const dataTransformation = compose(
  augmentUrlFromId(getUrl),
  augmentNestedEntityUrl('pilots', getUrlForEntityArray('/api/people/:id')),
  augmentNestedEntityUrl('films', getUrlForEntityArray('/api/films/:id'))
)

export default router
  .get('get_starships', '/starships', handler(getAll, {
    transform: data => data.map(dataTransformation)
  }))
  .post('post_starships', '/starships', handler(create, {
    transform: augmentUrlFromId(getUrl)
  }))
  .put('put_starship_id', '/starships/:id', handler(update, {
    transform: augmentUrlFromId(getUrl)
  }))
  .get('get_starship_id', '/starships/:id', handler(getById, {
    transform: dataTransformation
  }))
