import filmsApiService from '../services/films.service'
import peopleApiService from '../services/people.service'
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

export default class FilmsForm extends React.Component {
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
      entityData = filmsApiService.getById(this.state.id)
    }

    return Promise.all([
      entityData,
      peopleApiService.getList(),
      planetsApiService.getList(),
      starshipsApiService.getList()
    ])
      .then(([ data, people, planets, starships ]) => this.setState({
        data,
        populateData: {
          people,
          planets,
          starships
        }
      }))
  }

  onSubmit (ev) {
    ev.preventDefault()
    const id = this.refs.id.value
    const title = this.refs.title.value

    const characters = getSelectedValues(this.refs.characters)
      .map(id => ({ id }))
    const planets = getSelectedValues(this.refs.planets)
      .map(id => ({ id }))
    const starships = getSelectedValues(this.refs.starships)
      .map(id => ({ id }))

    console.log({ id, title, characters, planets, starships })
    filmsApiService.save({ id, title, characters, planets, starships })
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
          <p>Title: <input name="title" type="text" ref="title" value={this.state.data.title} /></p>

          <p>Characters: <select name="characters" ref="characters" multiple="multiple"
            defaultValue={(this.state.data.people || []).map(extractIdFromParam)}>
            <option disabled="disabled" value="">Choose one...</option>
            {
              (this.state.populateData.people || []).map(person => (
                <option key={person.id} value={person.id}>{person.name}</option>
              ))
            }
          </select></p>

          <p>Starships: <select name="starships" ref="starships" multiple="multiple"
            defaultValue={(this.state.data.starships || []).map(extractIdFromParam)}>
            <option disabled="disabled" value="">Choose one...</option>
            {
              (this.state.populateData.starships || []).map(starship => (
                <option key={starship.id} value={starship.id}>{starship.name}</option>
              ))
            }
          </select></p>

          <p>Planets: <select name="planets" ref="planets" multiple="multiple"
            defaultValue={(this.state.data.planets || []).map(extractIdFromParam)}>
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
