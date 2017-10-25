import Router from 'koa-router'
import { compose } from '../utils'
import handler from './helpers/handler'
import { create, getAll, update, getById, removeById } from '../controllers/people.controller'
import {
  augmentUrlFromId,
  augmentNestedEntityUrl,
  getUrlForEntity,
  getUrlForEntityArray
} from './helpers/url'

const router = new Router()

export const getUrl = personId => router.url('get_person_id', personId)

const dataTransformation = compose(
  augmentUrlFromId(getUrl),
  augmentNestedEntityUrl('home_planet', getUrlForEntity('/api/planets/:id')),
  augmentNestedEntityUrl('starships', getUrlForEntityArray('/api/starships/:id')),
  augmentNestedEntityUrl('films', getUrlForEntityArray('/api/films/:id'))
)

export default router
  .get('get_people', '/people', handler(getAll, {
    transform: data => data.map(item => dataTransformation(item))
  }))
  .post('post_people', '/people', handler(create, {
    transform: augmentUrlFromId(getUrl)
  }))
  .put('put_person_id', '/people/:id', handler(update, {
    transform: augmentUrlFromId(getUrl)
  }))
  .get('get_person_id', '/people/:id', handler(getById, {
    transform: dataTransformation
  }))
  .delete('delete_person_id', '/people/:id', handler(removeById, {
    transform: () => {}
  }))
