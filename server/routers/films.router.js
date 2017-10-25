import Router from 'koa-router'
import { compose } from '../utils'
import handler from './helpers/handler'
import { create, getAll, update, getById, removeById } from '../controllers/films.controller'
import {
  augmentUrlFromId,
  augmentNestedEntityUrl,
  getUrlForEntityArray
} from './helpers/url'

const router = new Router()

export const getUrl = filmId => router.url('get_film_id', filmId)

const dataTransformation = compose(
  augmentUrlFromId(getUrl),
  augmentNestedEntityUrl('characters', getUrlForEntityArray('/api/people/:id')),
  augmentNestedEntityUrl('starships', getUrlForEntityArray('/api/starshipts/:id')),
  augmentNestedEntityUrl('planets', getUrlForEntityArray('/api/planets/:id'))
)

export default router
  .get('get_films', '/films', handler(getAll, {
    transform: data => data.map(dataTransformation)
  }))
  .post('post_films', '/films', handler(create, {
    transform: augmentUrlFromId(getUrl)
  }))
  .put('put_film_id', '/films/:id', handler(update, {
    transform: augmentUrlFromId(getUrl)
  }))
  .get('get_film_id', '/films/:id', handler(getById, {
    transform: dataTransformation
  }))
  .delete('delete_film_id', '/films/:id', handler(removeById, {
    transform: () => {}
  }))
