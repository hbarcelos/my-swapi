import Router from 'koa-router'
import { augment, pick, compose, map } from '../../utils'
import { Maybe } from '../../utils/fp'

export const augmentUrlFromId = getUrlFn =>
  augment(entity => ({ url: getUrlFn(entity.id) }))

export const augmentNestedEntityUrl = (property, getUrlFn) =>
  augment(({ [property]: value }) =>
    ({ [property]: getUrlFn(value) }))

export const getUrlForEntityArray = urlTemplate =>
  map(getUrlForEntity(urlTemplate))

const getUrl = url => data => Router.url(url, data)

export const getUrlForEntity = urlTemplate => entity => {
  return Maybe(entity)
    .map(compose(
      getUrl(urlTemplate),
      pick(['id'])
    ))
    .unfold()
}
