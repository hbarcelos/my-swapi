import peopleApiService from '../services/people.service'
import filmsApiService from '../services/films.service'
import planetsApiService from '../services/planets.service'
import starshipsApiService from '../services/startships.service'

function getSelectedValues (select) {
  return Array.from(select.options)
    .filter(opt => opt.selected)
    .map(opt => opt.value)
}

function extractIdFromParam (param) {
  if (typeof param === 'string') {
    const parts = param.split('/')
    return parts[parts.length - 1]
  }

  return param.id
}

export default class PeopleFrom extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      id: props.id,
      data: props.data || {},
      populateData: props.populateData || {}
    }
  }

  componentDidMount () {
    let entityData = Promise.resolve({})
    if (this.state.id) {
      entityData = peopleApiService.getById(this.state.id)
    }

    return Promise.all([
      entityData,
      filmsApiService.getList(),
      planetsApiService.getList(),
      starshipsApiService.getList()
    ])
      .then(([ data, films, planets, starships ]) => this.setState({
        data,
        populateData: {
          films,
          planets,
          starships
        }
      }))
  }

  onSubmit (ev) {
    ev.preventDefault()
    const id = this.refs.id.value
    const name = this.refs.name.value
    const gender = this.refs.gender.value
    const films = getSelectedValues(this.refs.films)
      .map(id => ({ id }))
    const homePlanet = { id: this.refs.home_planet.value }
    const starships = getSelectedValues(this.refs.starships)
      .map(id => ({ id }))

    peopleApiService.save({ id, name, gender, films, home_planet: homePlanet, starships })
      .then(jsonResponse => this.setState(
        Object.assign(this.state, { message: `OK - ID: ${jsonResponse.id}` })
      ))
      .catch(e => this.setState(
        Object.assign(this.state, { message: `${e.message}` })
      ))
  }

  render () {
    const msg = this.state.message
      ? (<div className="message">{this.state.message}</div>)
      : ''

    return (
      <div className="wrapper">
        { msg }
        <form onSubmit={ev => this.onSubmit(ev)}>
          <input name="id" type="hidden" ref="id" value={this.state.data.id}/>
          <p>Name: <input name="name" type="text" ref="name" value={this.state.data.name} /></p>

          <p>Gender: <select name="gender" ref="gender"
            defaultValue={this.state.data.gender}>
            <option disabled="disabled" value="">Choose one...</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select></p>

          <p>Films: <select name="films" ref="films" multiple="multiple"
            defaultValue={(this.state.data.films || []).map(extractIdFromParam)}>
            <option disabled="disabled" value="">Choose one...</option>
            {
              (this.state.populateData.films || []).map(film => (
                <option key={film.id} value={film.id}>{film.title}</option>
              ))
            }
          </select></p>

          <p>Starships: <select name="starships" ref="starships" multiple="multiple"
            defaultValue={(this.state.data.starships || []).map(extractIdFromParam)}>
            <option disabled="disabled" value="">Choose one...</option>
            {
              (this.state.populateData.starships || []).map(starship => (
                <option key={starship.id} value={starship.id}>{starship.title}</option>
              ))
            }
          </select></p>

          <p>Home Planet: <select name="home_planet" ref="home_planet"
            defaultValue={extractIdFromParam((this.state.data.home_planet || ''))}>
            <option disabled="disabled" value="">Choose one...</option>
            {
              (this.state.populateData.planets || []).map(planet => (
                <option key={planet.id} value={planet.id}>{planet.name}</option>
              ))
            }
          </select></p>
          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }
}
