import Router from 'koa-router'
import filmsRouter from './films.router'
import planetsRouter from './planets.router'
import peopleRouter from './people.router'
import starshipsRouter from './starships.router'

const mainRouter = new Router()

export default mainRouter.use(
  '/api',
  filmsRouter.routes(),
  peopleRouter.routes(),
  planetsRouter.routes(),
  starshipsRouter.routes()
)
