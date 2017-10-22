import Router from 'koa-router'
import filmsRouter from './films.router'
import planetRouter from './planets.router'
import peopleRouter from './people.router'

const mainRouter = new Router()

export default mainRouter.use(
  '/api',
  filmsRouter.routes(),
  peopleRouter.routes(),
  planetRouter.routes()
)
