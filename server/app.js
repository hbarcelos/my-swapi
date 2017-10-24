import client from './database/client'
import * as models from './models'

import Koa from 'koa'
import koaBody from 'koa-body'
import apiRouter from './routers'

const app = new Koa()

app.use(koaBody())

// x-response-time
app.use(async (ctx, next) => {
  const start = Date.now()
  await next()
  const ms = Date.now() - start
  ctx.set('X-Response-Time', `${ms}ms`)
})

// logger

app.use(async (ctx, next) => {
  const start = Date.now()
  await next()
  const ms = Date.now() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}`)
})

// models

app.use(async (ctx, next) => {
  ctx.models = models
  await next()
})

// response
app.use(apiRouter.routes())
app.use(apiRouter.allowedMethods())

const start = async () => {
  await client.sync()

  app.listen(3000, _ => {
    console.log('http://localhost:3000')
  })
  // const film = await models.Film.create({
  //   title: 'A new Hope',
  //   episode_id: 4,
  //   director: 'George Lucas',
  //   producer: 'Gary Kurtz, Rick McCallum',
  //   release_date: new Date('1977-05-25')
  // })

  // const planet = await models.Planet.create({
  //   name: 'Tatooine'
  // })

  // const starship = await models.Starship.create({
  //   name: 'Executor'
  // })

  // const person = await models.Person.create({
  //   name: 'Luke Skywalker',
  //   gender: 'male',
  //   home_planet: planet.id
  // })

  // await person.addStarship(starship.id)
}

start()
  .catch(e => console.log(e))
