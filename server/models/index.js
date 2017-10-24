import Film from './film.entity'
import Person from './person.entity'
import Planet from './planet.entity'
import Starship from './starship.entity'

// ###########################################

Person.Planet = Person.belongsTo(Planet, {
  as: 'home_planet',
  foreignKey: 'home_planet_id'
})

Planet.Person = Planet.hasMany(Person, {
  as: 'residents',
  foreignKey: 'home_planet_id'
})

// ###########################################

Person.StarshipPilot = Person.belongsToMany(Starship, {
  as: 'starships',
  through: 'StarshipsPilots',
  foreignKey: 'pilot'
})

Starship.Pilot = Starship.belongsToMany(Person, {
  as: 'pilots',
  through: 'StarshipsPilots',
  foreignKey: 'starship'
})

// ###########################################

Person.Film = Person.belongsToMany(Film, {
  as: 'films',
  through: 'CharactersFilms',
  foreignKey: 'person'
})

Film.Person = Film.belongsToMany(Person, {
  as: 'characters',
  through: 'CharactersFilms',
  foreignKey: 'film'
})

// ###########################################

Film.Starship = Film.belongsToMany(Starship, {
  as: 'starships',
  through: 'FilmsStarships',
  foreignKey: 'film'
})

Starship.Film = Starship.belongsToMany(Film, {
  as: 'films',
  through: 'FilmsStarships',
  foreignKey: 'starship'
})

// ###########################################

Film.Planet = Film.belongsToMany(Planet, {
  as: 'planets',
  through: 'FilmsPlanets',
  foreignKey: 'film'
})

Planet.Film = Planet.belongsToMany(Film, {
  as: 'films',
  through: 'FilmsPlanets',
  foreignKey: 'planet'
})

// ###########################################

export { Film, Person, Planet, Starship }
